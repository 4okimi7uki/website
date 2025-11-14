const { execSync } = require("node:child_process");
const fs = require("node:fs");
const { buildMarkdown, formatDate, groupByAuthor } = require("./releaseHelpers");

const token = process.env.GITHUB_TOKEN;

if (!token) {
    console.error("GITHUB_TOKEN is missing");
    process.exit(1);
}

const gh = (arg) => {
    const cmd = `gh ${arg} -R ${process.env.GITHUB_REPOSITORY}`;
    try {
        return execSync(cmd, {
            encoding: "utf-8",
            env: {
                ...process.env,
                GITHUB_TOKEN: token,
            },
        }).trim();
    } catch (er) {
        console.error("gh command failed:", cmd);
        throw er;
    }
};

const git = (arg) => {
    const cmd = `git ${arg}`;
    try {
        return execSync(cmd, {
            encoding: "utf-8",
            env: {
                ...process.env,
                GITHUB_TOKEN: token,
            },
        }).trim();
    } catch (er) {
        console.error("git command failed:", cmd);
        throw er;
    }
};

const remoteHasBranch = (branchName) => {
    const out = git(`ls-remote --heads origin ${branchName}`);
    return out.length > 0;
};

/**
 *
 * @param {string} baseBranch
 * @param {string} creationBranch
 * @returns Branch name
 */
const createBranch = (baseBranch, creationBranch) => {
    git("fetch --all");

    let targetBranch = creationBranch;
    let cnt = 0;

    while (remoteHasBranch(targetBranch)) {
        cnt += 1;
        targetBranch = `${creationBranch}_${cnt}`;
    }

    git(`switch -c ${targetBranch} origin/${baseBranch}`);
    git(`push -u origin ${targetBranch}`);

    return targetBranch;
};

const getLastReleaseDate = () => {
    const lastReleaseJson = gh("pr list --state merged --base main --limit 100 --json number,mergedAt");
    const prs = JSON.parse(lastReleaseJson);

    if (!prs || prs.length === 0) {
        console.error("No PRs have been merged into 'main' yet. Aborting release process.");
        process.exit(0);
    }

    prs.sort((a, b) => new Date(b.mergedAt) - new Date(a.mergedAt));
    const [lastRelease] = prs;

    return lastRelease.mergedAt;
};

const main = () => {
    console.log("============================================");
    console.log(`Generating Release PR...`);
    console.log("============================================");

    const from = getLastReleaseDate(); //  最後にマージした日付を取得
    const now = new Date();
    const to = now.toISOString();

    // 指定した期間でのPR一覧取得 ---
    const mergedPrJsonRaw = gh(
        `pr list \
      --state merged \
      --base develop \
      --search "merged:${from}..${to}" \
      --limit 300 \
      --json number,title,author \
    `
    );

    const mergedPrJson = JSON.parse(mergedPrJsonRaw);

    if (mergedPrJson.length === 0) {
        console.log("No PRs merged into develop during the target period. Aborting release process.");
        process.exit(0);
    }

    // 加工, markdown生成 ---
    const grouped = groupByAuthor(mergedPrJson);
    const md = buildMarkdown(grouped);

    fs.writeFileSync("release_body.md", md, "utf-8");

    console.log("::group::Generated Markdown");
    console.log(md);
    console.log("::endgroup::");

    // Release branch作成 ---
    const releaseBranch = createBranch("develop", `release/${formatDate(now)}`);

    // PR作成 ---
    gh(
        `pr create --title 'Release/${formatDate(now)}' --base main --head ${releaseBranch} --body-file release_body.md`
    );

    console.log("============================================");
    console.log("🎉 SUCCESS: Release PR created successfully!");
    console.log(`👉 PR Branch: ${releaseBranch}`);
    console.log("============================================");
};

main();

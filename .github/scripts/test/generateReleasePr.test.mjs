import { buildMarkdown, groupByAuthor } from "../releaseHelpers.mjs";
import data from "./testdata.json" assert { type: "json" };

describe("groupByAuthor", () => {
    it("groups PRs by author", () => {
        const input = data;

        const result = groupByAuthor(input);

        expect(result).toEqual([
            {
                author: "4okimi7uki",
                prs: [
                    { number: 1268, title: "Main to Dev" },
                    {
                        number: 1239,
                        title: "【ALBA_OPERATION-1626】【大会メニュー・概要見出し】概要・コース⇨概要などにテキスト変更",
                    },
                    {
                        number: 1236,
                        title: "【ALBA_OPERATION-1629】【大会LB・獲得賞金】開催地時刻の⏰アイコン削除依頼",
                    },
                ],
            },
            {
                author: "haruka919",
                prs: [
                    { number: 1262, title: "【ALBA_OPERATION-1721】 Spacer修正" },
                    {
                        number: 1247,
                        title: "【ALBA_OPERATION-1675】共通コンポーネントのStorybook化（TagButton・TitleLabel・Spacer）",
                    },
                    {
                        number: 1243,
                        title: "【ALBA_OPERATION-1670】 共通コンポーネント（KeywordItemなど）のStorybook化",
                    },
                    { number: 1235, title: "【ALBA_OPERATION-1634】 ツアー下部不要パーツの削除" },
                ],
            },
        ]);
    });
});

describe("buildMarkdown", () => {
    it("Builds markdown from grouped data", () => {
        const groups = [
            {
                author: "mizuki",
                prs: [
                    { number: 1, title: "feat: A" },
                    { number: 3, title: "chore: C" },
                ],
            },
        ];

        const md = buildMarkdown(groups);

        expect(md).toContain("## PR一覧");
        expect(md).toContain("@mizuki");
        expect(md).toContain("- #1");
        expect(md).toContain("- #3");
        expect(md).toContain("## リリース手順");
    });
});

const groupByAuthor = (prs) => {
    return Object.values(
        prs.reduce((acc, pr) => {
            const key = pr.author.login;
            if (!acc[key]) acc[key] = { author: key, prs: [] };
            acc[key].prs.push({ number: pr.number, title: pr.title });
            return acc;
        }, {})
    );
};

const buildMarkdown = (groups) => {
    let md = `## チケット \n\n`;
    md += `--- BacklogのURLを入れてください --- \n\n`;
    md += `## PR一覧 \n\n`;

    for (const { author, prs } of groups) {
        md += `@${author}\n`;
        for (const { number } of prs) {
            md += `- #${number} \n`;
        }
        md += "\n";
    }

    md += `## リリース手順 \n\n`;
    md += `- [x] ソースコード確認\n`;
    md += `- [x] microCMSに変更が必要か確認\n`;
    md += `- [ ] microCMSの変更実施\n`;
    md += `- [ ] ソースコードをマージ\n`;
    md += `- [ ] Vercelを見守る\n`;
    md += `- [ ] デプロイされたことを確認する 。\n`;
    md += `- [ ] 作業担当したところが問題なく反映されているか 。\n`;
    md += `- [ ] 最新の記事や大会情報、リーダーボードなどに500エラーなどの不具合は出ていないか。\n`;

    return md;
};

/**
 *
 * @returns `YYYY-MM-DD` 形式の文字列を返す
 */
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

module.exports = { groupByAuthor, buildMarkdown, formatDate };

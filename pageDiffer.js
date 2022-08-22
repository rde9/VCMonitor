const fs = require('fs');
const path = require('path');
const Diff = require('diff');
const diff2html = require('diff2html');

async function differ(scrapedData) {
  let markModified = []
  for(let i in scrapedData) {
    const { name, innerHTML, formattedDate } = scrapedData[i];
    let watchlistPath = path.join(__dirname, 'watchlist', name);
    let lastSnapshotPath = path.join(watchlistPath, 'lastSnapshot');
    if(!fs.existsSync(watchlistPath)) {
      markModified.push(i);
    } else {
      // if (fs.existsSync(lastSnapshotPath)) { // That is, it's not the first execution of the task
        const lastSnapshotFolder = fs.readFileSync(lastSnapshotPath).toString(); // read lastSnapshot file
        const lastHTML = fs.readFileSync(path.join(watchlistPath, lastSnapshotFolder, `${lastSnapshotFolder}.html`)).toString();
        if (innerHTML !== lastHTML) {
          markModified.push(i);
          const diff = Diff.createTwoFilesPatch(`${lastSnapshotFolder}.html`, `${formattedDate}.html`, lastHTML, innerHTML);
          const diffedHTML = diff2html.html(diff, {
            inputFormat: "diff",
            showFiles: false,
            matching: "lines",
            drawFileList: false,
            highlight: true,
            outputFormat: "line-by-line"
          });
          const styles = `<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/diff2html/bundles/css/diff2html.min.css" />\n`;
          fs.writeFileSync(path.join(watchlistPath, 'diff.html'), styles.concat(diffedHTML));
        }
      // }
    }
  }
  return markModified;
}

module.exports = differ;
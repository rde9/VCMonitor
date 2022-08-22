const fs = require('fs');
const path = require('path');
const pageScraper = require('./pageScraper');
const pageDiffer = require('./pageDiffer');
const logger = require('./logger');
async function scrapeAndDiff(browserInstance) {
  let browser;
  let scrapedData;
  let markModified;

  // scrape
  try {
    const { tasks } = JSON.parse(fs.readFileSync('tasks.json','utf-8'));
    browser = await browserInstance;
    scrapedData = await pageScraper(browser, tasks);

    await browser.close();
  }
  catch(err){
    logger.error(err);
  }

  // diff
  try {
    markModified = await pageDiffer(scrapedData);
    if(Array.isArray(markModified) && markModified.length === 0) {
      logger.info("Nothing got changed.");
    } else {
      logger.info("The following website(s) are updated:");
      for (const i of markModified) {
        const { name, innerHTML, formattedDate } = scrapedData[i];
        let taskNamePath = path.join(__dirname, 'watchlist', name);
        logger.info(name);
        if(!fs.existsSync(taskNamePath)) {
          fs.mkdirSync(taskNamePath, {
            recursive: true
          });
        }
        fs.mkdirSync(path.join(taskNamePath, formattedDate));
        fs.writeFileSync(path.join(taskNamePath, 'lastSnapshot'), formattedDate); // update lastSnapshot
        fs.writeFileSync(path.join(taskNamePath, formattedDate, `${formattedDate}.html`), innerHTML);
      }
      logger.info("Please refer to 'diff.html' in the task folders respectively.");
    }
    logger.info("Completed.\n");
  }
  catch(err) {
    logger.error(err);
  }
}

module.exports = (browserInstance) => scrapeAndDiff(browserInstance)
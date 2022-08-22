const browserObject = require('./browser');
const scraperController = require('./pageController');
const fs = require('fs');
const cron = require('node-cron');
const { cronjob } = JSON.parse(fs.readFileSync('config.json'));

cron.schedule(cronjob, () => {
  // Start the browser and create a browser instance
  let browserInstance = browserObject.startBrowser();

  // Pass the browser instance to the scraper controller
  scraperController(browserInstance)
});
const puppeteer = require('puppeteer');
const logger = require('./logger');

async function startBrowser() {
  let browser;
  try {
      logger.info("Opening the browser......");
      browser = await puppeteer.launch({
          // headless: false,
          args: ["--disable-setuid-sandbox"],
          'ignoreHTTPSErrors': true
      });
  } catch (err) {
      logger.error(err);
  }
  return browser;
}

module.exports = {
  startBrowser
};
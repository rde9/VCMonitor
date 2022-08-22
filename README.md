# VCMonitor

A simple tool to track Crypto VCs' portfolios, basically a crawler.

## Structure

```bash
.
├── watchlist/ # (generated) scraped data & diff results
├── app.log # (generated) logs
├── Dockerfile
├── index.js # entry point
├── browser.js
├── logger.js
├── pageController.js
├── pageDiffer.js
├── pageScraper.js
├── config.json # cron config
├── tasks.json # tasks config
├── package.json
└── package-lock.json
```

## Usage

1. Configure task list in  `tasks.json` . A task consists of three arguments:
   `name`: task name, used as sub-folder name in watchlist folder.
   `url`: website to be monitored.
   `xpath`: Xpath of HTML element of target website.

   Example:

   ```json
   {
       "tasks": [
           {
               "name": "Shima Capital",
               "url": "https://shima.capital/investments/",
               "xpath": "//section[@class='company']"
           },
           {
               "name": "Nascent",
               "url": "https://www.nascent.xyz/portfolio",
               "xpath": "//div[@class='section-3 gallery w-container']"
           }
       ]
   }
   ```

2. Configure cron in `config.json`.

   Example: (every 2 hours)
   ```json
   {
       "cronjob": "0 */2 * * *"
   }
   ```

3. Run:
   ```bash
   npm start
   ```


## Libraries used in this project

- [Puppeteer](https://github.com/puppeteer/puppeteer) - Headless Chrome Node.js API
- [log4js-node](https://github.com/log4js-node/log4js-node) - A port of log4js to node.js
- [node-cron](https://github.com/node-cron/node-cron) - A simple cron-like job scheduler for Node.js
- [jsdiff](https://github.com/kpdecker/jsdiff) - A javascript text differencing implementation.
- [diff2html](https://github.com/rtfpessoa/diff2html) - Pretty diff to html javascript library (diff2html)
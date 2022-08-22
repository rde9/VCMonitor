async function scraper(browser, tasks) {
  let scrapedData = [];

  let pagePromise = (task) => new Promise(async (resolve, reject) => {
    let dataObj = {};
    let { name, url, xpath } = task;
    dataObj['name'] = name;
    let page = await browser.newPage();
    // for screenshot
    // await page.setViewport({
    //   width: 1920,
    //   height: 1080
    // });
    await page.goto(url);
    await page.waitForXPath(xpath);
    const [element] = await page.$x(xpath);
    dataObj['innerHTML'] = await element.evaluate(ele => ele.innerHTML);
    let date = new Date().toISOString();
    dataObj['formattedDate'] = date.replace(/\:/g, '-').slice(0, -5);
    resolve(dataObj);
    await page.close();
  });

  // Loop through tasks
  for (let task of tasks) {
    let pageData = await pagePromise(task);
    scrapedData.push(pageData);
  }

  return scrapedData;
}


module.exports = scraper;
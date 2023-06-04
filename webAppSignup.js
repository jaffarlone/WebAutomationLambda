'use strict';
const { strict } = require('once');
const puppeteer = require('puppeteer');
const baseClass = require ('./puppeteer-jest/Pages/WebApp/webAppLogin');

(async () => {
  const capabilities = {
    'browserName': 'Chrome',
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Webapp signUp Scenario with negative scenarios',
      'name': 'Smoke Scenarios',
      'resolution':'1366x768',
      'user': process.env.LT_USERNAME || "jaffar.zahid",
      'accessKey': process.env.LT_ACCESS_KEY || "ObHLvJrBS2pUwnABHYW7YW8kUKXswBzsIKPMWB30TG4abxvBji",
      'network': true,
    }

  };

  try {
    const browser = await puppeteer.connect({
      browserWSEndpoint:
        `wss://cdp.lambdatest.com/puppeteer?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`,
    }
    );

    const page = await browser.newPage();
    await page.setViewport({
      width: 1024,
      height: 768,
      deviceScaleFactor: 1,
    });
    await baseClass.signUp(page);
    await browser.close();

  } catch (e) {
    console.log("Error - ", e);
  }

})();

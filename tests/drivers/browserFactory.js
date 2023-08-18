const { chromium } = require('playwright')
const config = require('../../config/playwright.config')

class BrowserFactory {
    static async createChromiumBrowser() {
        const launchOptions = {
            headless: config.launchOptions.headless,
        }

        const browser = await chromium.launch(launchOptions);

        return browser; // Return the browser object
    }
}

module.exports = BrowserFactory;
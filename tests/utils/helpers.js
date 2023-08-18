const fs = require('fs').promises;

class ActionHelper {
    constructor(page) {
        this.page = page;
    }

    async findBySelectorType(selectorType, locator) {
        if (selectorType === 'xpath') {
            return await this.page.waitForSelector(locator, { state: 'visible' })
        } else if (selectorType === 'css') {
            return await this.page.waitForSelector(locator, { state: 'visible' })
        } else {
            throw new Error('Unsupported selector type')
        }
    }

    async click(selectorType, locator) {
        const element = await this.findBySelectorType(selectorType, locator)
        await element.click()
    }

    async fastType(selectorType, locator, text) {
        const element = await this.findBySelectorType(selectorType, locator)
        await element.fill(text)
    }

    async slowType(selectorType, locator, text, pressEnter) {
        const element = await this.findBySelectorType(selectorType, locator);
        await element.fill('');

        let typedText = '';

        for (let i = 0; i < text.length; i++) {
            console.info('Sendkeys: ' + text[i]);

            typedText += text[i]; // Accumulate typed text

            await element.press(text[i]);

            const isLastChar = i === text.length - 1;
            const delayTime = isLastChar ? 0 : (text.length - i > 4 ? 50 : 150);

            await this.delay(delayTime);
            await this.randomDelay(150);
        }
        if (pressEnter) {
            await element.press('Enter');
        }
        console.info('slowType text is: ' + typedText); // Log typed text
        return element;
    }

    async delay(ms = 1000) {
        await this.page.waitForTimeout(ms)
    }

    async randomDelay(maxDelay) {
        const delayTime = Math.floor(Math.random() * maxDelay) + 1
        await this.delay(delayTime)
    }

    async getText(selectorType, locator) {
        const element = await this.findBySelectorType(selectorType, locator)
        const text = await element.innerText()
        return text;
    }

    async hover(selectorType, locator) {
        const element = await this.findBySelectorType(selectorType, locator)
        await element.hover()
    }

    async getCurrentUrl() {
        const url = await this.page.url()
        console.log("Current url is: ", url);
        return url
    }

    async switchToBrowserTab(index) {
        const pages = await this.page.context().pages();
        
        if (index < 0 || index >= pages.length) {
            throw new Error('Invalid tab index');
        }
        this.page = pages[index]
        return this
    }

    async closeBrowserTab() {
        console.info('[Browser tab is being closed...]')
        const pages = await this.page.context().pages()

        if(pages.length > 1) {
            const currentPageIndex = pages.indexOf(this.page)

            if(currentPageIndex >= 0) {
                const nextPageIndex = (currentPageIndex + 1) % pages.length
                const newPage = pages[nextPageIndex]

                await this.page.close()
                await newPage.bringToFront()
                this.page = newPage

                console.info('[Switched to new tab.]');
            } else {
                console.warn('[Current page not found in pages array.]');
            }
        } else {
            console.warn('[Cannot close the last tab.]');
        }

        console.info('[Browser tab closed!]')
    }

    async closeBrowserTabByIndex(index) {
        console.info(`[Closing browser tab at index: ${index}]`);

        const context = await this.page.context();
      
        if (index >= 0 && index < await context.pages().length) {
          // Create a new tab
          const targetPage = await context.newPage();
      
          // Store a reference to the tab
          const tab = targetPage;
      
          // Check if the tab exists
          if (tab.has()) {
            // Close the tab
            await tab.close();
      
            // Wait for the tab to close
            await tab.waitForClose();
      
            // Switch to the tab
            await this.page.goto(targetPage.url());
      
            console.info(`[Browser tab at index ${index} closed.]`);
          } else {
            console.warn(`[Tab at index ${index} does not exist.]`);
          }
        } else {
          console.warn(`[Invalid tab index: ${index}]`);
        }
                      
    }

    async getPageTitle() {
        return await this.page.title()
    }

    async isAvailableAndDisplayed(selectorType, locator, withinSeconds) {
        try {
            const element = await this.findBySelectorType(selectorType, locator, withinSeconds)
            const isElementDisplayed = await element.isVisible()

            console.info(`Element ${selectorType}: ${locator} is ${isElementDisplayed}`)

            await this.randomDelay(1000)
            return isElementDisplayed
        } catch (e) {
            console.log(`Element ${selectorType}: ${locator} is not found within ${withinSeconds}. Timeout error occured!`);
            return false
        }
    }

    async navigate(url) {
        console.log(`Navigating to: ${url}`);
        await this.page.goto(url)
    }

    async acceptAlertWithMesage() {
        const dialog = await this.page.waitForEvent('dialog')
        await dialog.accept()
    }
}

module.exports = ActionHelper
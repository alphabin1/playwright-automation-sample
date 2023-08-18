const ActionHelper = require('../utils/helpers')
const config = require('../../config/playwright.config')
const { expect } = require('chai')

class ProductPage{
    constructor(page) {
        this.page = page
        this.actionHelper = new ActionHelper(page)
    }

    // All the Categories 
    async selectCategoryByItsName(categoryName) {
        await this.actionHelper.click('xpath', `//div[contains(@class,"categories")]//label[contains(text(), "${categoryName}")]/input`)
    }

    async getTextOfSelectedService() {
        const text = await this.actionHelper.getText('xpath', '//h2')
        return text
    }
    // Duration
    getSixMonthsDuration() {
        return this.actionHelper.click('css' ,'[value="6 Months"]')
    }

    async clickOnSixMonthDuration() {
        await this.getSixMonthsDuration()
    }

    getTwelveMonthsDuration() {
        return this.actionHelper.click('css', '[value="12 Months"]')
    }

    async clickOnTwelveMonthsDuration() {
        await this.getTwelveMonthsDuration()
    }

    getBuyNowButton() {
        return this.actionHelper.click('xpath', '//button[contains(text(),"Buy Now")]')
    }

    async clickOnBuyNowButton() {
        await this.getBuyNowButton()
    }

    getContinueToBuyButton() {
        return this.actionHelper.click('css', '[class="continue-btn"]')
    }

    async clickOnContinueToBuyButton() {
        await this.getContinueToBuyButton()
    }
}

module.exports = ProductPage;
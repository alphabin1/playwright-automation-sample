const ActionHelper = require('../utils/helpers')
const config = require('../../config/playwright.config')
const { expect } = require('chai')

class CartPage{
    constructor(page) {
        this.page = page
        this.actionHelper = new ActionHelper(page)
    }

    getProceedToCheckoutButton() {
        return this.actionHelper.click('css', '#checkoutButton')
    }

    async clickOnProceedToCheckoutButton() {
        await this.getProceedToCheckoutButton()
    }

    async assertProductsAreVisibleInCart() {
        const products = await this.actionHelper.isAvailableAndDisplayed('xpath', '//table[@id="tableMain"]//tbody[2]//tr')
        expect(products).to.be.true
    }

    async assertTotalAmountIsVisible() {
        const total = await this.actionHelper.isAvailableAndDisplayed('css', '[class="total-amount"]')
        expect(total).to.be.true
    }
}

module.exports = CartPage;
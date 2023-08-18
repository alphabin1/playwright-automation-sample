const ActionHelper = require('../utils/helpers')
const config = require('../../config/playwright.config')
const { expect } = require('chai')

class OrderConfirmationPage{
    constructor(page) {
        this.page = page
        this.actionHelper = new ActionHelper(page)
    }

    async assertOrderConfirmationMessage() {
        const orderConfirmationMessage = await this.actionHelper.isAvailableAndDisplayed('css', '[class="confirmation-message"]')
        expect(orderConfirmationMessage).to.be.true
    }

    async assertOrderIdIsVisible() {
        const orderId = await this.actionHelper.isAvailableAndDisplayed('css', '#order-id')
        expect(orderId).to.be.true
    }
}

module.exports = OrderConfirmationPage;
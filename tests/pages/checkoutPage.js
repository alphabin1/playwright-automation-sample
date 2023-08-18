const ActionHelper = require('../utils/helpers')
const config = require('../../config/playwright.config')
const { expect } = require('chai')

class CheckoutPage{
    constructor(page) {
        this.page = page
        this.actionHelper = new ActionHelper(page)
    }

    async assertBillingInformationHeader() {
        const billingInformationHeader = await this.actionHelper.isAvailableAndDisplayed('xpath', '//h2[text()="Billing Information"]')
        expect(billingInformationHeader).to.be.true
    }

    getFullNameInput(fullName) {
        return this.actionHelper.fastType('css','#full-name',fullName)
    }

    getEmailInput(email) {
        return this.actionHelper.fastType('css', '#email', email)
    }

    getCityInput(city) {
        return this.actionHelper.fastType('css', '#city', city)
    }

    getStateInput(state) {
        return this.actionHelper.fastType('css', '#state', state)
    }

    getCountryInput(country) {
        return this.actionHelper.fastType('css', '#country', country)
    }

    getZipCodeInput(zipcode) {
        return this.actionHelper.fastType('css', '#zipcode', zipcode)
    }

    async fillBillingForm(fullName, email, city, state, country, zipcode) {
        await this.getFullNameInput(fullName)
        await this.getEmailInput(email)
        await this.getCityInput(city)
        await this.getStateInput(state)
        await this.getCountryInput(country)
        await this.getZipCodeInput(zipcode)
    }

    /**
     * Payment Information
     */

    async assertPaymentInformationHeader() {
        const paymentInformation = await this.actionHelper.isAvailableAndDisplayed('xpath', '//h2[text()="Payment Information"]')
        expect(paymentInformation).to.be.true
    }

    getCardNumberInput(cardNumber) {
        return this.actionHelper.slowType('css', '#cardnumber', cardNumber)
    }

    getExpiryMonthInput(expiryMonth) {
        return this.actionHelper.fastType('css', '#month', expiryMonth)
    }

    getExpiryYearInput(expiryYear) {
        return this.actionHelper.fastType('css', '#year', expiryYear)
    }

    getCVVInput(cvv) {
        return this.actionHelper.fastType('css', '#cvv', cvv)
    }

    async fillPaymentForm(cardNumber, expiryMonth, expiryYear, cvv) {
        await this.getCardNumberInput(cardNumber)
        await this.getExpiryMonthInput(expiryMonth)
        await this.getExpiryYearInput(expiryYear)
        await this.getCVVInput(cvv)
    }

    getPrivacyCheckbox() {
        return this.actionHelper.click('css', '[type="checkbox"]')
    }

    async clickOnPrivacyCheckbox() {
        await this.getPrivacyCheckbox()
    }

    getPayNowButton() {
        return this.actionHelper.click('css', '#payNowButton')
    }

    async clickOnPayNowButton() {
        await this.getPayNowButton()
    }
}

module.exports = CheckoutPage;
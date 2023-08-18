const ActionHelper = require('../utils/helpers')
const { expect } = require('chai')
const config = require('../../config/playwright.config')

class SignUpPage{
    constructor(page) {
        this.page = page
        this.actionHelper = new ActionHelper(page)
    }

    async assertCreateAccountHeader() {
        const header = await this.actionHelper.isAvailableAndDisplayed('xpath', '//h2[text()="Create Account"]')
        expect(header).to.be.true
    }

    getFirstNameInput(fname) {
        return this.actionHelper.fastType('css', '#first_name', fname)
    }

    getLastNameInput(lname) {
        return this.actionHelper.fastType('css', '#last_name', lname)
    }

    getEmailInput(email) {
        return this.actionHelper.slowType('css', '#emailInput', email)
    }

    getPasswordInput(password) {
        return this.actionHelper.fastType('css', '#password1', password)
    }

    getConfirmPasswordInput(cpassword) {
        return this.actionHelper.fastType('css', '#confirm-passwordInput', cpassword)
    }

    getCreateAccountButton() {
        return this.actionHelper.click('css', '#createAccountButton')
    }

    async assertFirstnameError() {
        const firstnameErrorVisible = await this.actionHelper.isAvailableAndDisplayed('css', '#first_name-error', 10000)
        expect(firstnameErrorVisible).to.be.true
    }

    async signup(fname, lname, email, password, cpassword) {
        await this.getFirstNameInput(fname)
        await this.getLastNameInput(lname)
        await this.getEmailInput(email)
        await this.getPasswordInput(password)
        await this.getConfirmPasswordInput(cpassword)
        await this.getCreateAccountButton()
    }

    async assertPageTitleAfterSignUp(title) {
        const titleText = await this.actionHelper.getPageTitle()
        expect(titleText).to.eq(title)
    }
}

module.exports = SignUpPage
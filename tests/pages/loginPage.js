const ActionHelper = require('../utils/helpers')
const config = require('../../config/playwright.config')
const { expect } = require('chai')

class LoginPage{
    constructor(page) {
        this.page = page
        this.actionHelper = new ActionHelper(page)
    }

    async navigateToLoginPage() {
        await this.actionHelper.navigate(config.launchOptions.demoLoginUrl)
    }

    async assertLoginHeader() {
        const header = await this.actionHelper.getText('xpath', '//h2[text()="Log In"]')
        expect(header).to.eq('Log In')
    }

    getEmailInput(email) {
        return this.actionHelper.slowType('css', '#emailInput', email)
    }

    getPasswordInput(password) {
        return this.actionHelper.slowType('css', '#passwordInput', password)
    }

    getLoginButton() {
        return this.actionHelper.click('css', '#loginButton')
    }

    async clickOnLoginButton() {
        await this.getLoginButton()
    }

    async login(email, password) {
        await this.getEmailInput(email)
        await this.getPasswordInput(password)
        await this.getLoginButton()
        await this.actionHelper.delay(2000)
    }

    async assertPageTitle(title) {
        const titleText = await this.actionHelper.getPageTitle()
        console.log('Page title is: ', titleText);
        expect(titleText).to.eq(title)
    }

    async assertEmailErrorIsVisible() {
        const emailError = await this.actionHelper.isAvailableAndDisplayed('css', '#email-error', 10000)
        expect(emailError).to.be.true
    }

    async acceptAlertModal() {
        await this.actionHelper.acceptAlertWithMesage()
    }
}

module.exports = LoginPage;
const ActionHelper = require('../utils/helpers')
const config = require('../../config/playwright.config')
const { expect } = require('chai')

class HomePage{
    constructor(page) {
        this.page = page
        this.actionHelper = new ActionHelper(page)
    }

    async navigateToHomePage() {
        await this.actionHelper.navigate(config.launchOptions.demoSiteUrl)
    }

    getLoginLinkButton() {
        return this.actionHelper.click('css', '#loginLink')
    }

    async clickOnLoginLinkButton() {
        await this.getLoginLinkButton()
    }

    getSignupButton() {
        return this.actionHelper.click('css', '#signUpLink')
    }

    async clickOnSignUpButton() {
        await this.getSignupButton()
    }

    getAlphabinLogo() {
        return this.actionHelper.click('css', '[href="home"]')
    }

    async clickOnAlphabinLogo() {
        await this.getAlphabinLogo()
    }

    getHomeButton() {
        return this.actionHelper.click('css', '[href="home"]')
    }

    async clickOnHomeButton() {
        await this.getHomeButton()
    }

    async hoverOnServicesDropDown() {
        await this.actionHelper.hover('css', '[class="dropbtn"]')
    }

    async assertAllServicesUnderServicesDropDown() {
        const services = await this.actionHelper.isAvailableAndDisplayed('xpath', '//div[@class="dropdown-content"]//a')
        expect(services).to.be.true
    }

    getAboutUsButton() {
        return this.actionHelper.click('css', '#aboutUsLink')
    }

    async clickOnAboutUsButton() {
        await this.getAboutUsButton()
    }

    getServicesFromHome(serviceName) {
        return this.actionHelper.click('xpath', `//div[@class="services__list"]/a/h3[text()="${serviceName}"]`)
    }

    async clickOnServiceFromHome(serviceName) {
        await this.getServicesFromHome(serviceName)
    }

    getServiceFromHeader(serviceName) {
        return this.actionHelper.click('xpath', `//div[@class="dropdown-content"]/a/p[text()="${serviceName}"]`)
    }

    async clickOnServiceFromHeader(serviceName) {
        await this.getServiceFromHeader(serviceName)
    }

    getLogoutButton() {
        return this.actionHelper.click('css', '#logout')
    }

    async clickOnLogoutButton() {
        await this.getLogoutButton()
    }
}

module.exports = HomePage;
const ActionHelper = require('../utils/helpers')
const config = require('../../config/playwright.config')
const { expect } = require('chai')

class FooterPage{
    constructor(page) {
        this.page = page
        this.actionHelper = new ActionHelper(page)
    }

    getServiceFromFooter(serviceName) {
        return this.actionHelper.click('xpath', `//div[contains(@class,"all-serv")]/p/a[text()="${serviceName}"]`)
    }

    async clickOnServiceFromFooter(serviceName) {
        await this.getServiceFromFooter(serviceName)
    }

    getAlphabinLogo() {
        return this.actionHelper.click('xpath', '//div[@class="footer__logo"]//a')
    }

    async clickOnAlphabinLogo() {
        await this.getAlphabinLogo()
    }

    getLinkedInIcon() {
        return this.actionHelper.click('css', '#linkedinLink')
    }

    async clickOnLinkedInIcon() {
        await this.getLinkedInIcon()
    }

    async getLinkedInTitle() {
        const title = await this.actionHelper.getPageTitle()
        return title
    }

    getSkypeIcon() {
        return this.actionHelper.click('css', '#skypeLink')
    }

    async clickOnSkypeIcon() {
        await this.getSkypeIcon()
    }

    getInstagramIcon() {
        return this.actionHelper.click('css', '#instagramLink')
    }

    async clickOnInstagramIcon() {
        await this.getInstagramIcon()
    }

    getFacebookIcon() {
        return this.actionHelper.click('css', '#facebookLink')
    }

    async clickOnFacebookIcon() {
        await this.getFacebookIcon()
    }

    getTwitterIcon() {
        return this.actionHelper.click('css', '#twitterLink')
    }

    async clickOnTwitterIcon() {
        await this.getTwitterIcon()
    }
}

module.exports = FooterPage;
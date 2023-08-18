const ActionHelper = require('../utils/helpers')
const BrowserFactory = require('../drivers/browserFactory')
const AllPages = require('../pages/allPages');
const { expect } = require('chai');


describe('Playwright Demo', () => {
  let context, browser, allPages, page, email;

  before(async () => {
    browser = await BrowserFactory.createChromiumBrowser()
    context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
    });
    page = await context.newPage()
    allPages = new AllPages(page)
    this.actionHelper = new ActionHelper(page)
  })

  describe('Verifying user is not able to register with empty fileds', async () => {
    const fname = ''
    const lname = ''
    const email = ''
    const password = ''
    const cpassword = ''

    it('User should be redirected to the home page', async () => {
      await allPages.homePage.navigateToHomePage()
    })

    it('Signup page should be displayed', async () => {
      await allPages.homePage.clickOnSignUpButton()
    })

    it('Click on Sign Up button with empty fields', async () => {
      await allPages.signupPage.signup(fname, lname, email, password, cpassword)
    })

    it('Error should display', async () => {
      await allPages.signupPage.assertFirstnameError()
    })
  })

  describe('Verify user is able to register successfully with all the mandatory fields filled', () => {
    let uniqueNumber = new Date().getTime()
    const fname = 'Test'
    const lname = 'Automation'
    email = `playwright+${uniqueNumber}@gmail.com`
    const password = '12qw!@QW'
    const cpassword = '12qw!@QW'
    const title = 'Alpha Test'

    it('User should be redirected to the home page', async () => {
      await allPages.homePage.navigateToHomePage()
    })

    it('Signup page should be displayed', async () => {
      await allPages.homePage.clickOnSignUpButton()
    })

    it('Click on Sign Up button with correct filled fields', async () => {
      await allPages.signupPage.signup(fname, lname, email, password, cpassword)
    })

    it('Assert title after sign up successfully', async () => {
      await allPages.signupPage.assertPageTitleAfterSignUp(title)
    })
  })

  describe('Verifying registered user is able to login to the website successfully', () => {
    const password = '12qw!@QW'
    const homePageTitle = 'Alphabin | Test Automation, Regression Testing, and Smoke Testing Services for Quality Assurance | demo.alphabin.com'

    it('User should be redirected to the home page', async () => {
      await allPages.homePage.navigateToHomePage()
    })

    it('Login page should be displayed', async () => {
      await allPages.homePage.clickOnLoginLinkButton()
    })

    it('Fill login form and click "Login In" button', async () => {
      await allPages.loginPage.login(email, password)
    })

    it('User should be logged in and be redirected to home page', async () => {
      await allPages.loginPage.assertPageTitle(homePageTitle)
    })
  })

  describe('Verifying user is not able to login with incorrect email and correct password', () => {
    const email = 'incorrectEmail@gmail.com'
    const password = '12qw!@QW'

    it('User should be redirected to the home page', async () => {
      await allPages.homePage.navigateToHomePage()
    })

    it('Login page should be displayed', async () => {
      await allPages.homePage.clickOnLoginLinkButton()
    })

    it('Enter incorrect email and correct password', async () => {
      await allPages.loginPage.login(email, password)
    })
  })

  describe('Verifying user is not able to login with correct email and incorrect password', () => {
    const password = 'incorrectPassword'

    it('User should be redirected to the home page', async () => {
      await allPages.homePage.navigateToHomePage()
    })

    it('Login page should be displayed', async () => {
      await allPages.homePage.clickOnLoginLinkButton()
    })

    it('Enter incorrect email and correct password', async () => {
      await allPages.loginPage.login(email, password)
    })
  })

  describe('Verifying user is not able to login with Empty credentials', () => {
    const email = ''
    const password = ''

    it('User should be redirected to the home page', async () => {
      await allPages.homePage.navigateToHomePage()
    })

    it('Login page should be displayed', async () => {
      await allPages.homePage.clickOnLoginLinkButton()
    })

    it('Enter incorrect email and correct password', async () => {
      await allPages.loginPage.login(email, password)
    })

    it('Email error should be displayed', async () => {
      await allPages.loginPage.assertEmailErrorIsVisible()
    })
  })

  describe('Verifying user is able to purchase all the services available', () => {
    const email = 'test1234567891@test.com'
    const password = '12qw!@QW'
    const homePageTitle = 'Alphabin | Test Automation, Regression Testing, and Smoke Testing Services for Quality Assurance | demo.alphabin.com'
    const serviceName = "UI Automation Testing (Web)"
    const category1 = 'Functionality Testing'
    const category2 = 'Security Testing'
    const fullName = 'AlphaTest'
    const city = 'Phoenix'
    const state = 'Arizona'
    const country = 'United States'
    const zipcode = '99999'
    const cardNumber = '4111111111111111'
    const expiryMonth = '1'
    const expiryYear = '2025'
    const cvv = "123"

    it('User should be redirected to the home page', async () => {
      await allPages.homePage.navigateToHomePage()
    })

    it('Login page should be displayed', async () => {
      await allPages.homePage.clickOnLoginLinkButton()
    })

    it('Enter correct email and password', async () => {
      await allPages.loginPage.login(email, password)
    })

    it('User should be logged in and be redirected to home page', async () => {
      await allPages.loginPage.assertPageTitle(homePageTitle)
    })

    it('Select any service from the Home page', async () => {
      await allPages.homePage.clickOnServiceFromHome(serviceName)
    })

    it('Select categories', async () => {
      const service = await allPages.productPage.getTextOfSelectedService()
      expect(service).to.eq(serviceName)
      await allPages.productPage.selectCategoryByItsName(category1)
      await allPages.productPage.selectCategoryByItsName(category2)
    })

    it('Select duration', async () => {
      await allPages.productPage.clickOnTwelveMonthsDuration()
    })

    it('Click on "Buy Now" button', async () => {
      await allPages.productPage.clickOnBuyNowButton()
    })

    it('Click on "Proceed to checkout" button', async () => {
      await allPages.cartPage.assertProductsAreVisibleInCart()
      await allPages.cartPage.assertTotalAmountIsVisible()
      await allPages.cartPage.clickOnProceedToCheckoutButton() 
    })

    it('Fill the billing form', async () => {
      await allPages.checkoutPage.assertBillingInformationHeader()
      await allPages.checkoutPage.fillBillingForm(fullName, email, city, state, country, zipcode)
    })

    it('Fill the Payment Information form', async () => {
      await allPages.checkoutPage.assertPaymentInformationHeader()
      await allPages.checkoutPage.fillPaymentForm(cardNumber, expiryMonth, expiryYear, cvv)
    })

    it('Checkmark the Privacy Policy', async () => {
      await allPages.checkoutPage.clickOnPrivacyCheckbox()
    })

    it('Click on "Pay Now" button', async () => {
      await allPages.checkoutPage.clickOnPayNowButton()
    })

    it('Verify Order ID is visible', async () => {
      await allPages.orderConfirmationPage.assertOrderConfirmationMessage()
      await allPages.orderConfirmationPage.assertOrderIdIsVisible()
    })
  })

  describe('Verifying user is able to purchase all the services available from the header drop down', () => {
    const email = 'test1234567891@test.com'
    const password = '12qw!@QW'
    const homePageTitle = 'Alphabin | Test Automation, Regression Testing, and Smoke Testing Services for Quality Assurance | demo.alphabin.com'
    const category1 = 'Performance Tesitng'
    const category2 = 'Usability Testing'
    const serviceName = 'UI Automation Testing (Mobile)'
    const fullName = 'AlphaTest'
    const city = 'Phoenix'
    const state = 'Arizona'
    const country = 'United States'
    const zipcode = '99999'
    const cardNumber = '4111111111111111'
    const expiryMonth = '1'
    const expiryYear = '2025'
    const cvv = "123"

    it('User should be redirected to the home page', async () => {
      await allPages.homePage.navigateToHomePage()
    })

    it('Login page should be displayed', async () => {
      await allPages.homePage.clickOnLoginLinkButton()
    })

    it('Enter correct email and password', async () => {
      await allPages.loginPage.login(email, password)
    })

    it('User should be logged in and be redirected to home page', async () => {
      await allPages.loginPage.assertPageTitle(homePageTitle)
    })

    it('Select a service from Header "Services" dropdown', async() => {
      await allPages.homePage.hoverOnServicesDropDown()
      await allPages.homePage.clickOnServiceFromHeader(serviceName)
    })

    it('Select categories', async () => {
      const service = await allPages.productPage.getTextOfSelectedService()
      expect(service).to.eq(serviceName)
      await allPages.productPage.selectCategoryByItsName(category1)
      await allPages.productPage.selectCategoryByItsName(category2)
    })

    it('Select duration', async () => {
      await allPages.productPage.clickOnTwelveMonthsDuration()
    })

    it('Click on "Buy Now" button', async () => {
      await allPages.productPage.clickOnBuyNowButton()
    })

    it('Click on "Proceed to checkout" button', async () => {
      await allPages.cartPage.assertProductsAreVisibleInCart()
      await allPages.cartPage.assertTotalAmountIsVisible()
      await allPages.cartPage.clickOnProceedToCheckoutButton() 
    })

    it('Fill the billing form', async () => {
      await allPages.checkoutPage.assertBillingInformationHeader()
      await allPages.checkoutPage.fillBillingForm(fullName, email, city, state, country, zipcode)
    })

    it('Fill the Payment Information form', async () => {
      await allPages.checkoutPage.assertPaymentInformationHeader()
      await allPages.checkoutPage.fillPaymentForm(cardNumber, expiryMonth, expiryYear, cvv)
    })

    it('Checkmark the Privacy Policy', async () => {
      await allPages.checkoutPage.clickOnPrivacyCheckbox()
    })

    it('Click on "Pay Now" button', async () => {
      await allPages.checkoutPage.clickOnPayNowButton()
    })

    it('Verify Order ID is visible', async () => {
      await allPages.orderConfirmationPage.assertOrderConfirmationMessage()
      await allPages.orderConfirmationPage.assertOrderIdIsVisible()
    })
  })

  describe('Verifying user is able to purchase all the services available from the footer', () => {
    const email = 'test1234567891@test.com'
    const password = '12qw!@QW'
    const homePageTitle = 'Alphabin | Test Automation, Regression Testing, and Smoke Testing Services for Quality Assurance | demo.alphabin.com'
    const category = 'Security Testing'
    const serviceName = 'API Automation Testing'
    const fullName = 'AlphaTest'
    const city = 'Phoenix'
    const state = 'Arizona'
    const country = 'United States'
    const zipcode = '99999'
    const cardNumber = '4111111111111111'
    const expiryMonth = '1'
    const expiryYear = '2025'
    const cvv = "123"

    it('User should be redirected to the home page', async () => {
      await allPages.homePage.navigateToHomePage()
    })

    it('Login page should be displayed', async () => {
      await allPages.homePage.clickOnLoginLinkButton()
    })

    it('Enter correct email and password', async () => {
      await allPages.loginPage.login(email, password)
    })

    it('User should be logged in and be redirected to home page', async () => {
      await allPages.loginPage.assertPageTitle(homePageTitle)
    })

    it('Select a service from Footer listed under "All Services"', async () => {
      await allPages.footerPage.clickOnServiceFromFooter(serviceName)
    })

    it('Select category', async () => {
      const service = await allPages.productPage.getTextOfSelectedService()
      expect(service).to.eq(service)
      await allPages.productPage.selectCategoryByItsName(category)
    })

    it('Select duration', async () => {
      await allPages.productPage.clickOnTwelveMonthsDuration()
    })

    it('Click on "Buy Now" button', async () => {
      await allPages.productPage.clickOnBuyNowButton()
    })

    it('Click on "Proceed to checkout" button', async () => {
      await allPages.cartPage.assertProductsAreVisibleInCart()
      await allPages.cartPage.assertTotalAmountIsVisible()
      await allPages.cartPage.clickOnProceedToCheckoutButton() 
    })

    it('Fill the billing form', async () => {
      await allPages.checkoutPage.assertBillingInformationHeader()
      await allPages.checkoutPage.fillBillingForm(fullName, email, city, state, country, zipcode)
    })

    it('Fill the Payment Information form', async () => {
      await allPages.checkoutPage.assertPaymentInformationHeader()
      await allPages.checkoutPage.fillPaymentForm(cardNumber, expiryMonth, expiryYear, cvv)
    })

    it('Checkmark the Privacy Policy', async () => {
      await allPages.checkoutPage.clickOnPrivacyCheckbox()
    })

    it('Click on "Pay Now" button', async () => {
      await allPages.checkoutPage.clickOnPayNowButton()
    })

    it('Verify Order ID is visible', async () => {
      await allPages.orderConfirmationPage.assertOrderConfirmationMessage()
      await allPages.orderConfirmationPage.assertOrderIdIsVisible()
    })

  })

  describe('Verifying user is able to purchase a service and then Continue to shop and purchase another service', () => {
    const email = 'test1234567891@test.com'
    const password = '12qw!@QW'
    const homePageTitle = 'Alphabin | Test Automation, Regression Testing, and Smoke Testing Services for Quality Assurance | demo.alphabin.com'
    const serviceName1 = "QA Performance & Capacity Planning"
    const serviceName2 = 'Manual Functional Testing'
    const category1 = 'Functionality Testing'
    const category2 = 'Security Testing'
    const fullName = 'AlphaTest'
    const city = 'Phoenix'
    const state = 'Arizona'
    const country = 'United States'
    const zipcode = '99999'
    const cardNumber = '4111111111111111'
    const expiryMonth = '1'
    const expiryYear = '2025'
    const cvv = "123"

    it('User should be redirected to the home page', async () => {
      await allPages.homePage.navigateToHomePage()
    })

    it('Login page should be displayed', async () => {
      await allPages.homePage.clickOnLoginLinkButton()
    })

    it('Enter correct email and password', async () => {
      await allPages.loginPage.login(email, password)
    })

    it('User should be logged in and be redirected to home page', async () => {
      await allPages.loginPage.assertPageTitle(homePageTitle)
    })

    it('Select any service from the Home page', async () => {
      await allPages.homePage.clickOnServiceFromHome(serviceName1)
    })

    it('Select categories', async () => {
      const service = await allPages.productPage.getTextOfSelectedService()
      expect(service).to.eq(serviceName1)
      await allPages.productPage.selectCategoryByItsName(category1)
    })

    it('Select duration', async () => {
      await allPages.productPage.clickOnTwelveMonthsDuration()
    })

    it('Click on "Buy Now" button', async () => {
      await allPages.productPage.clickOnBuyNowButton()
    })

    it('Click on "Continue to buy" button', async () => {
      await allPages.productPage.clickOnContinueToBuyButton()
    })

    it('Select another service from the Home page', async () => {
      await allPages.homePage.clickOnServiceFromHome(serviceName2)
    })

    it('Select category', async () => {
      const service = await allPages.productPage.getTextOfSelectedService()
      expect(service).to.eq(serviceName2)
      await allPages.productPage.selectCategoryByItsName(category2)
    })

    it('Select duration', async () => {
      await allPages.productPage.clickOnSixMonthDuration()
    })

    it('Click on "Buy Now" button', async () => {
      await allPages.productPage.clickOnBuyNowButton()
    })

    it('Click on "Proceed to checkout" button', async () => {
      await allPages.cartPage.assertProductsAreVisibleInCart()
      await allPages.cartPage.assertTotalAmountIsVisible()
      await allPages.cartPage.clickOnProceedToCheckoutButton() 
    })

    it('Fill the billing form', async () => {
      await allPages.checkoutPage.assertBillingInformationHeader()
      await allPages.checkoutPage.fillBillingForm(fullName, email, city, state, country, zipcode)
    })

    it('Fill the Payment Information form', async () => {
      await allPages.checkoutPage.assertPaymentInformationHeader()
      await allPages.checkoutPage.fillPaymentForm(cardNumber, expiryMonth, expiryYear, cvv)
    })

    it('Checkmark the Privacy Policy', async () => {
      await allPages.checkoutPage.clickOnPrivacyCheckbox()
    })

    it('Click on "Pay Now" button', async () => {
      await allPages.checkoutPage.clickOnPayNowButton()
    })

    it('Verify Order ID is visible', async () => {
      await allPages.orderConfirmationPage.assertOrderConfirmationMessage()
      await allPages.orderConfirmationPage.assertOrderIdIsVisible()
      await allPages.homePage.clickOnLogoutButton()
    })
  })

  describe('Verifying the user is able to access all the header options', () => {
    const homePageTitle = 'Alphabin | Test Automation, Regression Testing, and Smoke Testing Services for Quality Assurance | demo.alphabin.com'

    it('User should be redirected to the home page', async () => {
      await allPages.homePage.navigateToHomePage()
    })

    it('Click on Alpbabin Logo', async () => {
      await allPages.homePage.clickOnAlphabinLogo()
      await allPages.loginPage.assertPageTitle(homePageTitle)
    })

    it('Click on the "Home" button', async () => {
      await allPages.homePage.clickOnHomeButton()
      const currentUrl = await this.actionHelper.getCurrentUrl()
      expect(currentUrl).to.eq('https://demo.alphabin.co/home')
    })

    it('Hover over "Services" button', async () => {
      await allPages.homePage.hoverOnServicesDropDown()
      await allPages.homePage.assertAllServicesUnderServicesDropDown()
    })

    it('Click on "About us" button', async () => {
      await allPages.homePage.clickOnAboutUsButton()
      const currentUrl = await this.actionHelper.getCurrentUrl()
      expect(currentUrl).to.eq('https://alphabin.co/aboutPage.html')
    })

    it('User should be redirected to the home page', async () => {
      await allPages.homePage.navigateToHomePage()
    })

    it('Click on "Log in" button', async () => {
      await allPages.homePage.clickOnLoginLinkButton()
      await allPages.loginPage.assertLoginHeader()
      const currentUrl = await this.actionHelper.getCurrentUrl()
      expect(currentUrl).to.eq('https://demo.alphabin.co/login')
    })

    it('Click on Alpbabin Logo', async () => {
      await allPages.homePage.clickOnAlphabinLogo()
      await allPages.loginPage.assertPageTitle(homePageTitle)
      const currentUrl = await this.actionHelper.getCurrentUrl()
      expect(currentUrl).to.eq('https://demo.alphabin.co/home')
    })

    it('Click on "Sign up" button', async () => {
      await allPages.homePage.clickOnSignUpButton()
      await allPages.signupPage.assertCreateAccountHeader()
      const currentUrl = await this.actionHelper.getCurrentUrl()
      expect(currentUrl).to.eq('https://demo.alphabin.co/registration')
    })
  })

  describe('Verifying the user is able to access all the footer options', () => {
    const serviceName = 'API Automation Testing'
    const homePageTitle = 'Alphabin | Test Automation, Regression Testing, and Smoke Testing Services for Quality Assurance | demo.alphabin.com'

    it('User should be redirected to the home page', async () => {
      await allPages.homePage.navigateToHomePage()
    })

    it('Click on Alphabin Logo at the footer', async () => {
      await allPages.footerPage.clickOnAlphabinLogo()
    })

    it('Select a service from Footer listed under "All Services"', async () => {
      await allPages.footerPage.clickOnServiceFromFooter(serviceName)
    })    

    it('Click on Alphabin Logo at the footer', async () => {
      await allPages.footerPage.clickOnAlphabinLogo()
    })

    it('Click on the "LinkedIn" icon', async () => {
      await allPages.footerPage.clickOnLinkedInIcon()
      await this.actionHelper.delay(3000)
      await this.actionHelper.switchToBrowserTab(1)
      const title = await this.actionHelper.getPageTitle()
      expect(title).to.contain('Alphabin Technology Consulting | LinkedIn')
      const currentUrl = await this.actionHelper.getCurrentUrl()
      expect(currentUrl).to.eq('https://www.linkedin.com/company/alphabin/')
      await this.actionHelper.closeBrowserTab()
      await this.actionHelper.delay(2000)
    })

    it('Click on "Skype" icon', async () => {
      await allPages.footerPage.clickOnSkypeIcon()
      await this.actionHelper.delay(3000)
      await this.actionHelper.switchToBrowserTab(1)
      const currentUrl = await this.actionHelper.getCurrentUrl()
      expect(currentUrl).to.eq('https://alphabin.co/')
      await this.actionHelper.closeBrowserTab()
      await this.actionHelper.delay(2000)
    })

    it('Click on "Instagram" icon', async () => {
      await allPages.footerPage.clickOnInstagramIcon()
      await this.actionHelper.delay(3000)
      await this.actionHelper.switchToBrowserTab(1)
      const currentUrl = await this.actionHelper.getCurrentUrl()
      expect(currentUrl).to.eq('https://www.instagram.com/alphabin_consulting/?next=%2F')
      await this.actionHelper.closeBrowserTab()
      await this.actionHelper.delay(2000)
    })

    it('Click on the "Facebook" icon', async () => {
      await allPages.footerPage.clickOnFacebookIcon()
      await this.actionHelper.delay(3000)
      await this.actionHelper.switchToBrowserTab(1)
      const currentUrl = await this.actionHelper.getCurrentUrl()
      expect(currentUrl).to.eq('https://www.facebook.com/people/Alphabin-Technology-Consulting/100081731796422/')
      await this.actionHelper.closeBrowserTab()
      await this.actionHelper.delay(2000)
    })

    it('Click on the "Twitter" icon', async () => {
      await allPages.footerPage.clickOnTwitterIcon()
      await this.actionHelper.delay(3000)
      await this.actionHelper.switchToBrowserTab(1)
      const currentUrl = await this.actionHelper.getCurrentUrl()
      expect(currentUrl).to.eq('https://twitter.com/alphabin_')
      await this.actionHelper.closeBrowserTab()
      await this.actionHelper.delay(2000)
    })

    it('User should on the login page', async () => {
      await this.actionHelper.switchToBrowserTab(0)
      const title = await this.actionHelper.getPageTitle()
      expect(title).to.eq(homePageTitle)
    })
  })

  afterEach(async function () {
    if(this.currentTest.state === 'failed') {
      const screenshotPath = `./screenshots/${this.currentTest.fullTitle()}.png`
      await page.screenshot({ path: screenshotPath })
      console.info(`Screenshot saved: ${screenshotPath}`)
    }
  })

  after(async () => {

    if (page) {
      await page.close();
    }

    if (browser) {
      await page.context().close(); // Close the context associated with the page
      await browser.close(); // Close the browser
    }
  })
})

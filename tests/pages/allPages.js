const LoginPage = require('./loginPage')
const SignUpPage = require('./signupPage')
const HomePage = require('./homePage')
const CartPage = require('./cartPage')
const CheckoutPage = require('./checkoutPage')
const OrderConfirmationPage = require('./orderConfirmationPage')
const ProductPage = require('./productPage')
const FooterPage = require('./footerPage')

class AllPages {
    constructor(page) {
        this.loginPage = new LoginPage(page)
        this.signupPage = new SignUpPage(page)
        this.homePage = new HomePage(page)
        this.cartPage = new CartPage(page)
        this.checkoutPage = new CheckoutPage(page)
        this.orderConfirmationPage = new OrderConfirmationPage(page)
        this.productPage = new ProductPage(page)
        this.footerPage = new FooterPage(page)
    }
}

module.exports = AllPages;
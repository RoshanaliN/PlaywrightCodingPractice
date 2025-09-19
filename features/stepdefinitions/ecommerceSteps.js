import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';


Given('user loging in to ecommerce application using {string} and {string}', { timeout: 10 * 1000 }, async function (username, password) {


    await this.poManager.getLoginPage().goTo();
    await this.poManager.getLoginPage().validLogin(username, password);
});

When('add {string} product to cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    await this.poManager.getDashboadPage().waitForDashBoardLoading();
    await expect(this.poManager.getDashboadPage().resultTitle).toContainText("Showing 3 results")
    await this.poManager.getDashboadPage().addProductToCart(productName);
    await expect(this.poManager.getDashboadPage().cartItemCount).toContainText("1");
    await this.poManager.getDashboadPage().gotoCartPage();
});

Then('verify {string} is displayed in cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    await this.poManager.getCartPage().waitToload();
    // await poManager.getCartPage().verifyProductPresent();
    await this.poManager.getCartPage().gotoCheckOutPage();
});

// When('enter valid details and place order', async function () {
//     // Write code here that turns the phrase above into concrete actions
//     // await checkoutPage.waitToLoad()
//     // await checkoutPage.updateField("Name on Card", "Roshan")
//     // await checkoutPage.updateField("CVV Code", "123")
//     // await checkoutPage.applyCoupon("rahulshettyacademy")
//     // await checkoutPage.verifyUserName("rexw12345@gmail.com")
//     // await checkoutPage.inputCountry("ind", " India")
//     // await checkoutPage.gotoPaymentSuccessPage()
//     return 'pending';
// });


// Then('verify order is present in order history', function () {
//     // Write code here that turns the phrase above into concrete actions
// });
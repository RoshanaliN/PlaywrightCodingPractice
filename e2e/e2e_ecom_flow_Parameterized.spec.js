import { test, expect } from '@playwright/test';
import { POManager } from '../pageObjects/POManager';
import { CartPage } from '../pageObjects/CartPage';
import { CheckoutPage } from '../pageObjects/CheckoutPage';
const testDataSet = JSON.parse(JSON.stringify(require('../utils/placeOrderTestDataMultiple.json')))

for (const testData of testDataSet) {
    test(`@Web e2e_ecom_flow_Parameterized ${testData.productName}`, async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const username = testData.username;
        const password = testData.password;
        const productName = testData.productName;

        const poManager = new POManager(page)
        const cartPage = new CartPage(page)
        const checkoutPage = new CheckoutPage(page)

        await poManager.getLoginPage().goTo();
        await poManager.getLoginPage().validLogin(username, password);

        await poManager.getDashboadPage().waitForDashBoardLoading();
        await expect(poManager.getDashboadPage().resultTitle).toContainText("Showing 3 results")
        await poManager.getDashboadPage().addProductToCart(productName);
        await expect(poManager.getDashboadPage().cartItemCount).toContainText("1");
        await poManager.getDashboadPage().gotoCartPage();


        await poManager.getCartPage().waitToload();
        await poManager.getCartPage().gotoCheckOutPage();


        await checkoutPage.waitToLoad()
        await checkoutPage.updateField("Name on Card", "Roshan")
        await checkoutPage.updateField("CVV Code", "123")
        await checkoutPage.applyCoupon("rahulshettyacademy")
        await checkoutPage.verifyUserName(username)
        await checkoutPage.inputCountry("ind", " India")
        await checkoutPage.gotoPaymentSuccessPage()


        await expect(page.locator('h1.hero-primary')).toContainText("Thankyou for the order.");
        var orderId = await page.locator('label.ng-star-inserted').textContent();
        await page.locator('button[routerlink*=myorders]').click();

        const orderList = page.locator('tbody tr')
        await orderList.first().waitFor()
        const orderCount = await orderList.count()
        for (let i = 0; i < orderCount; i++) {
            const order = await orderList.nth(i).locator('th').textContent()
            if (orderId.includes(order)) {
                orderId = order
                await orderList.nth(i).locator('button').first().click()
                break
            }
        }
        await page.locator('div.col-text').waitFor()
        await expect(page.locator('div.col-text')).toHaveText(orderId)
        await expect(page.locator('div.address').first().locator(".content-title")).toContainText("Billing Address")
        await expect(page.locator('div.address').first().locator("p").first()).toContainText(testData.username)
        await expect(page.locator('div.address').first().locator("p").last()).toContainText("Country - India")
        await expect(page.locator('div.address').last().locator(".content-title")).toContainText("Delivery Address")
        await expect(page.locator('div.address').last().locator("p").first()).toContainText(testData.username)
        await expect(page.locator('div.address').last().locator("p").last()).toContainText("Country - India")
    })
}
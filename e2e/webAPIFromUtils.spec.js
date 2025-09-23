import { test, expect, request } from '@playwright/test';
import { apiUtils } from '../utils/apiUtils';

const loginPayload = { userEmail: "rexw12345@gmail.com", userPassword: "Test@123" }
const orderPayload = { orders: [{ country: "Austria", productOrderedId: "68a961719320a140fe1ca57c" }] }
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtil = new apiUtils(apiContext, loginPayload);
    response = await apiUtil.createOrder(orderPayload);
})

test('webAPI', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token)

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('.card-body b').first().waitFor();
    await page.getByRole('button', { name: 'ORDERS' }).click();
    const orderList = page.locator('tbody tr')
    await orderList.first().waitFor()
    console.log(response.orderId)
    await orderList.filter({ hasText: response.orderId }).getByRole('button', { name: 'View' }).click()
    await page.locator('div.col-text').waitFor()
    await expect(page.locator('div.col-text')).toHaveText(response.orderId)
    await expect(page.locator('div.address').first().getByText("Billing Address")).toBeVisible()
    await expect(page.locator('div.address').first().getByText("rexw12345@gmail.com")).toBeVisible()
    await expect(page.locator('div.address').first().getByText("Country - Austria")).toBeVisible()
    await expect(page.locator('div.address').last().getByText("Delivery Address")).toBeVisible()
    await expect(page.locator('div.address').last().getByText("rexw12345@gmail.com")).toBeVisible()
    await expect(page.locator('div.address').last().getByText("Country - Austria")).toBeVisible()
})

import { test, expect, request } from '@playwright/test';

const loginPayload = { userEmail: "rexw12345@gmail.com", userPassword: "Test@123" }
let token;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: loginPayload });
    expect(await loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
})

test('webAPI', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const products = page.locator('.card-body');
    const productName = "ADIDAS ORIGINAL";
    const ccFields = page.locator('.form__cc .field');

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token)

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('.card-body b').first().waitFor();
    await expect(await page.locator('div#res')).toContainText("Showing 3 results")
    let count = await products.count();
})
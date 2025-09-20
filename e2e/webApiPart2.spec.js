import { test, expect } from '@playwright/test';

let webContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("rexw12345@gmail.com");
    await page.locator("#userPassword").fill("Test@123");
    await page.locator("#login").click();
    await page.locator('.card-body b').first().waitFor();
    await context.storageState({ path: 'state.json' })
    webContext = await browser.newContext({ storageState: 'state.json' });
});

test('e2e_ecom_flow', async () => {

    const page = await webContext.newPage();
    const products = page.locator('.card-body');
    const productName = "ADIDAS ORIGINAL";
    const ccFields = page.locator('.form__cc .field');
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    // await page.locator("#userEmail").fill("rexw12345@gmail.com");
    // await page.locator("#userPassword").fill("Test@123");
    // await page.locator("#login").click();
    // await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    await expect(await page.locator('div#res')).toContainText("Showing 3 results")
    let count = await products.count();
    console.log(count);
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator('b').textContent() === productName) {
            await products.nth(i).locator('button').nth(1).click();
            break;
        }
    }
    expect(await page.locator('button[routerlink="/dashboard/cart"] label')).toContainText("1");
    await page.locator('button[routerlink="/dashboard/cart"]').click();
    await page.locator('div li').first().waitFor()
    await expect(page.locator('h3:has-text("ADIDAS ORIGINAL")').isVisible()).toBeTruthy();
    await page.locator('.btn-primary').last().click();
    await ccFields.first().waitFor()
    await expect(ccFields.nth(0).locator('.title').isVisible()).toBeTruthy();
    const ccFieldCount = await ccFields.count();
    for (let i = 0; i < ccFieldCount; i++) {
        const fieldTitle = await ccFields.nth(i).locator('.title').textContent();
        if (fieldTitle.includes("Name on Card")) {
            await ccFields.nth(i).locator('input').fill("Roshan");
        }
        if (fieldTitle.includes("CVV Code")) {
            await ccFields.nth(i).locator('input').fill("123");
        }
        if (fieldTitle.includes("Apply Coupon")) {
            await ccFields.nth(i).locator('input').fill("rahulshettyacademy");
        }
    }
    await page.locator('.form__cc button').click();
    await page.locator('.form__cc p').isVisible()
    await expect(page.locator('.form__cc p')).toContainText("* Coupon Applied");

    await expect(page.locator('.user__name label').nth(0)).toHaveText("rexw12345@gmail.com");
    await page.locator('.payment__shipping input').nth(1).pressSequentially("Ind", { delay: 150 });

    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await page.locator('div.actions a').click();
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
    await expect(page.locator('div.address').first().locator("p").first()).toContainText("rexw12345@gmail.com")
    await expect(page.locator('div.address').first().locator("p").last()).toContainText("Country - India")
    await expect(page.locator('div.address').last().locator(".content-title")).toContainText("Delivery Address")
    await expect(page.locator('div.address').last().locator("p").first()).toContainText("rexw12345@gmail.com")
    await expect(page.locator('div.address').last().locator("p").last()).toContainText("Country - India")
})

test('e2e_ecom_flow1', async () => {

    const page = await webContext.newPage();
    const products = page.locator('.card-body');
    const productName = "ADIDAS ORIGINAL";
    const ccFields = page.locator('.form__cc .field');
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    // await page.locator("#userEmail").fill("rexw12345@gmail.com");
    // await page.locator("#userPassword").fill("Test@123");
    // await page.locator("#login").click();
    // await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    await expect(await page.locator('div#res')).toContainText("Showing 3 results")
    let count = await products.count();
    console.log(count);
})
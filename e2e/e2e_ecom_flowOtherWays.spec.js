import { test, expect } from '@playwright/test';
import { console } from 'inspector';

test('e2e_ecom_flow_WithGetBy', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const products = page.locator('.card-body');
    const productName = "ADIDAS ORIGINAL";
    const ccFields = page.locator('.form__cc .field');
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill("rexw12345@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Test@123");
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    await expect(await page.locator('div#res')).toContainText("Showing 3 results")
    await page.locator('.card-body').filter({ hasText: productName }).getByRole("button", { name: 'Add To Cart' }).click();
    expect(await page.getByRole("listitem").getByRole("button", { name: 'Cart' })).toContainText("1");
    await page.getByRole("listitem").getByRole("button", { name: 'Cart' }).click();
    await page.locator('div li').first().waitFor()
    await expect(page.getByText(productName)).toBeVisible()
    await page.getByRole("button", { name: 'Checkout' }).click();
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
    await page.getByRole('button', { name: 'Apply Coupon' }).click();
    await page.locator('.form__cc p').isVisible()
    await expect(page.locator('.form__cc p')).toContainText("* Coupon Applied");

    await expect(page.locator('.user__name label').nth(0)).toHaveText("rexw12345@gmail.com");
    await page.getByPlaceholder('Select Country').pressSequentially("Ind", { delay: 150 });

    await page.getByRole("button", { name: 'India' }).nth(1).click()

    await page.getByText('PLACE ORDER').click();
    await expect(page.getByText('Thankyou for the order.')).toBeVisible();
    var orderId = await page.locator('label.ng-star-inserted').textContent();
    await page.getByRole('button',{name: 'ORDERS'}).click();
    const orderList = page.locator('tbody tr')
    await orderList.first().waitFor()
    orderId = orderId.slice(3,orderId.length-2)
    console.log(orderId)
    await orderList.filter({hasText: orderId}).getByRole('button',{name: 'View'}).click()
    await page.locator('div.col-text').waitFor()
    await expect(page.locator('div.col-text')).toHaveText(orderId)
    await expect(page.locator('div.address').first().getByText("Billing Address")).toBeVisible()
    await expect(page.locator('div.address').first().getByText("rexw12345@gmail.com")).toBeVisible()
    await expect(page.locator('div.address').first().getByText("Country - India")).toBeVisible()
    await expect(page.locator('div.address').last().getByText("Delivery Address")).toBeVisible()
    await expect(page.locator('div.address').last().getByText("rexw12345@gmail.com")).toBeVisible()
    await expect(page.locator('div.address').last().getByText("Country - India")).toBeVisible()
})
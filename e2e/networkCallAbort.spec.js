import { test, expect, request } from '@playwright/test';

test('webAPI', async ({ page }) => {
    const username = page.locator('#username')
    const signIn = page.locator('#signInBtn')
    const productTitles = page.locator('.card-body a')
    await page.route('**/*.jpg',
        async route => {
            route.abort()
        })
    page.on('request', request => console.log(request.url()))
    page.on('response', response => console.log(response.url(), response.status()))
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")
    await username.fill('rahulshettyacademya')
    await page.locator('#password').fill('learning')
    await signIn.click()
    await expect(page.locator('[style*="block"]')).toBeVisible
    await expect(page.locator('[style*="block"]')).toContainText("Incorrect")
    await expect(page.locator('[style*="none"]')).not.toBeVisible

    await username.fill("")
    await username.fill("rahulshettyacademy")
    await signIn.click()
    await expect(page).toHaveTitle("ProtoCommerce")
    console.log(await productTitles.first().textContent())
    console.log(await productTitles.nth(1).textContent())
    console.log(await productTitles.allTextContents())
})

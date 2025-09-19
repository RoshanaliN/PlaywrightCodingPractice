const { test, expect } = require('@playwright/test')

test("practice", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await page.locator('#userEmail').fill("rexw12345@gmail.com")
    await page.locator('#userPassword').fill("Test@123")
    await page.locator('#login').click()
    await expect(page).toHaveTitle("Let's Shop")

    // await expect(page.locator('#products').first()).toBeVisible()
    // await page.waitForLoadState('networkidle')
    await page.locator('.card-body b').first().waitFor()
    const allTitle = await page.locator('.card-body b').allTextContents()
    console.log(allTitle)
})

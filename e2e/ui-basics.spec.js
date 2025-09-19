const { test, expect } = require('@playwright/test');
const { console } = require('inspector');

test("first scenario", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage()
    await page.goto("https://google.com")
    await page.title()
})

test("browser context", async ({ page }) => {
    const username = page.locator('#username')
    const signIn = page.locator('#signInBtn')
    const productTitles = page.locator('.card-body a')
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


test('UI Controls', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const documentLink = page.locator('.float-right a').first()
    await page.locator('select.form-control').selectOption('consult')
    await page.locator('.radiotextsty').nth(1).click()
    await page.locator('#okayBtn').click()
    await expect(page.locator('.radiotextsty').nth(1)).toBeChecked()
    await expect(page.locator('.radiotextsty').first()).not.toBeChecked()
    await page.locator('#terms').check()
    await expect(page.locator('#terms')).toBeChecked()
    await page.locator('#terms').uncheck()
    expect(await page.locator('#terms').isChecked()).toBeFalsy
    await page.locator('#terms').check()
    expect(await page.locator('#terms').isChecked()).toBeTruthy
    await expect(documentLink).toHaveValue("class", "blinkingText")
})

test('childWindows', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const documentLink = page.locator('[href*="documents-request"]')
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click()
        ])
    await expect(newPage).toHaveTitle('RS Academy')
    const text = await newPage.locator(".red").textContent()
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    console.log("roshan " + text)
    page.locator('#username').fill(domain)
    console.log(await page.locator('#username').inputValue())
    await newPage.pause()
})
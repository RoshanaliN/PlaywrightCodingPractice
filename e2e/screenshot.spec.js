import { test, expect } from '@playwright/test'

test('screenShot', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await page.goto('https://www.google.com/')
    await page.goBack();
    await expect(page.url()).toContain('https://rahulshettyacademy.com/AutomationPractice/')
    await page.goForward()
    await expect(page.url()).toContain('https://www.google.com/')
    await page.goBack();
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible()
    await page.getByPlaceholder('Hide/Show Example').screenshot({ path: 'elementScreenshot.jpg' })
    await page.getByRole("button", { name: "Hide" }).click()
    await page.screenshot({ path: 'pageScreenshot.jpg' })
})

test.only('visualtesting', async ({ page }) => {
    await page.goto('https://www.rediff.com/')
    expect(await page.screenshot()).toMatchSnapshot('landing.png')

})
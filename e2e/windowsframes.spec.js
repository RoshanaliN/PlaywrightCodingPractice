import { test, expect } from '@playwright/test'

test('windows_iframe', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await page.goto('https://www.google.com/')
    await page.goBack();
    await expect(page.url()).toContain('https://rahulshettyacademy.com/AutomationPractice/')
    await page.goForward()
    await expect(page.url()).toContain('https://www.google.com/')
    await page.goBack();
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible()
    await page.getByRole("button", { name: "Hide" }).click()
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden()
    await page.getByRole("button", { name: "Show" }).click()

    page.on('dialog',dialog =>dialog.accept())
    await page.getByRole("button", { name: "Confirm" }).click()

    await page.getByRole("button",{name:'Mouse Hover'}).hover()
    await expect(page.locator('a[href*=top]')).toBeVisible()

    const frame = page.frameLocator('#courses-iframe')
    await frame.locator('a[href="lifetime-access"]:visible').click()
    const textValue = await frame.locator('.text h2').textContent()
    console.log(textValue.split(' ')[1])


})
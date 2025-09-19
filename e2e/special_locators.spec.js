import { test, expect } from '@playwright/test';

test.only("Special Locators", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel('Employed').check();
    await expect(page.getByLabel('Employed')).toBeChecked();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByPlaceholder('Password').fill('Roshan');
    await page.getByRole("button", { name: 'Submit' }).click();
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
    await page.getByRole("link",{name: 'Shop'}).click();

    await page.locator('app-card').filter({hasText:'Nokia Edge'}).getByRole("button").click()
})
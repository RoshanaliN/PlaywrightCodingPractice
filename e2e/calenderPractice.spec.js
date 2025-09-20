import { test, expect } from '@playwright/test';

test('calendar', async ({ page }) => {
    const month = "6"
    const day = "24"
    const year = "2023"
    const expectedList = [month, day, year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    await page.locator('.react-date-picker__inputGroup').click()
    await page.locator('.react-calendar__navigation__label').click()
    await page.locator('.react-calendar__navigation__label').click()
    await page.getByRole("button", { name: year }).click()
    await page.locator('.react-calendar__year-view__months__month').nth(month - 1).click()
    await page.getByRole("button", { name: day }).click()

    const inputs = page.locator('.react-date-picker__inputGroup__input')

    for (let i = 0; i < expectedList.length; i++) {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);

    }



})
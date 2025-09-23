import { expect } from "@playwright/test";
class CheckoutPage {
    constructor(page) {
        this.page = page
        this.ccFields = page.locator('.form__cc .field');
        this.couponButton = page.locator('.form__cc button')
        this.couponAppliedText = page.locator('.form__cc p')
        this.usernameLabel = page.locator('.user__name label')
        this.dropdown = page.locator(".ta-results")
        this.paymentButton = page.locator('div.actions a')

    }

    async waitToLoad() {
        await this.ccFields.first().waitFor()
        await expect(this.ccFields.nth(0).locator('.title').isVisible()).toBeTruthy();
    }

    async updateField(fieldName, fieldValue) {
        const ccFieldCount = await this.ccFields.count();
        for (let i = 0; i < ccFieldCount; i++) {
            const fieldTitle = await this.ccFields.nth(i).locator('.title').textContent();
            if (fieldTitle.includes(fieldName)) {
                await this.ccFields.nth(i).locator('input').fill(fieldValue);
                break
            }
        }
    }

    async applyCoupon(couponName) {
        await this.updateField("Apply Coupon", couponName)
        await this.couponButton.click();
        await expect(this.couponAppliedText).toContainText("* Coupon Applied");
    }

    async verifyUserName(username) {
        // await expect(this.usernameLabel).toContainText(username);
    }

    async inputCountry(textEntry, selectCountryName) {
        await this.page.locator('.payment__shipping input').nth(1).pressSequentially(textEntry, { delay: 150 });

        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await this.dropdown.locator("button").nth(i).textContent();
            if (text === selectCountryName) {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

    async gotoPaymentSuccessPage(){
            await this.paymentButton.click();
    }
}
module.exports = {CheckoutPage}
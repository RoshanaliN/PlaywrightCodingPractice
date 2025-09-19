class CartPage {
    constructor(page) {
        this.page = page
        this.rowItems = page.locator('div li')
        this.buttonList = page.locator('.btn-primary')

    }

    async waitToload() {
        await this.rowItems.first().waitFor()
    }

    // async verifyProductPresent(productName) {
    //     await expect(this.page.locator('h3:has-text("' + productName + '")').isVisible()).toBeTruthy();
    // }

    async gotoCheckOutPage() {
        await this.buttonList.last().click();
    }
}
module.exports = { CartPage }
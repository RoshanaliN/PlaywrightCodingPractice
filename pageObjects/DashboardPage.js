class DashboardPage {
    constructor(page) {
        this.page = page
        this.listOfCardsTitle = page.locator('.card-body b')
        this.resultTitle = page.locator('div#res')
        this.products = page.locator('.card-body');
        this.cartItemCount = page.locator('button[routerlink="/dashboard/cart"] label')
        this.cartButton = page.locator('button[routerlink="/dashboard/cart"]')


    }

    async waitForDashBoardLoading() {
        await this.page.waitForLoadState('networkidle');
        await this.listOfCardsTitle.first().waitFor();
    }

    async addProductToCart(productName) {
        let count = await this.products.count();
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator('b').textContent() === productName) {
                await this.products.nth(i).locator('button').nth(1).click();
                break;
            }
        }
    }

    async gotoCartPage(){
            await this.cartButton.click();
    }
}

module.exports = {DashboardPage}
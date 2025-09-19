import { CartPage } from "./CartPage.js";
import { DashboardPage } from "./DashboardPage.js";
import { LoginPage } from "./loginPage.js";

export class POManager {
    constructor(page) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.dashboardPage = new DashboardPage(this.page)
        this.cartPage = new CartPage(this.page)
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboadPage() {
        return this.dashboardPage;
    }
        getCartPage() {
        return this.cartPage;
    }
}
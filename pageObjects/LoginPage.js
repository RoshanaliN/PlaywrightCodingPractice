class LoginPage {
    constructor(page) {
        this.page = page
        this.signInButton = page.locator("#login")
        this.userNameTextBox = page.locator("#userEmail")
        this.passwordTextbox = page.locator("#userPassword")
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async validLogin(userName, password) {
        await this.userNameTextBox.fill("rexw12345@gmail.com");
        await this.passwordTextbox.fill("Test@123");
        await this.signInButton.click();
    }
}

module.exports = { LoginPage }
import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly txtTitle: Locator
    readonly txtUsername: Locator
    readonly txtPassword: Locator
    readonly btnLogin: Locator
    readonly txtCredentialsList: Locator
    readonly txtErrorCredentials: Locator
    readonly imgUsernameErrorIcon: Locator
    readonly imgPasswordErrorIcon: Locator
    readonly btnClearError: Locator

    constructor(page: Page) {
        this.page = page;
        this.txtTitle = this.page.locator(".login_logo");
        this.txtUsername = this.page.getByTestId("username");
        this.txtPassword = this.page.getByTestId("password");
        this.btnLogin = this.page.getByTestId("login-button");
        this.txtCredentialsList = this.page.locator("#login_credentials");
        this.txtErrorCredentials = this.page.getByTestId("error");
        this.imgUsernameErrorIcon = this.page.locator("[data-test='username'] + .error_icon")
        this.imgPasswordErrorIcon = this.page.locator("[data-test='password'] + .error_icon")
        this.btnClearError = this.txtErrorCredentials.locator(".error-button");
    }

    async goTo() {
        await this.page.goto("/");
        await this.txtTitle.isVisible();
    }

    async fillUsername(username: string) {
        await this.txtUsername.clear();
        await this.txtUsername.fill(username);
    }

    async fillPassword(password: string) {
        await this.txtPassword.clear();
        await this.txtPassword.fill(password);
    }

    async clickLogin() {
        await this.btnLogin.click();
    }

    // Verification section

    /**
     * Perform login by filling login and password and pressing login button.
     * @param username - Value to set in username field.
     * @param password - Value to set in password field.
     */
    async login(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLogin();
    }

    async verifyLoginPage() {
        await expect(this.txtTitle).toContainText("Swag Labs");
        await expect(this.txtPassword).toBeVisible();
        await expect(this.btnLogin).toBeVisible();
        await expect(this.txtCredentialsList).toBeVisible();
        await expect(this.txtUsername).toBeVisible();
    }

    async verifyLoginPageWithError(errorMessage: string) {
        await expect(this.txtErrorCredentials).toContainText(errorMessage);
        await expect(this.imgUsernameErrorIcon).toBeVisible();
        await expect(this.imgPasswordErrorIcon).toBeVisible();
        await expect(this.btnClearError).toBeVisible();
    }
}
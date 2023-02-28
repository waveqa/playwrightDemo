import { expect, test } from "@playwright/test";
import { PageFactory } from "./../services/pageFactory";

test.describe("Login cases", () => {
    let pageFactory: PageFactory
    let loginPage: any
    let homePage: any

    test.beforeEach(async ({ page }) => {
        pageFactory = new PageFactory(page);
        loginPage = pageFactory.loginPage;
        homePage = pageFactory.homePage;
        await loginPage.goTo();
    });

    test("Login with valid credentials", async ({ page }) => {
        await loginPage.verifyLoginPage();

        await loginPage.login("standard_user", "secret_sauce");

        await expect(homePage.btnCart).toBeVisible();
    });

    test("Fill only username.", async () => {
        await loginPage.fillUsername("some_username");
        await loginPage.clickLogin();

        await loginPage.verifyLoginPageWithError("Epic sadface: Password is required");
    });

    test("Fill only password.", async () => {
        await loginPage.fillPassword("some_pass");
        await loginPage.clickLogin();

        await loginPage.verifyLoginPageWithError("Epic sadface: Username is required");
    });

    test("Login with invalid credentials", async () => {
        await loginPage.login("some_user", "secret_sauce");

        await loginPage.
            verifyLoginPageWithError("Epic sadface: Username and password do not match any user in this service");
    });
});

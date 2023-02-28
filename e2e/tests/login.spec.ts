import { expect, test } from "@playwright/test";
import { HomePage } from "../services/home/home.po";
import { LoginPage } from "../services/login/login.po";
import * as pageFactory from "./../services/pageFactory";

test.describe("Login cases", () => {
    let loginPage: LoginPage;
    let homePage: HomePage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        await loginPage.goTo();
    });

    test("Login with valid credentials", async ({ page }) => {
        // const loginPage = new LoginPage(page);
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

    test("Login with invalid credentials", async ({ page }) => {
        await loginPage.verifyLoginPage();

        await loginPage.login("some_user", "secret_sauce");

        await loginPage.
            verifyLoginPageWithError("Epic sadface: Username and password do not match any user in this service");
    });
});

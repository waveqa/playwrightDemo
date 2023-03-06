import { expect, test } from "@playwright/test";
import { PageFactory } from "./../../services/pageFactory";
import * as creds from "./../../../e2e/data/credentials.json";

test.describe("Login cases", () => {
    let pageFactory: PageFactory
    let loginPage: any
    let inventoryPage: any

    test.beforeEach(async ({ page }) => {
        pageFactory = new PageFactory(page);
        loginPage = pageFactory.loginPage;
        inventoryPage = pageFactory.inventoryPage;
        await loginPage.goTo();
    });

    test("Login with valid credentials", async () => {
        await loginPage.verifyLoginPage();
        
        await loginPage.login(creds[process.env.USER].username, creds.firstUser.password);

        await expect(inventoryPage.btnCart).toBeVisible();
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

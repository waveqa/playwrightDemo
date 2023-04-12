import { test as base } from '@playwright/test';
import { LoginPage } from "../e2e/services/login/login.po"
import * as creds from "../e2e/data/credentials.json";
import { PageFactory } from "../e2e/services/pageFactory";

// Declare the types of your fixtures.
type MyFixtures = {
  loginPage: LoginPage;
  pageFactory: PageFactory
};

// Check how work fixture using login page
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    // Set up the fixture.
    const loginPage = new LoginPage(page);
    await test.step("should login to the store.", async () => {
      await loginPage.goTo();
      await loginPage.login(creds[process.env.USER].username, creds.firstUser.password);
    });
    // Use the fixture value in the test.
    await use(loginPage);
  },

  pageFactory: async ({ page }, use) => {
    const pageFactory = new PageFactory(page);
    await use(pageFactory)
  }
});

export { expect } from '@playwright/test';
import * as Bottle from "bottlejs";
import { Locator, Page } from "@playwright/test";
import { LoginPage } from "./login/login.po";
// var bottlejs = Bottle.pop("test");
// bottlejs.service("PageFactory", PageFactory)


// bottlejs.factory("PageFactory", () => {
//     return {
//         getLoginPage: (page) => new LoginPage(page)        
//     }
// });

// export = bottlejs;
export class PageFactory {
    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
    }
}
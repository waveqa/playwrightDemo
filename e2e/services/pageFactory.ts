import { Page } from "@playwright/test";
import { LoginPage } from "./login/login.po";
import { HomePage } from "./home/home.po";
// import * as Bottle from "bottlejs";
// var bottlejs = Bottle.pop("test");
// bottlejs.service("PageFactory", PageFactory)


// bottlejs.factory("PageFactory", () => {
//     return {
//         getLoginPage: (page) => new LoginPage(page)        
//     }
// });

// export = bottlejs;
export class PageFactory {

    readonly page: Page
    readonly loginPage: LoginPage
    readonly homePage: HomePage

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.homePage = new HomePage(this.page);
    }
}
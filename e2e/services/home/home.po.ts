import { Locator, Page } from "@playwright/test";

export class HomePage {

    readonly page: Page
    readonly btnCart: Locator

    constructor(page: Page) {
        this.page = page;
        this.btnCart = page.locator("#shopping_cart_container");
    }
}
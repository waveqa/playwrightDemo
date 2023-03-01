import { Page } from "@playwright/test";
import { LoginPage } from "./login/login.po";
import { InventoryPage } from "./inventory/inventory.po";
import { CartPage } from "./cart/cart.po";
export class PageFactory {

    readonly page: Page
    readonly loginPage: LoginPage
    readonly inventoryPage: InventoryPage
    readonly cartPage: CartPage

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.inventoryPage = new InventoryPage(this.page);
        this.cartPage = new CartPage(this.page);
    }
}
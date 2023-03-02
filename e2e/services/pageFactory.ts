import { Page } from "@playwright/test";
import { LoginPage } from "./login/login.po";
import { InventoryPage } from "./inventory/inventory.po";
import { CartPage } from "./cart/cart.po";
import { CheckoutPage } from "./checkout/checkout.po";
import { CheckoutCompletePage } from "./checkout/checkoutComplete.po";
export class PageFactory {

    readonly page: Page
    readonly loginPage: LoginPage
    readonly inventoryPage: InventoryPage
    readonly cartPage: CartPage
    readonly checkoutPage: CheckoutPage
    readonly checkoutCompletePage: CheckoutCompletePage

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.inventoryPage = new InventoryPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.checkoutCompletePage = new CheckoutCompletePage(this.page);
    }
}
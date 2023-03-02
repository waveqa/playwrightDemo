import { expect, Locator, Page } from "@playwright/test";

export class CheckoutCompletePage {

    readonly page: Page
    readonly txtTitle: Locator
    readonly imgSuccess: Locator
    readonly txtCompleteHeader: Locator
    readonly txtCompleteDescription: Locator
    readonly btnBackHome: Locator

    constructor(page) {
        this.page = page;
        this.txtTitle = this.page.locator(".title");
        this.imgSuccess = this.page.locator(".pony_express");
        this.txtCompleteHeader = this.page.locator(".complete-header");
        this.txtCompleteDescription = this.page.locator(".complete-text");
        this.btnBackHome = this.page.getByTestId("back-to-products");
    }

    async clickBackHome() {
        await this.btnBackHome.click();
    }

    // Verify section

    async verifyCheckoutComplete() {
        await expect(this.txtTitle).toHaveText("Checkout: Complete!");
        await expect(this.imgSuccess).toBeVisible();
        await expect(this.txtCompleteHeader).toHaveText("Thank you for your order!");
        await expect(this.txtCompleteDescription).toHaveText(
            "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
            );
        await expect(this.btnBackHome).toBeVisible();
        await expect(this.btnBackHome).toHaveText("Back Home");
    }
}
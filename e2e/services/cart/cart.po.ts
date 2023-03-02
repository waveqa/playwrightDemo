import { expect, Locator, Page } from "@playwright/test";

export class CartPage {

    readonly page: Page
    readonly btnContinueShopping: Locator
    readonly btnCheckout: Locator
    readonly locCartItem: string
    readonly cartItemContainer: Locator

    constructor(page: Page) {
        this.page = page;
        this.btnContinueShopping = this.page.getByTestId("continue-shopping");
        this.btnCheckout = this.page.getByTestId("checkout")
        this.locCartItem = ".cart_item";
        this.cartItemContainer = this.page.locator(this.locCartItem)
    }

    async clickCheckout() {
        await this.btnCheckout.click();
    }

    async cartItemEntry(productName: string) {
        return await this.page.locator(this.locCartItem, { hasText: productName });
    }

    async txtInventoryQuantity(productName: string) {
        return (await this.cartItemEntry(productName)).locator(".cart_quantity");
    }

    async txtInventoryName(productName: string) {
        return (await this.cartItemEntry(productName)).locator(".inventory_item_name");
    }

    async txtInventoryDescription(productName: string) {
        return (await this.cartItemEntry(productName)).locator(".inventory_item_desc");
    }

    async txtInventoryPrice(productName: string) {
        return (await this.cartItemEntry(productName)).locator(".inventory_item_price");
    }

    async btnInventoryRemove(productName: string) {
        return (await this.cartItemEntry(productName)).getByTestId("remove-sauce-labs-backpack");
    }

    async verifyInventoryPresence({ productName, productPrice, productDescription, productQuantity }) {
        await expect(await this.btnInventoryRemove(productName)).toBeVisible();
        await expect(await this.btnInventoryRemove(productName)).toHaveText("Remove");
        await expect(await this.txtInventoryPrice(productName)).toHaveText(productPrice);
        await expect(await this.txtInventoryDescription(productName)).toHaveText(productDescription);
        await expect(await this.txtInventoryName(productName)).toHaveText(productName);
        await expect(await this.txtInventoryQuantity(productName)).toHaveText(productQuantity);
    }
}
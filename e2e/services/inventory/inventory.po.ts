import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {

    readonly page: Page
    readonly btnCart: Locator
    readonly txtCartBadge: Locator

    constructor(page: Page) {
        this.page = page;
        this.btnCart = this.page.locator("#shopping_cart_container");
        this.txtCartBadge = this.page.locator(".shopping_cart_badge");
    }

    async clickCart() {
        await this.btnCart.click();
    }

    async inventoryItemEntry(productName: string) {
        return await this.page.locator(".inventory_item", { hasText: productName });
    }

    async btnGetToCart(productName: string) {
        return (await this.inventoryItemEntry(productName)).getByTestId("add-to-cart-sauce-labs-backpack");
    }

    async btnRemoveInventory(productName: string) {
        return (await this.inventoryItemEntry(productName)).getByTestId("remove-sauce-labs-backpack");
    }

    async clickGetToCart(productName: string) {
        (await this.btnGetToCart(productName)).click();
    }

    async clickRemoveInventory(productName: string) {
        (await this.btnRemoveInventory(productName)).click();
    }

    async txtInventoryPrice(productName: string) {
        return (await this.inventoryItemEntry(productName)).locator(".inventory_item_price");
    }

    async txtInventoryDescription(productName: string) {
        return (await this.inventoryItemEntry(productName)).locator(".inventory_item_desc");
    }

    async imgInventoryLogo(productName: string) {
        return (await this.inventoryItemEntry(productName)).locator("img.inventory_item_img");
    }

    async txtInventoryName(productName: string) {
        return (await this.inventoryItemEntry(productName)).locator(".inventory_item_name");
    }

    async verifyInventoryItem({ productName, productPrice, productDescription }) {
        await expect(await this.btnGetToCart(productName)).toBeVisible();
        await expect(await this.btnGetToCart(productName)).toHaveText("Add to cart");
        await expect(await this.txtInventoryPrice(productName)).toHaveText(productPrice);
        await expect(await this.txtInventoryDescription(productName)).toHaveText(productDescription);
        await expect(await this.imgInventoryLogo(productName)).toBeVisible();
        await expect(await this.txtInventoryName(productName)).toHaveText(productName);
    }
}
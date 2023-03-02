import { expect, Locator, Page } from "@playwright/test";

export class CheckoutPage {

    readonly page: Page
    readonly txtFirstName: Locator
    readonly txtSecondName: Locator
    readonly txtZipCode: Locator
    readonly btnCancel: Locator
    readonly btnContinue: Locator
    readonly txtPaymentInfoLabel: Locator
    readonly txtPaymentValue: Locator
    readonly txtShippingInfoLabel: Locator
    readonly txtShippingInfoValue: Locator
    readonly txtPriceLabel: Locator
    readonly txtItemTotalValue: Locator
    readonly txtTaxValue: Locator
    readonly txtTotal: Locator
    readonly btnFinish: Locator
    readonly locCartItem: string
    readonly eleCartItem: Locator

    constructor(page: Page) {
        this.page = page;
        this.txtFirstName = this.page.getByTestId("firstName");
        this.txtSecondName = this.page.getByTestId("lastName");
        this.txtZipCode = this.page.getByTestId("postalCode");
        this.btnCancel = this.page.getByTestId("cancel");
        this.btnContinue = this.page.getByTestId("continue");
        this.txtPaymentInfoLabel = this.page.locator(".summary_info_label").nth(0);
        this.txtPaymentValue = this.page.locator(".summary_value_label").nth(0);
        this.txtShippingInfoLabel = this.page.locator(".summary_info_label").nth(1);
        this.txtShippingInfoValue = this.page.locator(".summary_value_label").nth(1);
        this.txtPriceLabel = this.page.locator(".summary_info_label").nth(2);
        this.txtItemTotalValue = this.page.locator(".summary_subtotal_label");
        this.txtTaxValue = this.page.locator(".summary_tax_label");
        this.txtTotal = this.page.locator(".summary_total_label");
        this.btnFinish = this.page.getByTestId("finish");
        this.locCartItem = ".cart_item";
        this.eleCartItem = this.page.locator(this.locCartItem);
    }

    async clickFinish() {
        await this.btnFinish.click();
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

    async fillFistName(firstName: string) {
        await this.txtFirstName.fill(firstName);
    }

    async fillSecondName(secondName: string) {
        await this.txtSecondName.fill(secondName);
    }

    async fillZipCode(zipCode: string) {
        await this.txtZipCode.fill(zipCode);
    }

    async clickCancel() {
        await this.btnCancel.click();
    }

    async clickContinue() {
        await this.btnContinue.click();
    }

    async fillCheckoutInfo({ firstName, secondName, zipCode }) {
        await this.fillFistName(firstName);
        await this.fillSecondName(secondName);
        await this.fillZipCode(zipCode);
        await this.clickContinue();
    }

    // Verification section

    async verifyCartInfo({
        paymentValue, shippingValue, price, tax, totalPrice
    }) {
        await expect(this.txtPaymentInfoLabel).toHaveText("Payment Information");
        await expect(this.txtPaymentValue).toHaveText(paymentValue);
        await expect(this.txtShippingInfoLabel).toHaveText("Shipping Information");
        await expect(this.txtShippingInfoValue).toHaveText(shippingValue);
        await expect(this.txtPriceLabel).toHaveText("Price Total");
        await expect(this.txtItemTotalValue).toHaveText("Item total: " + price);
        await expect(this.txtTaxValue).toHaveText("Tax: " + tax);
        await expect(this.txtTotal).toHaveText("Total: " + totalPrice);
    }

    async verifyInventoryPresence({ productName, productPrice, productDescription, productQuantity }) {
        await expect(await this.txtInventoryPrice(productName)).toHaveText(productPrice);
        await expect(await this.txtInventoryDescription(productName)).toHaveText(productDescription);
        await expect(await this.txtInventoryName(productName)).toHaveText(productName);
        await expect(await this.txtInventoryQuantity(productName)).toHaveText(productQuantity);
    }
}
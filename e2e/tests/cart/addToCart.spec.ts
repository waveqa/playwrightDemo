import { expect, test } from "@playwright/test";
import { faker } from '@faker-js/faker';
import { CartPage } from "../../services/cart/cart.po";
import { CheckoutPage } from "../../services/checkout/checkout.po";
import { InventoryPage } from "../../services/inventory/inventory.po";
import { LoginPage } from "../../services/login/login.po";
import { PageFactory } from "../../services/pageFactory";
import { CheckoutCompletePage } from "../../services/checkout/checkoutComplete.po";


test.describe("Add to cart.", () => {
    let pageFactory: PageFactory
    let loginPage: LoginPage
    let inventoryPage: InventoryPage
    let cartPage: CartPage
    let checkoutPage: CheckoutPage
    let checkoutCompletePage: CheckoutCompletePage

    const inventoryData = {
        productName: "Sauce Labs Backpack",
        productPrice: "$29.99",
        productDescription: "carry.allTheThings() with the sleek, streamlined Sly Pack that " +
            "melds uncompromising style with unequaled laptop and tablet protection."
    }

    test.beforeEach(async ({ page }) => {
        pageFactory = new PageFactory(page);
        loginPage = pageFactory.loginPage;
        inventoryPage = pageFactory.inventoryPage;
        cartPage = pageFactory.cartPage;
        checkoutPage = pageFactory.checkoutPage;
        checkoutCompletePage = pageFactory.checkoutCompletePage;
        await loginPage.goTo();
    });

    test("Buy product.", async ({ page }) => {

        await test.step("should login to the store.", async () => {
            await loginPage.login("standard_user", "secret_sauce");
        });

        await test.step(`should see ${inventoryData.productName}.`, async () => {
            await inventoryPage.verifyInventoryItem(inventoryData);
        });

        await test.step("should click add to cart.", async () => {
            await inventoryPage.clickGetToCart(inventoryData.productName);
        });

        await test.step("should see remove button on the inventory and bucket with number.", async () => {
            await expect(await inventoryPage.btnRemoveInventory(inventoryData.productName)).toContainText("Remove");
            await expect(await inventoryPage.txtCartBadge).toContainText("1");
        });

        await test.step("should click cart and see product info.", async () => {
            await inventoryPage.clickCart();

            const cartData = {
                productQuantity: "1",
                ...inventoryData
            };
            await cartPage.verifyInventoryPresence(cartData)
            await expect(await cartPage.cartItemContainer.count()).toEqual(1);
        });

        await test.step("should click checkout.", async () => {
            await cartPage.clickCheckout();
        });

        await test.step("should fill customer checkout info and navigate to the next checkout page.", async () => {
            await checkoutPage.fillCheckoutInfo({
                firstName: faker.name.firstName(),
                secondName: faker.name.lastName(),
                zipCode: faker.address.zipCode()
            });
        });

        await test.step("should see information on second checkout page", async () => {
            const productData = {
                productQuantity: "1",
                ...inventoryData
            };
            const cartData = {
                paymentValue: "SauceCard #31337",
                shippingValue: "Free Pony Express Delivery!",
                price: "$29.99",
                tax: "$2.40",
                totalPrice: "$32.39"
            }

            await checkoutPage.verifyCartInfo(cartData);
            await checkoutPage.verifyInventoryPresence(productData)
            await expect(await checkoutPage.eleCartItem.count()).toEqual(1);
        });

        await test.step("should click finish and see checkout complete.", async () => {
            await checkoutPage.clickFinish();

            await checkoutCompletePage.verifyCheckoutComplete();
        });
    });
});
import test, { expect } from "@playwright/test";
import { CartPage } from "../../services/cart/cart.po";
import { InventoryPage } from "../../services/inventory/inventory.po";
import { LoginPage } from "../../services/login/login.po";
import { PageFactory } from "../../services/pageFactory";


test.describe.only("Add to cart.", () => {
    let pageFactory: PageFactory
    let loginPage: LoginPage
    let inventoryPage: InventoryPage
    let cartPage: CartPage
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

        await test.step("should remove button on the inventory and bucket with number.", async () => {
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
    });
});
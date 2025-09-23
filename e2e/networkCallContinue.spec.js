import { test, expect, request } from '@playwright/test';
import { apiUtils } from '../utils/apiUtils';

const loginPayload = { userEmail: "rexw12345@gmail.com", userPassword: "Test@123" }
const orderPayload = { orders: [{ country: "Austria", productOrderedId: "68a961719320a140fe1ca57c" }] }
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtil = new apiUtils(apiContext, loginPayload);
    response = await apiUtil.createOrder(orderPayload);
})

test('networkCallContinue', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token)

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('.card-body b').first().waitFor();
    await page.getByRole('button', { name: 'ORDERS' }).click();
    const orderList = page.locator('tbody tr')
    await orderList.first().waitFor()
    console.log(response.orderId)

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        async route => {
            route.continue({
                url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'
            })
        }
    )


    await orderList.filter({ hasText: response.orderId }).getByRole('button', { name: 'View' }).click()
    await expect(page.getByText('You are not authorize to view this order')).toBeVisible()
})

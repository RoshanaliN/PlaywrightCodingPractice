import { test, expect, request } from '@playwright/test';

const loginPayload = { userEmail: "rexw12345@gmail.com", userPassword: "Test@123" }
const fakePayload = { data: [], message: "No Orders" };
let token;
let orderId;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: loginPayload });
    expect(await loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    const orderPayload = { orders: [{ country: "Austria", productOrderedId: "68a961719320a140fe1ca57c" }] }
    const createOrderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: {
                'authorization': token,
                'content-type': 'application/json'

            }
        });
    expect(await createOrderResponse.ok()).toBeTruthy();
    const createOrderResponseJson = await createOrderResponse.json();
    orderId = createOrderResponseJson.orders[0];

})

test('networkCallFulfil', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token)

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('.card-body b').first().waitFor();

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*', 
        async route => {
            const response = await page.request.fetch(route.request())
            let body = JSON.stringify(fakePayload);
            route.fulfill({
            response,
            body,
        })
    })

    await page.getByRole('button', { name: 'ORDERS' }).click();
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*')
    await expect(page.locator('.mt-4')).toHaveText('You have No Orders to show at this time. Please Visit Back Us')
})

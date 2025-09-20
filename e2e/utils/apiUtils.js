export class apiUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload
  }

  async getToken() {
    const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: this.loginPayload });
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    return token;
  }

  async createOrder(payload) {
    let response = {}
    response.token = await this.getToken()
    console.log(response.token)
    const createOrderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: payload,
        headers: {
          'authorization': response.token,
          'content-type': 'application/json'

        }
      });
    const createOrderResponseJson = await createOrderResponse.json();
    response.orderId = createOrderResponseJson.orders[0];
    return response;
  }
}
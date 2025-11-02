import {HOST_URL} from "../shared/const";
import {HttpError} from "../shared/api/HttpError";
import {OrderModel} from "../components/OrderDetails/types";

class OrderApi {

  readonly API_URL: string;

  constructor() {
    console.log(HOST_URL);
    this.API_URL = `${HOST_URL}/api/orders`;
    this.createOrder = this.createOrder.bind(this);
  }

  async createOrder(ingredients: string[]): Promise<OrderModel> {
    const response = await fetch(this.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ingredients})
    });

    if (!response.ok) {
      throw await HttpError.setMessage(response);
    }

    return await response.json() as Promise<OrderModel>;
  };
}

export const orderApi = new OrderApi();

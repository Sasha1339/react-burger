import {orderReducer} from "./order";
import {initialState} from "./order";
import {orderActions} from "./order";


const mockOrders = {
  orders: [
    {
      ingredients: ['1', '2'],
      _id: '1',
      status: 'done',
      number: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
  total: 10,
  totalToday: 10,
  success: true,
}

describe('order reducer', () => {

  it ('should return the initial state', () => {
    expect(orderReducer(undefined, {})).toEqual(initialState);
  })


  it ('should handle clearOrder', () => {

    const result = orderReducer(initialState, orderActions.clearOrder());

    expect(result.order).toEqual(null);
  })

  it ('should handle getAllOrders', () => {

    const result = orderReducer(initialState, orderActions.getAllOrders(mockOrders));

    expect(result.allOrders).toEqual(mockOrders);
  })

  it ('should handle getAllUserOrders', () => {


    const result = orderReducer(initialState, orderActions.getAllUserOrders(mockOrders));

    expect(result.allUserOrders).toEqual(mockOrders);
  })

})
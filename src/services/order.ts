import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {orderApi} from "../api/order";
import {OrderModel} from "../components/OrderDetails/types";

type OrderState = {
  order: OrderModel | null;

  orderRequests: boolean;
  orderFailed: boolean;
}

const initialState: OrderState = {
  order: null,

  orderRequests: false,
  orderFailed: false
}

export const createOrderRequest = createAsyncThunk('order/createOrderRequest', orderApi.createOrder);

const orderSlice = createSlice({
  name: "order",
  initialState,
  selectors: {
    order: (state) => state.order,
    orderRequest: (state) => state.orderRequests,
    orderFailed: (state) => state.orderFailed,
  },
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderRequest.pending, (state) => {
        state.orderRequests = true;
        state.orderFailed = false;
      })
      .addCase(createOrderRequest.fulfilled, (state, action) => {
        state.orderRequests = false;
        state.orderFailed = false;
        state.order = action.payload;
      })
      .addCase(createOrderRequest.rejected, (state, action) => {
        state.orderRequests = false;
        state.orderFailed = true;
        console.log(action.error.message);
      })
  }
})

export const { reducer: orderReducer, selectors: orderSelectors, actions: orderActions } = orderSlice;


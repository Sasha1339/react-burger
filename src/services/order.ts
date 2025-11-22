import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {orderApi} from "../api/order";
import {OrderModel} from "../components/OrderDetails/types";
import {OrdersFeedModel} from "../components/OrderFeed/types";

type OrderState = {
  order: OrderModel | null;
  allOrders: OrdersFeedModel | null
  allUserOrders: OrdersFeedModel | null

  orderRequests: boolean;
  orderFailed: boolean;
}

export const initialState: OrderState = {
  order: null,
  allOrders: null,
  allUserOrders: null,

  orderRequests: false,
  orderFailed: false
}

export const createOrderRequest = createAsyncThunk('order/createOrderRequest', orderApi.createOrder);

const orderSlice = createSlice({
  name: "order",
  initialState,
  selectors: {
    order: (state) => state.order,
    allOrders: (state) => state.allOrders,
    allUserOrders: (state) => state.allUserOrders,
    allReadyOrders: (state) => state.allOrders?.orders.filter(e => e.status === 'done'),
    allInProcessOrders: (state) => state.allOrders?.orders.filter(e => e.status === 'pending'),
    orderRequest: (state) => state.orderRequests,
    orderFailed: (state) => state.orderFailed,
  },
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    },
    getAllOrders: (state, action:{ payload: OrdersFeedModel }) => {
      state.allOrders = action.payload;
    },
    getAllUserOrders: (state, action:{ payload: OrdersFeedModel }) => {
      state.allUserOrders = action.payload;
    },
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


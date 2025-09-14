import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

type OrderState = {
  order: [];

  orderRequests: boolean;
  orderFailed: boolean;
}

const initialState: OrderState = {
  order: [],

  orderRequests: false,
  orderFailed: false
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  selectors: {
    order: (state) => state.order,
    orderRequest: (state) => state.orderRequests,
    orderFailed: (state) => state.orderFailed,
  },
  reducers: {

  },
  extraReducers: (builder) => {

  }
})

export { }

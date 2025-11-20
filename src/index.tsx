import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {combineReducers} from "redux";
import {ingredientsActions, ingredientsReducer} from "./services/ingredients";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import {orderActions, orderReducer} from "./services/order";
import {BrowserRouter as Router} from "react-router-dom";
import {authActions, authReducer} from "./services/auth";
import App from "./App";
import {authMiddlewareRemoveToken, authMiddlewareSetToken} from "./services/middlewares";
import {socketMiddleware} from "./services/wsMiddleware";
import {socketActions} from "./services/actions/socket";
import {WS_URL} from "./shared/const";

export const reducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authMiddlewareSetToken)
      .concat(authMiddlewareRemoveToken)
      .concat(socketMiddleware(`${WS_URL}/orders/all`, orderActions.getAllOrders.type))
      .concat(socketMiddleware(`${WS_URL}/orders`, orderActions.getAllUserOrders.type, true)),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppActions =
  | ReturnType<typeof ingredientsActions[keyof typeof ingredientsActions]>
  | ReturnType<typeof orderActions[keyof typeof orderActions]>
  | ReturnType<typeof authActions[keyof typeof authActions]>
  | ReturnType<typeof socketActions[keyof typeof socketActions]>;


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename={'/react-burger'}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

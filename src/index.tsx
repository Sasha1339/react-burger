import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {combineReducers} from "redux";
import {ingredientsReducer} from "./services/ingredients";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import {orderReducer} from "./services/order";
import {BrowserRouter as Router} from "react-router-dom";
import {authReducer} from "./services/auth";
import App from "./App";
import {authMiddlewareRemoveToken, authMiddlewareSetToken} from "./services/middlewares";

export const reducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddlewareSetToken).concat(authMiddlewareRemoveToken),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

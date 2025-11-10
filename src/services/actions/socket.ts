import {createAction} from "@reduxjs/toolkit";
import {OrdersFeedModel} from "../../components/OrderFeed/types";

const startConnection = createAction('socket/startConnection');
const connectionSuccess = createAction('socket/successConnection');
const closeConnection = createAction('socket/closeConnection');
const errorConnection = createAction('socket/errorConnection');
const sendMessage = createAction<unknown>('socket/sendMessage');
const getMessage = createAction<OrdersFeedModel>('socket/getMessage');

export const socketActions = {
  startConnection,
  connectionSuccess,
  closeConnection,
  errorConnection,
  sendMessage,
  getMessage,
};
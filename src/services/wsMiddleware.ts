import {AppActions, AppDispatch, RootState} from "../index";
import {socketActions} from "./actions/socket";
import {MiddlewareAPI} from "redux";
import {OrdersFeedModel} from "../components/OrderFeed/types";

export const socketMiddleware = (wsUrl: string, typeAction: string, isAuth?: boolean) => {
  let socket: WebSocket | null = null;

  return (store: unknown) =>
    (next: any) =>
      (action: unknown) => {

        const { dispatch, getState } = store as MiddlewareAPI<AppDispatch, RootState>;
        const { type, payload } = action as AppActions;

        if (isAuth) {
          const accessToken = getState().auth.state?.accessToken.replace('Bearer ', '');

          if (type === socketActions.startConnection.type && !socket && accessToken) {
            socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
          }
        } else {
          if (type === socketActions.startConnection.type && !socket) {
            socket = new WebSocket(`${wsUrl}`);
          }
        }


        if (socket) {

          socket.onopen = () => {
            dispatch(socketActions.connectionSuccess());
          };

          socket.onerror = () => {
            dispatch(socketActions.errorConnection());
          };

          socket.onmessage = (event: MessageEvent<string>) => {
            const data: OrdersFeedModel = JSON.parse(event.data);
            dispatch({type: typeAction, payload: data});
          };

          socket.onclose = () => {
            dispatch(socketActions.closeConnection());
          };

          if (type === socketActions.sendMessage.type) {
            socket.send(JSON.stringify(payload));
          }
        }

        return next(action);
      };
};
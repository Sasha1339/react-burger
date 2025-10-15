import {logout, signIn, signUp, token} from "./auth";

export const authMiddlewareSetToken = (store: any) => (next: any) => (action: any) => {
  if (signIn.fulfilled.match(action) || signUp.fulfilled.match(action)) {
    const { refreshToken } = action.payload;
    if (refreshToken) {
      window.localStorage.setItem('refreshToken', refreshToken);
    }
  }

  return next(action);
};

export const authMiddlewareRemoveToken = (store: any) => (next: any) => (action: any) => {
  if (logout.fulfilled.match(action) || token.rejected.match(action)) {
    window.localStorage.removeItem('refreshToken');
  }

  return next(action);
};

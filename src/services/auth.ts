import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AuthResponse, UserModel} from "../shared/types";
import {authApi} from "../api/auth";

export type AuthState = {
  state: AuthResponse | null;
  user: UserModel | null;
  isAuthenticated: boolean;

  authSignInRequests: boolean;
  authSignInFailed: boolean;
  authSignUpRequests: boolean;
  authSignUpFailed: boolean;
  authLogoutRequests: boolean;
  authLogoutFailed: boolean;
  authTokenRequests: boolean;
  authTokenFailed: boolean;
  authUserRequests: boolean;
  authUserFailed: boolean;
}

const initialState: AuthState = {
  state: null,
  user: null,
  isAuthenticated: true,

  authSignInRequests: false,
  authSignInFailed: false,
  authSignUpRequests: false,
  authSignUpFailed: false,
  authLogoutRequests: false,
  authLogoutFailed: false,
  authTokenRequests: false,
  authTokenFailed: false,
  authUserRequests: false,
  authUserFailed: false
}

export const signIn = createAsyncThunk('auth/signIn', authApi.signIn);
export const signUp = createAsyncThunk('auth/signUp', authApi.signUp);
export const getUser = createAsyncThunk('auth/getUser', authApi.getUser);
export const updateUser = createAsyncThunk('auth/updateUser', authApi.updateUser);
export const token = createAsyncThunk('auth/token', authApi.token);
export const logout = createAsyncThunk('auth/logout', authApi.logout);

const authSlice = createSlice({
  name: "auth",
  initialState,
  selectors: {
    accessToken: (state) => state.state?.accessToken,
    user: (state) => state.user,
    authUserRequests: (state) => state.authUserRequests,
    authTokenRequests: (state) => state.authTokenRequests,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.authSignInRequests = true;
        state.authSignInFailed = false;
        state.authUserRequests = true;
        state.authUserFailed = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.authSignInRequests = false;
        state.authSignInFailed = false;
        state.authUserRequests = false;
        state.authUserFailed = false;
        state.state = action.payload;
        state.user = { ...action.payload.user, password: 'password' };
      })
      .addCase(signIn.rejected, (state, action) => {
        state.authSignInRequests = false;
        state.authSignInFailed = true;
        state.authUserRequests = false;
        state.authUserFailed = true;
        console.log(action.error.message);
      })
      .addCase(signUp.pending, (state) => {
        state.authSignUpRequests = true;
        state.authSignUpRequests = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.authSignUpRequests = false;
        state.authSignUpRequests = false;
        state.state = action.payload;
        state.user = { ...action.payload.user, password: 'password' };
      })
      .addCase(signUp.rejected, (state, action) => {
        state.authSignUpRequests = false;
        state.authSignUpRequests = true;
        console.log(action.error.message);
      })
      .addCase(getUser.pending, (state) => {
        state.authUserRequests = true;
        state.authUserFailed = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.authUserRequests = false;
        state.authUserFailed = false;
        state.user = { ...action.payload.user, password: 'password' };
      })
      .addCase(getUser.rejected, (state, action) => {
        state.authUserRequests = false;
        state.authUserFailed = true;
        console.log(action.error.message);
      })
      .addCase(updateUser.pending, (state) => {
        state.authUserRequests = true;
        state.authUserFailed = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.authUserRequests = false;
        state.authUserFailed = false;
        state.user = { ...action.payload.user, password: 'password' };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.authUserRequests = false;
        state.authUserFailed = true;
        console.log(action.error.message);
      })
      .addCase(logout.pending, (state) => {
        state.authLogoutRequests = true;
        state.authLogoutFailed = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.authLogoutRequests = false;
        state.authLogoutFailed = false;
        state.state = null;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.authLogoutRequests = false;
        state.authLogoutFailed = true;
        console.log(action.error.message);
      })
      .addCase(token.pending, (state) => {
        state.authTokenRequests = true;
        state.authTokenFailed = false;
      })
      .addCase(token.fulfilled, (state, action) => {
        state.authTokenRequests = false;
        state.authTokenFailed = false;
        state.state = { ...action.payload, user: { email: '', name: '' } };
      })
      .addCase(token.rejected, (state, action) => {
        state.authTokenRequests = false;
        state.authTokenFailed = true;
        console.log(action.error.message);
      })
  }
})

export const { reducer: authReducer, selectors: authSelectors, actions: authActions } = authSlice;


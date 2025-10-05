import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ProfileModel} from "../shared/types";
import {profileApi} from "../api/profile";

type ProfileState = {
  profile: ProfileModel | null;

  profileRequests: boolean;
  profileFailed: boolean;
}

const initialState: ProfileState = {
  profile: {
    name: 'Dfc',
    email: 'dfc@gmail.com',
    password: 'dfc@gmail.com'
  },

  profileRequests: false,
  profileFailed: false
}

export const createOrderRequest = createAsyncThunk('profile/createOrderRequest', profileApi.getProfile);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  selectors: {
    profile: (state) => state.profile,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderRequest.pending, (state) => {
        state.profileRequests = true;
        state.profileFailed = false;
      })
      .addCase(createOrderRequest.fulfilled, (state, action) => {
        state.profileRequests = false;
        state.profileFailed = false;
        state.profile = action.payload;
      })
      .addCase(createOrderRequest.rejected, (state, action) => {
        state.profileRequests = false;
        state.profileFailed = true;
        console.log(action.error.message);
      })
  }
})

export const { reducer: profileReducer, selectors: profileSelectors, actions: profileActions } = profileSlice;

import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus, NameSpace, TUser } from '@utils-types';
import {
  getUser,
  updateUser,
  loginUser,
  logoutUser,
  registerUser
} from '@actions';

type TUSerState = {
  userData: TUser;
  error: string | null;
  loading: boolean;
  authStatus: AuthStatus;
};

const initialState: TUSerState = {
  authStatus: AuthStatus.Unknown,
  userData: {
    email: '',
    name: ''
  },
  error: null,
  loading: false
};

export const userSlice = createSlice({
  name: NameSpace.USER,
  initialState,
  reducers: {},
  selectors: {
    selectUserData: (state) => state.userData,
    selectUserLoading: (state) => state.loading,
    selectUserError: (state) => state.error,
    selectAuthStatus: (state) => state.authStatus
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.authStatus = AuthStatus.NoAuth;
        if (action.error.message) state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authStatus = AuthStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.authStatus = AuthStatus.NoAuth;
        if (action.error.message) state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.authStatus = AuthStatus.Auth;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message) state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.authStatus = AuthStatus.NoAuth;
        state.userData = {
          email: '',
          name: ''
        };
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.authStatus = AuthStatus.NoAuth;
        if (action.error.message) state.error = action.error.message;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authStatus = AuthStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message) state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      });
  }
});

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TAuthState } from './type';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';

const initialState: TAuthState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: undefined
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    data: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      return (await registerUserApi(data)).user;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      return (await loginUserApi(data)).user;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (
    data: Partial<{ name: string; email: string; password: string }>,
    { rejectWithValue }
  ) => {
    try {
      return (await updateUserApi(data)).user;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      return (await getUserApi()).user;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        state.isAuth = false;
        state.error = undefined;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      });
  }
});

export const { clearError } = authSlice.actions;
export const { reducer: authReducer } = authSlice;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrdersData } from '@utils-types';
import { TFeedState } from './type';

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const fetchFeed = createAsyncThunk<
  TOrdersData,
  void,
  { rejectValue: string }
>('feed/fetchFeed', async (_, { rejectWithValue }) => {
  try {
    const { orders, total, totalToday } = await getFeedsApi();
    return { orders, total, totalToday };
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchFeed.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.isLoading = false;
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      )
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  }
});

export const { reducer: feedReducer } = feedSlice;

import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, TOrdersData } from '@utils-types';
import { getFeedsOrder } from '@actions';

type TFeedState = TOrdersData & {
  error: string | null;
  loading: boolean;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  loading: false
};

export const feedSlice = createSlice({
  name: NameSpace.FEED,
  initialState,
  reducers: {},
  selectors: {
    selectFeedOrders: (state) => state.orders,
    selectFeedError: (state) => state.error,
    selectFeedLoading: (state) => state.loading,
    selectFeedTotal: (state) => state.total,
    selectFeedTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedsOrder.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message) state.error = action.error.message;
      })
      .addCase(getFeedsOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.orders = action.payload.orders;
      });
  }
});

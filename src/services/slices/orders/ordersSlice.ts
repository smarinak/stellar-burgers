import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, TOrder } from '@utils-types';
import { getOrders } from '@actions';

type TOrderState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orders: [],
  loading: false,
  error: null
};

export const ordersSlice = createSlice({
  name: NameSpace.ORDERS,
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state) => state.orders,
    selectOrdersLoading: (state) => state.loading,
    selectOrdersError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message) {
          state.error = action.error.message;
        }
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      });
  }
});

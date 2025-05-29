import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, TOrder } from '@utils-types';
import { getOrderByNumber, postNewOrder } from '@actions';

type TOrderState = {
  newOrderData: TOrder | null;
  newOrderLoading: boolean;
  newOrderError: string | null;
  orderByNumber: TOrder | null;
  orderByNumberLoading: boolean;
  orderByNumberError: string | null;
};

const initialState: TOrderState = {
  newOrderData: null,
  newOrderLoading: false,
  newOrderError: null,
  orderByNumber: null,
  orderByNumberLoading: false,
  orderByNumberError: null
};

export const orderSlice = createSlice({
  name: NameSpace.ORDER,
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.newOrderData = null;
    }
  },
  selectors: {
    selectNewOrderData: (state) => state.newOrderData,
    selectNewOrderLoading: (state) => state.newOrderLoading,
    selectNewOrderError: (state) => state.newOrderError,
    selectOrderByNumber: (state) => state.orderByNumber,
    selectOrderByNumberLoading: (state) => state.orderByNumberLoading,
    selectOrderByNymberError: (state) => state.orderByNumberError
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.orderByNumberLoading = true;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.orderByNumberLoading = false;
        if (action.error.message) {
          state.orderByNumberError = action.error.message;
        }
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderByNumberLoading = false;
        state.orderByNumber = action.payload[0];
      })
      .addCase(postNewOrder.pending, (state) => {
        state.newOrderLoading = true;
      })
      .addCase(postNewOrder.rejected, (state, action) => {
        state.newOrderLoading = false;
        if (action.error.message) {
          state.newOrderError = action.error.message;
        }
      })
      .addCase(postNewOrder.fulfilled, (state, action) => {
        state.newOrderLoading = false;
        state.newOrderData = action.payload;
      });
  }
});

export const { clearOrder } = orderSlice.actions;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';
import { TOrderState } from './type';

const initialState: TOrderState = {
  orderRequest: false,
  orderFailed: false,
  orderData: null,
  error: undefined
};

export const fetchOrderByNumber = createAsyncThunk<TOrder, number>(
  'order/fetchByNumber',
  async (orderNumber, { rejectWithValue }) => {
    try {
      return (await getOrderByNumberApi(orderNumber)).orders[0];
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const placeOrder = createAsyncThunk<TOrder, string[]>(
  'order/placeOrder',
  async (ingredientIds, { rejectWithValue }) => {
    try {
      return (await orderBurgerApi(ingredientIds)).order;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder(state) {
      state.orderData = null;
      state.orderFailed = false;
      state.orderRequest = false;
      state.error = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.orderRequest = true;
        state.orderFailed = false;
        state.error = undefined;
      })
      .addCase(
        fetchOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.orderRequest = false;
          state.orderData = action.payload;
        }
      )
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderFailed = true;
        state.error = action.payload as string;
      })
      .addCase(placeOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderFailed = false;
        state.error = undefined;
      })
      .addCase(placeOrder.fulfilled, (state, action: PayloadAction<TOrder>) => {
        state.orderRequest = false;
        state.orderData = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderFailed = true;
        state.error = action.payload as string;
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export const { reducer: orderReducer } = orderSlice;

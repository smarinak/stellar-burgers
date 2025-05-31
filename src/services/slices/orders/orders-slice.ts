import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';
import { TOrdersState } from './type';

const initialState: TOrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

export const fetchOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('orders/fetch', async (_, { rejectWithValue }) => {
  try {
    return await getOrdersApi();
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.orders = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  }
});

export default ordersSlice.reducer;
export const { reducer: ordersReducer } = ordersSlice;

import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';

export const getOrders = createAsyncThunk<Array<TOrder>, undefined>(
  'orders/getOrders',
  async () => (await getOrdersApi()).orders
);

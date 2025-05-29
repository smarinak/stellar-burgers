import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';

export const getFeedsOrder = createAsyncThunk<TOrdersData, undefined>(
  'feed/getOrders',
  getFeedsApi
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';
import { orderSlice } from '@slices';

export const postNewOrder = createAsyncThunk<TOrder, string[]>(
  'order/postNewOrder',
  async (order) => orderBurgerApi(order).then((data) => data.order)
);

export const getOrderByNumber = createAsyncThunk<TOrder[], number>(
  'order/getOrderByNumber',
  async (orderNumber) =>
    getOrderByNumberApi(orderNumber).then((data) => data.orders)
);

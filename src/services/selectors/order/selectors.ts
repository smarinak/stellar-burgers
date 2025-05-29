import { orderSlice } from '@slices';

export const {
  selectNewOrderData,
  selectNewOrderLoading,
  selectNewOrderError,
  selectOrderByNumber,
  selectOrderByNumberLoading,
  selectOrderByNymberError
} = orderSlice.selectors;

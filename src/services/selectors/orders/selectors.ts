import { ordersSlice } from '@slices';

export const { selectOrders, selectOrdersError, selectOrdersLoading } =
  ordersSlice.selectors;

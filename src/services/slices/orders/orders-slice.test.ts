import { ordersReducer, fetchOrders } from './orders-slice';
import { TOrdersState } from './type';

describe('ordersSlice extraReducers', () => {
  let initialState: TOrdersState;

  beforeEach(() => {
    initialState = {
      orders: [],
      isLoading: false,
      error: null
    };
  });

  it('fetchOrders.pending → isLoading true, error cleared', () => {
    const next = ordersReducer(
      initialState,
      fetchOrders.pending('', undefined)
    );
    expect(next.isLoading).toBe(true);
    expect(next.error).toBeNull();
  });

  it('fetchOrders.fulfilled → populates orders and sets isLoading false', () => {
    const payload = [{ id: 1 }, { id: 2 }] as any;
    const next = ordersReducer(
      initialState,
      fetchOrders.fulfilled(payload, '', undefined)
    );
    expect(next.isLoading).toBe(false);
    expect(next.orders).toEqual(payload);
  });

  it('fetchOrders.rejected → sets error and isLoading false', () => {
    const err = 'server error';
    const next = ordersReducer(
      initialState,
      fetchOrders.rejected(new Error(err), '', undefined, err)
    );
    expect(next.isLoading).toBe(false);
    expect(next.error).toBe(err);
  });
});

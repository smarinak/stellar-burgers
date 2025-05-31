import {
  orderReducer,
  fetchOrderByNumber,
  placeOrder,
  clearOrder
} from './order-slice';
import { TOrderState } from './type';

describe('orderSlice extraReducers', () => {
  let initialState: TOrderState;

  beforeEach(() => {
    initialState = {
      orderRequest: false,
      orderFailed: false,
      orderData: null,
      error: undefined
    };
  });

  it('fetchOrderByNumber.pending → orderRequest true, orderFailed false, error undefined', () => {
    const next = orderReducer(
      initialState,
      fetchOrderByNumber.pending('', 123)
    );
    expect(next.orderRequest).toBe(true);
    expect(next.orderFailed).toBe(false);
    expect(next.error).toBeUndefined();
  });

  it('fetchOrderByNumber.fulfilled → sets orderData and orderRequest false', () => {
    const fakeOrder = { number: 123, ingredients: [], name: 'Test' } as any;
    const next = orderReducer(
      initialState,
      fetchOrderByNumber.fulfilled(fakeOrder, '', 123)
    );
    expect(next.orderRequest).toBe(false);
    expect(next.orderData).toEqual(fakeOrder);
  });

  it('fetchOrderByNumber.rejected → orderRequest false, orderFailed true, error set', () => {
    const err = 'not found';
    const next = orderReducer(
      initialState,
      fetchOrderByNumber.rejected(new Error(err), '', 123, err)
    );
    expect(next.orderRequest).toBe(false);
    expect(next.orderFailed).toBe(true);
    expect(next.error).toBe(err);
  });

  it('placeOrder.pending → orderRequest true, orderFailed false, error undefined', () => {
    const next = orderReducer(
      initialState,
      placeOrder.pending('', ['id1', 'id2'])
    );
    expect(next.orderRequest).toBe(true);
    expect(next.orderFailed).toBe(false);
    expect(next.error).toBeUndefined();
  });

  it('placeOrder.fulfilled → sets orderData and orderRequest false', () => {
    const fake = { number: 456, ingredients: [] } as any;
    const next = orderReducer(
      initialState,
      placeOrder.fulfilled(fake, '', ['id1', 'id2'])
    );
    expect(next.orderRequest).toBe(false);
    expect(next.orderData).toEqual(fake);
  });

  it('placeOrder.rejected → orderRequest false, orderFailed true, error set', () => {
    const err = 'bad request';
    const next = orderReducer(
      initialState,
      placeOrder.rejected(new Error(err), '', ['id'], err)
    );
    expect(next.orderRequest).toBe(false);
    expect(next.orderFailed).toBe(true);
    expect(next.error).toBe(err);
  });

  it('clearOrder → resets state to initial', () => {
    const state: TOrderState = {
      orderRequest: true,
      orderFailed: true,
      orderData: { number: 1 } as any,
      error: 'err'
    };
    const next = orderReducer(state, clearOrder());
    expect(next).toEqual(initialState);
  });
});

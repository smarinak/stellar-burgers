import { feedReducer, fetchFeed } from './feed-slice';
import { TFeedState } from './type';

describe('feedSlice extraReducers', () => {
  let initialState: TFeedState;

  beforeEach(() => {
    initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: false,
      error: null
    };
  });

  it('fetchFeed.pending → isLoading true, error cleared', () => {
    const next = feedReducer(initialState, fetchFeed.pending('', undefined));
    expect(next.isLoading).toBe(true);
    expect(next.error).toBeNull();
  });

  it('fetchFeed.fulfilled → populates orders, totals and sets isLoading false', () => {
    const payload = {
      orders: [{ id: 1 } as any, { id: 2 } as any],
      total: 42,
      totalToday: 5
    };
    const next = feedReducer(
      initialState,
      fetchFeed.fulfilled(payload, '', undefined)
    );
    expect(next.isLoading).toBe(false);
    expect(next.orders).toEqual(payload.orders);
    expect(next.total).toBe(42);
    expect(next.totalToday).toBe(5);
  });

  it('fetchFeed.rejected → sets error and isLoading false', () => {
    const errMsg = 'network error';
    const next = feedReducer(
      initialState,
      fetchFeed.rejected(new Error(errMsg), '', undefined, errMsg)
    );
    expect(next.isLoading).toBe(false);
    expect(next.error).toBe(errMsg);
  });
});

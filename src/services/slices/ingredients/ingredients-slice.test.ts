import { fetchIngredients, ingredientsReducer } from './ingredients-slice';
import { TIngredientsState } from './type';

describe('ingredientsSlice extraReducers', () => {
  let initialState: TIngredientsState;

  beforeEach(() => {
    initialState = { items: [], isLoading: false, error: null };
  });

  it('pending: should set isLoading = true', () => {
    const next = ingredientsReducer(
      initialState,
      fetchIngredients.pending('', undefined)
    );
    expect(next.isLoading).toBe(true);
    expect(next.error).toBeNull();
  });

  it('fulfilled: should fill items and set isLoading = false', () => {
    const payload = [{ _id: '1' }, { _id: '2' }] as any;
    const next = ingredientsReducer(
      initialState,
      fetchIngredients.fulfilled(payload, '', undefined)
    );
    expect(next.isLoading).toBe(false);
    expect(next.items).toEqual(payload);
  });

  it('rejected: should set error and isLoading = false', () => {
    const err = new Error('fail');
    const next = ingredientsReducer(
      initialState,
      fetchIngredients.rejected(err, '', undefined)
    );
    expect(next.isLoading).toBe(false);
    expect(next.error).toBe('fail');
  });
});

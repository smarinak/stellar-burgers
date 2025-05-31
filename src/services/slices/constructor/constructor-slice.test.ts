import {
  constructorReducer,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './constructor-slice';
import { TConstructorState } from './type';

describe('constructorSlice reducer', () => {
  let initialState: TConstructorState;

  beforeEach(() => {
    initialState = { bun: null, ingredients: [] };
  });

  it('addIngredient: should append new ingredient with id', () => {
    const fake = { _id: '123', name: 'X', price: 10 };
    const next = constructorReducer(initialState, addIngredient(fake as any));
    expect(next.ingredients).toHaveLength(1);
    expect(next.ingredients[0]).toMatchObject({ name: 'X', price: 10 });
    expect(typeof next.ingredients[0].id).toBe('string');
  });

  it('removeIngredient: should remove by id', () => {
    const state = {
      bun: null,
      ingredients: [{ id: 'a', _id: '1' } as any, { id: 'b', _id: '2' } as any]
    };
    const next = constructorReducer(state, removeIngredient('a'));
    expect(next.ingredients).toHaveLength(1);
    expect(next.ingredients[0].id).toBe('b');
  });

  it('moveIngredient: should reorder ingredients', () => {
    const state = {
      bun: null,
      ingredients: [
        { id: 'a', _id: '1' } as any,
        { id: 'b', _id: '2' } as any,
        { id: 'c', _id: '3' } as any
      ]
    };
    const next = constructorReducer(
      state,
      moveIngredient({ fromIndex: 0, toIndex: 2 })
    );
    expect(next.ingredients.map((i) => i.id)).toEqual(['b', 'c', 'a']);
  });

  it('clearConstructor: should reset to initial state', () => {
    const state = {
      bun: { _id: 'x' } as any,
      ingredients: [{ id: '1', _id: '1' } as any]
    };
    const next = constructorReducer(state, clearConstructor());
    expect(next).toEqual(initialState);
  });
});

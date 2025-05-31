import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { TConstructorState } from './type';

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },

    addIngredient: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        state.ingredients.push(action.payload);
      },
      prepare(ingredient: TIngredient) {
        return { payload: { ...ingredient, id: nanoid() } };
      }
    },

    moveIngredient(
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) {
      const { fromIndex, toIndex } = action.payload;
      const item = state.ingredients.splice(fromIndex, 1)[0];
      state.ingredients.splice(toIndex, 0, item);
    },

    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },

    clearConstructor() {
      return initialState;
    }
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = constructorSlice.actions;
export const { reducer: constructorReducer } = constructorSlice;

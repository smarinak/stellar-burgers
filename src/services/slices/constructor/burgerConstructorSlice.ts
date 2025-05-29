import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, TConstructorIngredient, TIngredient } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  indgredients: Array<TConstructorIngredient>;
};

const initialState: TBurgerConstructorState = {
  indgredients: [],
  bun: null
};

export const burgerConstructorSlice = createSlice({
  name: NameSpace.BURGER_CONSTRUCTOR,
  initialState,
  reducers: {
    addToConstructor: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.indgredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeFromConstructor: (state, action: PayloadAction<string>) => {
      if (action.payload === state.bun?.id) {
        state.bun = null;
      } else {
        state.indgredients = state.indgredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
      }
    },
    reorderConstruct: (
      state,
      action: PayloadAction<{ to: number; from: number }>
    ) => {
      const { from, to } = action.payload;
      const ingredients = [...state.indgredients];
      const [removedElement] = ingredients.splice(from, 1);
      ingredients.splice(to, 0, removedElement);
      state.indgredients = ingredients;
    },
    cleanConstructor: (state) => {
      state.bun = null;
      state.indgredients = [];
    }
  },
  selectors: {
    selectConstructorBun: (state) => state.bun,
    selectConstructorIngredients: (state) => state.indgredients
  }
});

export const {
  addToConstructor,
  removeFromConstructor,
  reorderConstruct,
  cleanConstructor
} = burgerConstructorSlice.actions;

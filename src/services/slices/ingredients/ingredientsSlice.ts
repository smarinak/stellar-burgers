import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, TIngredient } from '@utils-types';
import { getIngredients } from '@actions';

type TIngredientState = {
  ingredients: Array<TIngredient>;
  error: string | null;
  loading: boolean;
};

const initialState: TIngredientState = {
  ingredients: [],
  error: null,
  loading: false
};

export const ingredientsSlice = createSlice({
  name: NameSpace.INGREDIENTS,
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIngredientsError: (state) => state.error,
    selectIngredientsLoading: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message) state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

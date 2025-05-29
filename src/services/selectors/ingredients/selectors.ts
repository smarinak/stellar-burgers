import { ingredientsSlice } from '@slices';

export const {
  selectIngredients,
  selectIngredientsError,
  selectIngredientsLoading
} = ingredientsSlice.selectors;

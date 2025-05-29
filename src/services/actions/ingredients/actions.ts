import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk<Array<TIngredient>, undefined>(
  'ingredients/getAll',
  async () => (await getIngredientsApi()).data
);

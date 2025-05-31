import { TIngredient } from '@utils-types';

export type TIngredientsState = {
  items: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

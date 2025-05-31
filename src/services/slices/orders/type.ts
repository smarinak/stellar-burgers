import { TOrder } from '@utils-types';

export type TOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

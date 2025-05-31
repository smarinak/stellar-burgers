import { TOrder } from '@utils-types';

export type TOrderState = {
  orderRequest: boolean;
  orderFailed: boolean;
  orderData: TOrder | null;
  error?: string;
};

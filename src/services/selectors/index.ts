import { NameSpace } from '@utils-types';
import { RootState } from '../store';

export const selectGetOrderData = (number: string) => (state: RootState) => {
  if (state[NameSpace.ORDERS].orders.length) {
    const data = state[NameSpace.ORDERS].orders.find(
      (item) => item.number === +number
    );
    if (data) return data;
  }

  if (state[NameSpace.FEED].orders.length) {
    const data = state[NameSpace.FEED].orders.find(
      (item) => item.number === +number
    );
    if (data) return data;
  }

  if (state[NameSpace.ORDER].orderByNumber?.number === Number(number)) {
    return state[NameSpace.ORDER].orderByNumber;
  }

  return null;
};

export * from './constructor';
export * from './feed';
export * from './ingredients';
export * from './order';
export * from './orders';
export * from './user';

import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '@utils-types';
import {
  burgerConstructorSlice,
  ingredientsSlice,
  userSlice,
  feedSlice,
  orderSlice,
  ordersSlice
} from '@slices';

export const rootReducer = combineReducers({
  [NameSpace.INGREDIENTS]: ingredientsSlice.reducer,
  [NameSpace.USER]: userSlice.reducer,
  [NameSpace.FEED]: feedSlice.reducer,
  [NameSpace.BURGER_CONSTRUCTOR]: burgerConstructorSlice.reducer,
  [NameSpace.ORDER]: orderSlice.reducer,
  [NameSpace.ORDERS]: ordersSlice.reducer
});

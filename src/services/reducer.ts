import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredients';
import { constructorReducer } from './slices/constructor';
import { orderReducer } from './slices/order';
import { feedReducer } from './slices/feed';
import { authReducer } from './slices/auth';
import { ordersReducer } from './slices/orders';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  feed: feedReducer,
  auth: authReducer,
  orders: ordersReducer
});

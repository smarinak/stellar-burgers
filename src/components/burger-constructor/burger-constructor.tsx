import { FC, useMemo } from 'react';
import { AppRoute, AuthStatus, TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectAuthStatus,
  selectConstructorBun,
  selectConstructorIngredients,
  selectNewOrderData,
  selectNewOrderLoading
} from '@selectors';
import { postNewOrder } from '@actions';
import { cleanConstructor, clearOrder } from '@slices';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector(selectAuthStatus);
  const constructorItems = {
    bun: useSelector(selectConstructorBun),
    ingredients: useSelector(selectConstructorIngredients)
  };

  const orderRequest = useSelector(selectNewOrderLoading);

  const orderModalData = useSelector(selectNewOrderData);

  const onOrderClick = () => {
    if (authStatus !== AuthStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    const newOrderIngerdients = [
      constructorItems.bun._id,
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    ];
    dispatch(postNewOrder(newOrderIngerdients));
  };
  const closeOrderModal = () => {
    dispatch(cleanConstructor());
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

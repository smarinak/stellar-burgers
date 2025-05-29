import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from '../../services/store';
import { selectIngredients } from '@selectors';
import { useParams } from 'react-router-dom';
import { getIngredients } from '@actions';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const id = useParams().id || '';
  const ingredientData = useSelector(selectIngredients).find(
    (ingredient) => ingredient._id === id
  );

  useEffect(() => {
    if (!ingredientData) dispatch(getIngredients());
  }, [ingredientData, id, dispatch]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};

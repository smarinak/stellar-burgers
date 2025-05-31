import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices/feed';
import { fetchIngredients } from '../../services/slices/ingredients';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const getFeeds = () => {
    dispatch(fetchFeed());
  };

  if (isLoading) return <Preloader />;
  if (error) return <div>Произошла ошибка загрузки данных: {error}</div>;

  return <FeedUI orders={orders} handleGetFeeds={getFeeds} />;
};

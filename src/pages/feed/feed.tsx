import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectFeedLoading, selectFeedOrders } from '@selectors';
import { getFeedsOrder } from '@actions';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const isOrdersLoading = useSelector(selectFeedLoading);

  useEffect(() => {
    dispatch(getFeedsOrder());
  }, [dispatch]);

  if (isOrdersLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeedsOrder());
      }}
    />
  );
};

import { feedSlice } from '@slices';

export const {
  selectFeedOrders,
  selectFeedError,
  selectFeedLoading,
  selectFeedTotal,
  selectFeedTotalToday
} = feedSlice.selectors;

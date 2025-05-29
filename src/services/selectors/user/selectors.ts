import { userSlice } from '@slices';

export const {
  selectUserData,
  selectUserLoading,
  selectUserError,
  selectAuthStatus
} = userSlice.selectors;

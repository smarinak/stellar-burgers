import { TUser } from '@utils-types';

export type TAuthState = {
  user: TUser | null;
  isAuth: boolean;
  isLoading: boolean;
  error?: string;
};

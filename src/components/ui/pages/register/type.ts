import { Dispatch, SetStateAction } from 'react';
import { PageUIProps } from '../common-type';

export type RegisterUIProps = PageUIProps & {
  isLoading: boolean;
  password: string;
  userName: string;
  setPassword: Dispatch<SetStateAction<string>>;
  setUserName: Dispatch<SetStateAction<string>>;
};

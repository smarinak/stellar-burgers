import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const { user, isAuth } = useSelector((state) => state.auth);
  const userName = isAuth && user ? user.name : '';

  return <AppHeaderUI userName={userName} />;
};

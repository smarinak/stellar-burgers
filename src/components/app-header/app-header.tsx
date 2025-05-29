import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUserData } from '@selectors';
import { useLocation } from 'react-router-dom';

export const AppHeader: FC = () => {
  const location = useLocation();
  const userName = useSelector(selectUserData).name;
  return <AppHeaderUI userName={userName} locationPath={location.pathname} />;
};

import { selectAuthStatus } from '@selectors';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { AppRoute, AuthStatus } from '@utils-types';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  const authStatus = useSelector(selectAuthStatus);
  const location = useLocation();

  if (authStatus === AuthStatus.Unknown) {
    return <Preloader />;
  }

  if (onlyUnAuth && authStatus === AuthStatus.Auth) {
    const from = location.state?.from || { pathname: AppRoute.Constructor };
    return <Navigate replace to={from} />;
  }

  if (!onlyUnAuth && authStatus === AuthStatus.NoAuth) {
    return <Navigate replace to={AppRoute.Login} />;
  }

  return children;
};

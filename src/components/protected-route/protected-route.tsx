import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { ProtectedRouteProps } from './type';
import { useSelector } from '../../services/store';

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  forNotAuthUser
}) => {
  const { isAuth, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (isLoading) return <Preloader />;

  if (forNotAuthUser && isAuth) return <Navigate to='/' replace />;

  if (!forNotAuthUser && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <Outlet />;
};

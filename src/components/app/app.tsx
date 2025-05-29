import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404,
  ForgotPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  Modal,
  ProtectedRoute,
  OrderInfo,
  IngredientDetails
} from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { AppRoute, DetailTitles } from '@utils-types';
import { useEffect } from 'react';
import { getIngredients, getUser } from '@actions';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.background;

  const onCloseModal = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path={AppRoute.Constructor} element={<ConstructorPage />} />
        <Route path={AppRoute.Feed} element={<Feed />} />
        <Route
          path={AppRoute.IngredientById}
          element={
            <div className={styles.detailPageWrap}>
              <p className={`text text_type_main-large ${styles.detailHeader}`}>
                {DetailTitles.Ingedients}
              </p>
              <IngredientDetails />
            </div>
          }
        />
        <Route
          path={AppRoute.ProfileOrderByNumber}
          element={
            <ProtectedRoute>
              <div className={styles.detailPageWrap}>
                <p
                  className={`text text_type_main-large ${styles.detailHeader}`}
                >
                  {DetailTitles.Order}
                </p>
                <OrderInfo />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoute.FeedByNumber}
          element={
            <div className={styles.detailPageWrap}>
              <p className={`text text_type_main-large ${styles.detailHeader}`}>
                {DetailTitles.Order}
              </p>
              <OrderInfo />
            </div>
          }
        />
        <Route
          path={AppRoute.Login}
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoute.Register}
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoute.ResetPassword}
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoute.ForgotPassword}
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoute.Profile}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoute.ProfileOrders}
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path={AppRoute.NotFound} element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path={AppRoute.FeedByNumber}
            element={
              <Modal title={DetailTitles.Order} onClose={onCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path={AppRoute.IngredientById}
            element={
              <Modal title={DetailTitles.Ingedients} onClose={onCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={AppRoute.ProfileOrderByNumber}
            element={
              <ProtectedRoute>
                <Modal title={DetailTitles.Order} onClose={onCloseModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

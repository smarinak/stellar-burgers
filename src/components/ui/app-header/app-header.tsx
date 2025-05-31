import React, { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isConstructorPage = location.pathname === '/';
  const isFeedPage = location.pathname.startsWith('/feed');

  const profilePagePrefixes = [
    '/profile',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password'
  ];
  const isProfilePage = profilePagePrefixes.some((p) =>
    location.pathname.startsWith(p)
  );

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <div
            onClick={() => navigate('/')}
            className={`${styles.link} ${isConstructorPage ? styles.link_active : ''}`}
          >
            <BurgerIcon type={isConstructorPage ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </div>

          <div
            onClick={() => navigate('/feed')}
            className={`${styles.link} ${isFeedPage ? styles.link_active : ''}`}
          >
            <ListIcon type={isFeedPage ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </div>
        </div>

        <div onClick={() => navigate('/')} className={styles.logo}>
          <Logo className='' />
        </div>

        <div
          onClick={() => navigate('profile')}
          className={`${styles.link_position_last} ${isProfilePage ? styles.link_active : ''}`}
        >
          <ProfileIcon type={isProfilePage ? 'primary' : 'secondary'} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </div>
      </nav>
    </header>
  );
};

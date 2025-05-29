import React, { FC } from 'react';
import styles from './app-header.module.css';
import { Link } from 'react-router-dom';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { AppRoute } from '@utils-types';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({
  userName,
  locationPath
}) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <Link
          to={AppRoute.Constructor}
          className={`${styles.link} ${locationPath! === AppRoute.Constructor ? styles.link_active : ''}`}
        >
          <BurgerIcon type={'primary'} />
          <p className={`text text_type_main-default ml-2 mr-10`}>
            Конструктор
          </p>
        </Link>
        <Link
          to={AppRoute.Feed}
          className={`${styles.link} ${locationPath === AppRoute.Feed ? styles.link_active : ''}`}
        >
          <ListIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>Лента заказов</p>
        </Link>
      </div>
      <div className={styles.logo}>
        <Link to={AppRoute.Constructor}>
          <Logo className='' />
        </Link>
      </div>
      <div className={styles.link_position_last}>
        <Link
          to={AppRoute.Profile}
          className={`${styles.link} ${locationPath === AppRoute.Profile ? styles.link_active : ''}`}
        >
          <ProfileIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </Link>
      </div>
    </nav>
  </header>
);

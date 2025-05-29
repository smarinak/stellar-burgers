import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { selectAuthStatus } from '@selectors';
import { loginUser } from '@actions';
import { AppRoute, AuthStatus } from '@utils-types';
import { Navigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';

type LoginForm = {
  email: string;
  password: string;
};

export const Login: FC = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector(selectAuthStatus);
  const { values, handleChange } = useForm<LoginForm>({
    email: '',
    password: ''
  });
  const { email, password } = values;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (authStatus === AuthStatus.Auth) {
    return <Navigate to={AppRoute.Constructor} />;
  }

  return (
    <LoginUI
      errorText=''
      handleChange={handleChange}
      email={email}
      password={password}
      handleSubmit={handleSubmit}
    />
  );
};

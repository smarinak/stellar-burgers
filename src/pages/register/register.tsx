import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { registerUser } from '@actions';
import useForm from '../../hooks/useForm';

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

export const Register: FC = () => {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm<RegisterForm>({
    name: '',
    email: '',
    password: ''
  });
  const { name, email, password } = values;
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      name={name}
      password={password}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

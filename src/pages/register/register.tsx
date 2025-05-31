import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser, clearError } from '../../services/slices/auth';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, isLoading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isAuth) return <Navigate to='/' replace />;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(clearError());

    const action = await dispatch(registerUser({ name, email, password }));
    if (registerUser.fulfilled.match(action)) navigate('/', { replace: true });
  };

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setName}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

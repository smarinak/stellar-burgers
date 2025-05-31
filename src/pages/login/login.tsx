import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser, clearError } from '../../services/slices/auth';

export const Login: FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isAuth, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(clearError());

    const action = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(action)) navigate('/', { replace: true });
  };

  if (isAuth) return <Navigate to='/' replace />;

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  TLoginData,
  registerUserApi,
  TRegisterData,
  logoutApi,
  getUserApi,
  updateUserApi
} from '@api';
import { TUser, TOrdersData, TOrder } from '@utils-types';
import { deleteCookie, setCookie } from '../../../utils/cookie';

export const loginUser = createAsyncThunk<TUser, TLoginData>(
  'user/loginUser',
  async (loginData) =>
    loginUserApi(loginData).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    })
);

export const registerUser = createAsyncThunk<TUser, TRegisterData>(
  'user/registerUser',
  async (registerData) =>
    registerUserApi(registerData).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    })
);

export const logoutUser = createAsyncThunk<void, undefined>(
  'user/logoutUser',
  async () => {
    logoutApi();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
);

export const getUser = createAsyncThunk<TUser, undefined>(
  'user/getUser',
  async () => getUserApi().then((data) => data.user)
);

export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/updateUserData',
  async (registerData) => updateUserApi(registerData).then((data) => data.user)
);

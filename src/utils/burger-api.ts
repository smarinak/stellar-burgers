import { setCookie, getCookie, deleteCookie } from './cookie';
import { TIngredient, TOrder, TOrdersData, TUser } from './types';

const URL = process.env.BURGER_API_URL;

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type TServerResponse<T> = {
  success: boolean;
} & T;

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

type TLoginData = {
  email: string;
  password: string;
};

export const refreshToken = async (): Promise<TRefreshResponse> => {
  const res = await fetch(`${URL}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
  });
  const data = await checkResponse<TRefreshResponse>(res);
  if (!data.success) return Promise.reject(data);

  setCookie('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  return data;
};

export const fetchWithRefresh = async <T>(
  url: RequestInfo,
  options: RequestInit
): Promise<T> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err: any) {
    if (err?.message === 'jwt expired') {
      const refreshData = await refreshToken();
      setCookie('accessToken', refreshData.accessToken);
      const retry = await fetch(url, {
        ...options,
        headers: {
          ...(options.headers as Record<string, string>),
          authorization: refreshData.accessToken
        }
      });
      return await checkResponse<T>(retry);
    }
    return Promise.reject(err);
  }
};

export const getIngredientsApi = async (): Promise<TIngredient[]> => {
  const res = await fetch(`${URL}/ingredients`);
  const data =
    await checkResponse<TServerResponse<{ data: TIngredient[] }>>(res);
  if (!data.success) return Promise.reject(data);

  return data.data;
};

export const getFeedsApi = async (): Promise<{
  orders: TOrder[];
  total: number;
  totalToday: number;
}> => {
  const res = await fetch(`${URL}/orders/all`);
  const data = await checkResponse<TServerResponse<TOrdersData>>(res);
  if (!data.success) return Promise.reject(data);

  return {
    orders: data.orders,
    total: data.total,
    totalToday: data.totalToday
  };
};

export const getOrdersApi = async (): Promise<TOrder[]> => {
  const data = await fetchWithRefresh<TServerResponse<TOrdersData>>(
    `${URL}/orders`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('accessToken') || ''
      }
    }
  );
  if (!data.success) return Promise.reject(data);

  return data.orders;
};

export const orderBurgerApi = async (
  ingredients: string[]
): Promise<{ order: TOrder; name: string }> => {
  const data = await fetchWithRefresh<
    TServerResponse<{
      order: TOrder;
      name: string;
    }>
  >(`${URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken') || ''
    },
    body: JSON.stringify({ ingredients })
  });
  if (!data.success) return Promise.reject(data);

  return data;
};

export const getOrderByNumberApi = async (
  orderNumber: number
): Promise<{ orders: TOrder[] }> => {
  const res = await fetch(`${URL}/orders/${orderNumber}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  return await checkResponse<TServerResponse<{ orders: TOrder[] }>>(res);
};

export const registerUserApi = async (
  data: TRegisterData
): Promise<TServerResponse<{ user: TUser }>> => {
  const res = await fetch(`${URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data)
  });
  const result = await checkResponse<TAuthResponse>(res);
  if (!result.success) return Promise.reject(result);

  setCookie('accessToken', result.accessToken);
  localStorage.setItem('refreshToken', result.refreshToken);
  return result;
};

export type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

export const loginUserApi = async (
  data: TLoginData
): Promise<TAuthResponse> => {
  const res = await fetch(`${URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data)
  });
  const result = await checkResponse<TAuthResponse>(res);
  if (!result.success) return Promise.reject(result);

  setCookie('accessToken', result.accessToken);
  localStorage.setItem('refreshToken', result.refreshToken);
  return result;
};

export const forgotPasswordApi = async (data: {
  email: string;
}): Promise<TServerResponse<{}>> => {
  const res = await fetch(`${URL}/password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data)
  });
  const result = await checkResponse<TServerResponse<{}>>(res);
  if (!result.success) return Promise.reject(result);

  return result;
};

export const resetPasswordApi = async (data: {
  password: string;
  token: string;
}): Promise<TServerResponse<{}>> => {
  const res = await fetch(`${URL}/password-reset/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data)
  });
  const result = await checkResponse<TServerResponse<{}>>(res);
  if (!result.success) return Promise.reject(result);
  return result;
};

export const getUserApi = async (): Promise<
  TServerResponse<{ user: TUser }>
> => {
  const data = await fetchWithRefresh<TServerResponse<{ user: TUser }>>(
    `${URL}/auth/user`,
    { headers: { authorization: getCookie('accessToken') || '' } }
  );
  if (!data.success) return Promise.reject(data);
  return data;
};

export const updateUserApi = async (
  user: Partial<TRegisterData>
): Promise<TServerResponse<{ user: TUser }>> => {
  const data = await fetchWithRefresh<TServerResponse<{ user: TUser }>>(
    `${URL}/auth/user`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('accessToken') || ''
      },
      body: JSON.stringify(user)
    }
  );
  if (!data.success) return Promise.reject(data);

  return data;
};

export const logoutApi = async (): Promise<TServerResponse<{}>> => {
  const refreshToken = localStorage.getItem('refreshToken');
  const res = await fetch(`${URL}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ token: refreshToken })
  });
  const data = await checkResponse<TServerResponse<{}>>(res);
  if (!data.success) return Promise.reject(data);

  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
  return data;
};

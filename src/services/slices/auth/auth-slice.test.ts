import {
  authReducer,
  registerUser,
  loginUser,
  fetchUser,
  updateUser,
  logoutUser,
  clearError
} from './auth-slice';
import { TAuthState } from './type';

describe('authSlice extraReducers', () => {
  let initialState: TAuthState;

  beforeEach(() => {
    initialState = {
      user: null,
      isAuth: false,
      isLoading: false,
      error: undefined
    };
  });

  it('registerUser.pending → isLoading true, error cleared', () => {
    const next = authReducer(
      initialState,
      registerUser.pending('', { name: 'A', email: 'a@a', password: 'p' })
    );
    expect(next.isLoading).toBe(true);
    expect(next.error).toBeUndefined();
  });

  it('registerUser.fulfilled → sets user, isAuth true, isLoading false', () => {
    const fakeUser = { name: 'A', email: 'a@a' };
    const next = authReducer(
      initialState,
      registerUser.fulfilled(fakeUser as any, '', {
        name: 'A',
        email: 'a@a',
        password: 'p'
      })
    );
    expect(next.user).toEqual(fakeUser);
    expect(next.isAuth).toBe(true);
    expect(next.isLoading).toBe(false);
  });

  it('registerUser.rejected → isLoading false, error set', () => {
    const err = 'oops';
    const next = authReducer(
      initialState,
      registerUser.rejected(
        new Error(err),
        '',
        { name: '', email: '', password: '' },
        err
      )
    );
    expect(next.isLoading).toBe(false);
    expect(next.error).toBe(err);
  });

  it('loginUser.fulfilled → sets user and isAuth', () => {
    const fakeUser = { name: 'B', email: 'b@b' };
    const next = authReducer(
      { ...initialState, isLoading: true },
      loginUser.fulfilled(fakeUser as any, '', { email: 'b@b', password: 'p' })
    );
    expect(next.user).toEqual(fakeUser);
    expect(next.isAuth).toBe(true);
    expect(next.isLoading).toBe(false);
  });

  it('logoutUser.fulfilled → clears user and isAuth', () => {
    const state: TAuthState = {
      user: { name: 'X', email: 'x@x' },
      isAuth: true,
      isLoading: false,
      error: undefined
    };
    const next = authReducer(state, logoutUser.fulfilled(undefined, ''));
    expect(next.user).toBeNull();
    expect(next.isAuth).toBe(false);
    expect(next.isLoading).toBe(false);
  });

  it('fetchUser.fulfilled → sets user and isAuth', () => {
    const fake = { name: 'C', email: 'c@c' };
    const next = authReducer(
      initialState,
      fetchUser.fulfilled(fake as any, '')
    );
    expect(next.user).toEqual(fake);
    expect(next.isAuth).toBe(true);
    expect(next.isLoading).toBe(false);
  });

  it('updateUser.fulfilled → updates user data', () => {
    const state: TAuthState = {
      user: { name: 'Old', email: 'old@o' },
      isAuth: true,
      isLoading: true,
      error: undefined
    };
    const updated = { name: 'New', email: 'new@n' };
    const next = authReducer(
      state,
      updateUser.fulfilled(updated as any, '', updated)
    );
    expect(next.user).toEqual(updated);
    expect(next.isLoading).toBe(false);
  });

  it('clearError → resets error to undefined', () => {
    const state: TAuthState = {
      ...initialState,
      error: 'some error'
    };
    const next = authReducer(state, clearError());
    expect(next.error).toBeUndefined();
  });
});

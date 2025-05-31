import { rootReducer } from './reducer';

describe('rootReducer initialization', () => {
  it('should return initial state with all slices', () => {
    const state = rootReducer(undefined, { type: '' });
    expect(typeof state).toBe('object');
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('orders');
  });
});

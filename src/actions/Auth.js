export const LOGIN = 'LOGIN';
export const VERIFY_DEVICE = 'VERIFY_DEVICE';
export const REGISTER = 'REGISTER';
export const VERIFY_USER = 'VERIFY_USER';
export const SET_AUTH_STATE = 'SET_AUTH_STATE';
export const LOGOUT = 'LOGOUT';
export const GET_USER = 'GET_USER';

export const login = payload => ({
  type: LOGIN,
  payload,
});

export const verifyDevice = payload => ({
  type: VERIFY_DEVICE,
  payload,
});

export const register = payload => ({
  type: REGISTER,
  payload,
});

export const verifyUser = payload => ({
  type: VERIFY_USER,
  payload,
});

export const setAuthState = payload => ({
  type: SET_AUTH_STATE,
  payload,
});

export const logout = () => ({
  type: LOGOUT,
});

export const getUser = () => ({
  type: GET_USER,
});

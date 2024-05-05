import { AUTH_LOGIN, AUTH_LOGOUT,LOGIN_SUCCESS,LOGOUT_SUCCESS, AUTH_REGISTER, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../../constants/constants.js';

export const login = (user) => ({
  type: AUTH_LOGIN,
  payload: user,
});



export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const logout = () => ({
  type: AUTH_LOGOUT,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});




export const register = (user) => ({
  type: AUTH_REGISTER,
  payload: user,
});



export const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});

export const registerFailure = () => ({
  type: REGISTER_FAILURE,
});

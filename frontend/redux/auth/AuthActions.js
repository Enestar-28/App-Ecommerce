import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_REGISTER,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS_NAVIGATE,
  AUTH_FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAILURE,
  AUTH_CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
} from "../../constants/constants.js";

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


export const forgetRequest = (user) => ({
  type: AUTH_FORGET_PASSWORD,
  payload: user,
});
export const forgetSuccess = () => ({
  type: FORGET_PASSWORD_SUCCESS,
});




export const forgetFailure = (error) => ({
  type: FORGET_PASSWORD_FAILURE,
  payload: error,
});


export const changePasswordRequest = (user) => ({
  type: AUTH_CHANGE_PASSWORD,
  payload: user,
});

export const changePasswordSuccess = () => ({
  type: CHANGE_PASSWORD_SUCCESS,
});

export const changePasswordFailure = (error) => ({
  type: CHANGE_PASSWORD_FAILURE,
  payload: error,
});


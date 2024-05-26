import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REGISTER,
  AUTH_FORGET_PASSWORD,
  AUTH_CHANGE_PASSWORD,
} from "../../constants/constants.js";


 const initialState = {
  user: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case AUTH_REGISTER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case AUTH_FORGET_PASSWORD:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case AUTH_CHANGE_PASSWORD:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};


export default authReducer;
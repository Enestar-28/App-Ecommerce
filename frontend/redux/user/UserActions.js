import * as types from '../../constants/constants'; // Import các loại action từ file constants của bạn

export const fetchUserRequest = (userId) => ({
  type: types.FETCH_USER_REQUEST,
    payload: userId,
  });
  
export const fetchUserSuccess = (user) => ({
  type: types.FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error) => ({
  type: types.FETCH_USER_FAILURE,
  payload: error,
});

export const fetchUserAddAddressRequest = () => ({
  type: types.FETCH_USER_REQUEST_ADD_ADDRESS,
});

export const fetchUserAddAddressSuccess = (message) => ({
  type: types.FETCH_USER_ADD_ADDRESS_SUCCESS,
  payload: message,
});

export const fetchUserAddAddressFailure = (error) => ({
  type: types.FETCH_USER_ADD_ADDRESS_FAILURE,
  payload: error,
});
export const fetchUserDeleteAddressRequest = () => ({
  type: types.FETCH_USER_REQUEST_DELETE_ADDRESS,
  payload: userId,addresses
});

export const fetchUserDeleteAddressSuccess = (message) => ({
  type: types.FETCH_USER_DELETE_ADDRESS_SUCCESS,
  payload: message,
});

export const fetchUserDeleteAddressFailure = (error) => ({
  type: types.FETCH_USER_DELETE_ADDRESS_FAILURE,
  payload: error,
});

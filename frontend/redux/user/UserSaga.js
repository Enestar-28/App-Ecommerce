// Saga
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { 
    FETCH_USER_REQUEST,
    FETCH_USER_REQUEST_ADD_ADDRESS,
    FETCH_USER_REQUEST_DELETE_ADDRESS,
} from '../../constants/constants';

import { 
    fetchUserSuccess, 
    fetchUserFailure,
    fetchUserAddAddressSuccess,
    fetchUserAddAddressFailure,
    fetchUserDeleteAddressSuccess,
    fetchUserDeleteAddressFailure,
} from './UserActions';

import { API_BASE_URL } from '@env';

function* fetchUserSaga(action) {
    try {
        const url = `${API_BASE_URL}/me/${action.payload}`;
        const response = yield call(axios.get, url);
        yield put(fetchUserSuccess(response.data.result));
    } catch (error) {
        yield put(fetchUserFailure(error.message));
    }
}

function* addUserAddressSaga(action) {
    console.log("addUserAddressSaga", action.payload);
    const { userId, addresses } = action.payload;
    try {
        const url = `${API_BASE_URL}/address`;
        const response = yield call(axios.post, url, { userId, addresses });
        yield put(fetchUserAddAddressSuccess(response.data.message));
    } catch (error) {
        yield put(fetchUserAddAddressFailure("Failed to add address"));
    }
}

function* deleteUserAddressSaga(action) {
    const { userId, addressId } = action.payload;
    console.log("userId", userId);

    try {
        const url = `${API_BASE_URL}/address`;
        const response = yield call(axios.delete, url, { userId, addressId });
        console.log("response", response);
        yield put(fetchUserDeleteAddressSuccess(response.data.message));
    } catch (error) {
        yield put(fetchUserDeleteAddressFailure("Failed to delete address"));
    }
}

export function* watchFetchUser() {
    yield takeEvery(FETCH_USER_REQUEST, fetchUserSaga);
    yield takeEvery(FETCH_USER_REQUEST_ADD_ADDRESS, addUserAddressSaga);
    yield takeEvery(FETCH_USER_REQUEST_DELETE_ADDRESS, deleteUserAddressSaga);
}

import { Alert } from "react-native";
import { takeLatest, call, put } from 'redux-saga/effects';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginSuccess, logoutSuccess, registerSuccess, registerFailure } from './AuthActions';
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER } from '../../constants/constants.js';
import axios from 'axios';
import { API_BASE_URL } from '@env';





function* loginSaga(action) {
    const { user, navigation } = action.payload;
    
    try {

        const url = `${API_BASE_URL}/login`;
        const response = yield call(axios.post, url, user);
        const token = response.data.result.accessToken;
        const userId = response.data.result.user._id;
        yield call(AsyncStorage.setItem, "authToken", token);
        yield call(AsyncStorage.setItem, "UserId", userId);
        
        yield put(loginSuccess({ token, userId }));

        navigation.navigate("Main");
        // Sau khi đăng nhập thành công, chuyển hướng đến màn hình chính
    } catch (error) {
        console.log('Error logging in:', error);
        
        // Xử lý lỗi khi đăng nhập không thành công
        Alert.alert("Lỗi đăng nhập", "Email hoặc mật khẩu không đúng");
    }
}

function* registerSaga(action) {
    const { user } = action.payload;
    try {
        // Gọi API đăng ký
        console.log("user", user);
        const url = `${API_BASE_URL}/register`;
        const response = yield call(axios.post, url, user);
        // Hiển thị thông báo đăng ký thành công
        Alert.alert(
            'Đăng kí thành công',
            'Bạn đã đăng kí thành công, hãy đăng nhập để tiếp tục sử dụng dịch vụ'
        );
        // Dispatch action đăng ký thành công

        yield put(registerSuccess());

    } catch (error) {
        // Hiển thị thông báo lỗi đăng ký
        Alert.alert('Đăng kí lỗi', 'Lỗi xảy ra trong quá trình đăng kí tài khoản')
        // Dispatch action đăng ký thất bại
        yield put(registerFailure());

        console.log('registration failed', error);
    }
}

function* logoutSaga() {
    try {
        console.log("auth token", AsyncStorage.getItem("authToken"))
        yield call(AsyncStorage.removeItem, 'authToken');
        yield call(AsyncStorage.removeItem, 'UserId');
        yield put(logoutSuccess());
    } catch (error) {
        Alert.alert('Lỗi', 'Không thể đăng xuất tài khoản')
        console.log("Error clearing auth token:", error);
    }
}

export function* watchLogout() {
   
    yield takeLatest(AUTH_LOGOUT, logoutSaga);
}

export function* watchLogin() {
    yield takeLatest(AUTH_LOGIN, loginSaga);
}

export function* watchRegister() {
    yield takeLatest(AUTH_REGISTER, registerSaga);
}

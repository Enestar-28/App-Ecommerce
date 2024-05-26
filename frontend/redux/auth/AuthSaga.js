import { Alert } from "react-native";
import { takeLatest, call, put } from "redux-saga/effects";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  registerFailure,
  forgetFailure,
  forgetSuccess,
  changePasswordSuccess,
  changePasswordFailure,
} from "./AuthActions";
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REGISTER,
  AUTH_FORGET_PASSWORD,
  AUTH_CHANGE_PASSWORD,
} from "../../constants/constants.js";

import {
  navigateToMain,
  navigateToLogin,
  navigateToChangePass,
} from "../../navigation/navigationHelpers.js";
import {
  login,
  register,
  forgetPassword,
  rePassword,
} from "../../api/ApiUser.js";
function* loginSaga(action) {
  const { user, navigation } = action.payload;

  try {
    const response = yield call(login, user);
    const token = response.data.result.accessToken;
    const userId = response.data.result.user._id;
    yield call(AsyncStorage.setItem, "authToken", token);
    yield call(AsyncStorage.setItem, "UserId", userId);
    yield put(loginSuccess({ token, userId }));

    navigateToMain(navigation);
  } catch (error) {
    console.log("Error logging in:", error);
    // Xử lý lỗi khi đăng nhập không thành công
    Alert.alert("Lỗi đăng nhập", "Email hoặc mật khẩu không đúng");
  }
}

function* registerSaga(action) {
  const { user, navigation } = action.payload;
  try {
    // Gọi API đăng ký
    const response = yield call(register, user);
    // Hiển thị thông báo đăng ký thành công
    Alert.alert(
      "Đăng kí thành công",
      "Bạn đã đăng kí thành công, hãy đăng nhập để tiếp tục sử dụng dịch vụ"
    );
    yield put(registerSuccess());
    navigateToLogin(navigation);
  } catch (error) {
    Alert.alert("Đăng kí lỗi", "Lỗi xảy ra trong quá trình đăng kí tài khoản");
    yield put(registerFailure());
    console.log("registration failed", error);
  }
}

function* logoutSaga() {
  try {
    console.log("auth token", AsyncStorage.getItem("authToken"));
    yield call(AsyncStorage.removeItem, "authToken");
    yield call(AsyncStorage.removeItem, "UserId");
    yield put(logoutSuccess());
  } catch (error) {
    Alert.alert("Lỗi", "Không thể đăng xuất tài khoản");
    console.log("Error clearing auth token:", error);
  }
}

function* forgetPasswordSaga(action) {
  const { user, navigation } = action.payload;

  try {
    const response = yield call(forgetPassword, user);
    Alert.alert(
      "Gửi mã thành công",
      `Mã xác nhận đã được gửi đến email của bạn: ${user.email}`
    );

    yield put(forgetSuccess());
    navigateToChangePass(navigation, user.email);
  } catch (error) {
    Alert.alert(
      "Lỗi gửi mã xác nhận",
      "Nhập email không đúng hoặc không tồn tại trong hệ thống."
    );
    // Hiển thị thông báo quên mật khẩu thất bại
    yield put(forgetFailure());
  }
}
function* changePasswordSaga(action) {
  const { user, navigation } = action.payload;
  try {
    const response = yield call(rePassword, user);
    Alert.alert(
      "Thay đổi mật khẩu thành công",
      `Mật khẩu của bạn đã được thay đổi thành công`
    );
    yield put(changePasswordSuccess());
    navigateToLogin(navigation);
  } catch (error) {
    Alert.alert(

      "Mã xác nhận không đúng",
      "Kiểm tra lại mã xác nhận rồi thử lại."
    );
    // Hiển thị thông báo quên mật khẩu thất bại
    yield put(changePasswordFailure(error));
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
export function* watchForgetPassword() {
  yield takeLatest(AUTH_FORGET_PASSWORD, forgetPasswordSaga);
}
export function* watchChangePassword() {
  yield takeLatest(AUTH_CHANGE_PASSWORD, changePasswordSaga);
}

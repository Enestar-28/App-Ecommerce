import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    register: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { login, logout, register } = AuthSlice.actions;

export const logoutAsync = (navigation) => async (dispatch) => {
  try {
    await AsyncStorage.removeItem("authToken");
    dispatch(logout());
    console.log("auth token cleared");
    navigation.replace("Login");
  } catch (error) {
    console.log("Error clearing auth token:", error);
  }
};

export default AuthSlice.reducer;
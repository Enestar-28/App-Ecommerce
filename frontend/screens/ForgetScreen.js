import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { forgetRequest, login } from "../redux/auth/AuthActions";

const ForgetScreen = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const dispatch = useDispatch();
  const [touched, setTouched] = useState(false);
  const navigation = useNavigation();

  const handleEmailChange = (text) => {
    setEmail(text);
    // Người dùng đã bắt đầu nhập
    setTouched(true);
    const errors = validateEmail(text);
    setEmailError(errors.length > 0 ? errors[0] : null);
  };

  const validateEmail = (email) => {
    const errors = [];
    // Kiểm tra định dạng email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("Email không hợp lệ");
    }
    return errors;
  };

  const handleFoget = () => {
    if (emailError) {
      Alert.alert("Lỗi", "Vui lòng nhập Email đúng định dạng.");
      return;
    }
    const user = { email };

    dispatch(forgetRequest({ user, navigation }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={require("../assets/image/login1.jpg")}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.loginText}>Lấy lại mật khẩu</Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View>
            <View style={styles.inputContainer}>
              <TextInput
                value={email}
                onChangeText={handleEmailChange}
                style={styles.input}
                placeholder="Nhập Email"
              />
            </View>
            {emailError && (
              <Text style={{ color: "red", marginTop: 5 }}>{emailError}</Text>
            )}
          </View>
        </View>
        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ marginLeft: 7 }}>
            Nhấn gửi để nhận mã xác nhận email
          </Text>
        </View>

        <View style={{ marginTop: 80 }} />

        <Pressable onPress={handleFoget} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Gửi mã</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 50,
  },
  image: {
    width: 150,
    height: 175,
  },
  loginText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 0,
    color: "#041E42",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#D0D0D0",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30,
  },
  icon: {
    marginLeft: 8,
  },
  input: {
    color: "gray",
    marginVertical: 10,
    width: 300,
    fontSize: 16,
    marginLeft: 5,
  },
  forgotPassword: {
    color: "#007FFF",
    fontWeight: "500",
  },
  loginButton: {
    width: 200,
    backgroundColor: "#FEBE10",
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
  },
  loginButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpText: {
    textAlign: "center",
    color: "gray",
    fontSize: 16,
  },
});

export default ForgetScreen;

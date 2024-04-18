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

import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                // inetrcrpter
                if (token) {
                    navigation.replace("Main");
                }
            } catch (err) {
                console.log("error message", err);
            }
        };
        checkLoginStatus();
    }, []);
    const handleLogin = () => {
        const user = {
            email: email,
            password: password,
        };

        axios.post("http://192.168.1.42:3333/api/v0/login", user)
            .then((response) => {

                const token = response.data.accessToken;
                AsyncStorage.setItem("authToken", token);
                navigation.replace("Main");
            })
            .catch((error) => {
                Alert.alert("Lỗi đăng nhập", "Email hoặc mật khẩu không đúng");
                console.log(error);
            });
    };
    return (
        <SafeAreaView
            style={styles.container}
        >
            <View>
                <Image
                    style={styles.image}
                    source={{
                        uri: "https://images.creativemarket.com/0.1.0/ps/12582373/1200/799/m1/fpnw/wm0/nq-logo-designs-(2)-.jpg?1655371491&s=71428269453e63ca71c0dc8ea3ae5350",
                    }}
                />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text
                        style={styles.loginText}
                    >
                        Đăng nhập tài khoản
                    </Text>
                </View>

                <View style={{ marginTop: 70 }}>
                    <View
                        style={styles.inputContainer}
                    >
                        <MaterialIcons
                            style={styles.icon}
                            name="email"
                            size={24}
                            color="gray"
                        />

                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={styles.input}
                            placeholder="Nhập Email"
                        />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View
                        style={styles.inputContainer}
                    >
                        <Entypo name="key" size={24}
                            color="gray"
                            style={{ marginLeft: 8 }} />

                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            style={styles.input}
                            placeholder="Nhập Password"
                        />
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
                    <Text>Chúc bạn một ngày tốt lành</Text>

                    <Text style={styles.forgotPassword}>
                        Quên mật khẩu
                    </Text>
                </View>

                <View style={{ marginTop: 80 }} />

                <Pressable
                    onPress={handleLogin}
                    style={styles.loginButton}
                >
                    <Text
                        style={styles.loginButtonText}
                    >
                        Đăng nhập
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate("Register")}
                    style={{ marginTop: 15 }}
                >
                    <Text style={styles.signUpText}>
                        Bạn chưa có tài khoản? Đăng kí
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 50,
    },
    image: {

        width: 150,
        height: 175,
    },
    loginText: {

        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 12,
        marginBottom: 0,
        color: '#041E42',

    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#D0D0D0',
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 30,
    },
    icon: {
        marginLeft: 8,
    },
    input: {
        color: 'gray',
        marginVertical: 10,
        width: 300,
        fontSize: 16,
    },
    forgotPassword: {
        color: '#007FFF',
        fontWeight: '500',
    },
    loginButton: {
        width: 200,
        backgroundColor: '#FEBE10',
        borderRadius: 6,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 15,
    },
    loginButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signUpText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 16,
    },
});


export default LoginScreen;

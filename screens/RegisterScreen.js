import React, { useState } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    Pressable,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Alert,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import axios from 'axios';

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigation = useNavigation();

    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            password: password,
        };

        axios
            .post('http://192.168.1.42:3333/api/v0/register', user)
            .then((response) => {
                console.log(response);
                Alert.alert(
                    'Đăng kí thành công',
                    'Bạn đã đăng kí thành công, hãy đăng nhập để tiếp tục sử dụng dịch vụ'
                );
                setName('');
                setEmail('');
                setPassword('');
            })
            .catch((error) => {
                Alert.alert('Đăng kí lỗi', 'Lỗi xảy ra trong quá trình đăng kí tài khoản');
                console.log('registration failed', error);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image
                    style={{ width: 150, height: 175 }}
                    source={{
                        uri: 'https://images.creativemarket.com/0.1.0/ps/12582373/1200/799/m1/fpnw/wm0/nq-logo-designs-(2)-.jpg?1655371491&s=71428269453e63ca71c0dc8ea3ae5350',
                    }}
                />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: 'center' }}>
                    <Text
                        style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            marginTop: 12,
                            marginBottom: 0,
                            color: '#041E42',
                        }}
                    >
                        Đăng kí tài khoản
                    </Text>
                </View>

                <View style={{ marginTop: 70 }}>
                    <View style={styles.inputContainer}>
                        <FontAwesome name="user" size={24} color="gray" style={{ marginLeft: 8 }} />
                        <TextInput


                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={styles.input}
                            placeholder="Nhập tên"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialIcons
                            style={{ marginLeft: 8 }}
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

                <View>
                    <View style={styles.inputContainer}>
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
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text>Chúc bạn một ngày tốt lành</Text>

                    <Text style={styles.forgotPasswordText}>Quên mật khẩu</Text>
                </View>

                <View style={{ marginTop: 80 }} />

                <Pressable onPress={handleRegister} style={styles.registerButton}>
                    <Text style={styles.registerButtonText}>Đăng kí</Text>
                </Pressable>

                <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 15 }}>
                    <Text style={styles.signInText}>
                        Bạn đã có tài khoản? Đăng nhập
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#D0D0D0',
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 30,
    },
    input: {
        color: 'gray',
        marginVertical: 10,
        width: 300,
        fontSize: 16,
    },
    forgotPasswordText: {
        color: '#007FFF',
        fontWeight: '500',
    },
    registerButton: {
        width: 200,
        backgroundColor: '#FEBE10',
        borderRadius: 6,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 15,
    },
    registerButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signInText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 16,
    },
});



export default RegisterScreen;
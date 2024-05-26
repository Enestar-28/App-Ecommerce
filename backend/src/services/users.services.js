
const usersModel = require('../models/user.model')
const { hashPassword } = require('../utils/crypto')
const {
    createTokenPair,
    verifyToken,
    generateTokenToken,
    refreshToken
} = require('../utils/jwt')
const { checkEmails, sendEmail } = require("../utils/email");
const tokenModel = require('../models/token.model')
require('dotenv').config()



let UserService = {
    //REGISTER
    register: async (payload) => {
        try {
            const { name, email, password } = payload;
            //check if user already exists
            const checkEmail = await checkEmails(email);
            const hashedPassword = await hashPassword(password);
            const newUser = await usersModel.insertMany({
                name,
                email,
                password: hashedPassword,
            });
            console.log("newUser", newUser);
            //create token pair
            const user_id = newUser[0]._id.toString();
            const verify = newUser[0].verified;
            const result = await createTokenPair(
                { user_id, verify },
                process.env.JWT_SECRET
            );
            return result;
        } catch (e) {
            throw new Error("Không thể tạo tài khoản");
        }
    },

    // LOGIN
    login: async (payload) => {
        const { email, password } = payload;

        const user = await usersModel.findOne({ email: email });
        if (!user) {
            throw new Error("Không tìm thấy user");
        }
        user_id = user._id.toString();
        verify = user.verified;
        //create token pair
        const token = await createTokenPair(
            { user_id, verify },
            process.env.JWT_SECRET
        );
        const decoded_refresh_token = await verifyToken(
            token.refreshToken,
            process.env.JWT_SECRET
        );
        //insertOneToken into database

        const refreshToken = token.refreshToken;
        const exp = decoded_refresh_token.exp;

        const exps = await new Date(exp * 1000);
        const filter = { user_id },
            update = {
                refreshTokensUsed: [],
                exp,
                refreshToken,
            },
            option = { upsert: true, new: true };
        const newKeyToken = await tokenModel.findOneAndUpdate(
            filter,
            update,
            option
        );

        return {
            user,
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
        };
    },

    // logout: async (payload) = {

    // },

    //add a address
    addAddress: async (userId, address) => {
        try {
            // Find the user by userId
            const user = await usersModel.findById(userId);
            if (!user) {
                throw new Error({ message: "Không tìm thấy người dùng" });
            }
            // Add the new address to the addresses array
            user.addresses.push(address);
            // Save the updated user document
            await user.save();
            return user;
        } catch (error) {
            console.error("Error adding address:", error);
            throw new Error("Không thêm được địa chỉ ");
        }
    },

    //get a address
    getAdress: async (user_id) => {
        try {
            const user = await usersModel.findOne({ _id: user_id });
            return user.addresses;
        } catch (err) {
            throw new Error("Không tìm thấy địa chỉ");
        }
    },
    updateAddress: async (payload) => {
        try {
            const { user_id, address_id, addressData } = payload;
            const user = await usersModel.findOne({ _id: user_id });
            if (!user) {
                throw new Error("Không tìm thấy người dùng ");
            }
            const address = user.addresses.id(address_id);
            if (!address) {
                throw new Error("Không tìm thấy địa chỉ ");
            }
            // Update the address fields
            address.set(addressData);
            // Save the updated user document
            await user.save();
        } catch (error) {
            console.error("Error updating address:", error);
            throw new Error("Không thể cập nhật địa chỉ ");
        }
    },
    deleteAddress: async (userId, addressId) => {
        try {
            const user = await usersModel.findOne({ _id: userId });
            if (!user) {
                throw new Error("Không tìm thấy người dùng");
            }

            // Tìm địa chỉ dựa trên address_id
            const foundAddress = user.addresses.find(
                (address) => address._id.toString() === addressId.toString()
            );
            if (!foundAddress) {
                throw new Error("Không tìm thấy địa chỉ");
            }

            // Lấy index của địa chỉ trong mảng addresses
            const addressIndex = user.addresses.findIndex(
                (address) => address._id.toString() === addressId.toString()
            );

            // Xóa địa chỉ khỏi mảng addresses của người dùng
            user.addresses.splice(addressIndex, 1);

            // Lưu tài liệu người dùng đã được cập nhật
            await user.save();

            console.log("Địa chỉ đã được xóa thành công");
        } catch (error) {
            console.error("Lỗi khi xóa địa chỉ:", error);
            throw new Error("Không thể xóa địa chỉ");
        }
    },

    // get profie
    getme: async (user_id) => {
        try {
            const user = await usersModel.findOne({ _id: user_id });
            console.log("user", user);
            return user;
        } catch (err) {
            throw new Error("Không tìm thấy người dùng");
        }
    },

    updateMe: async (payload) => {
        try {
            const { user_id, name, email, addresses } = payload;
            const user = await usersModel.findOneAndUpdate(
                { _id: user_id },
                {
                    name,
                    email,
                    addresses,
                }
            );
            return user;
        } catch (err) {
            throw new Error("Không thể cập nhật thông tin");
        }
    },
    forgotPass: async (payload) => {
        try {
            const { email } = payload;

            const user = await usersModel.findOne({ email });
            const code_verify = `${user.id}${code}`;
            tempCodes[email] = code_verify;
            await sendEmail(
                email,
                "Gửi mã Xác nhận",
                "Mã xác nhận của bạn là: " + code_verify + ""
            );
            return { code_verify };
        } catch (error) {
            throw new Error(error);
        }
    },

    resetPass: async (payload) => {
        try {
            const { email, code, newPassword } = data;
            if (!email || !code || !newPassword) {
                throw new Error("Vui lòng nhập đầy đủ thông tin");
            }
            if (tempCodes[email] !== code) {
                throw new Error("Mã xác nhận không chính xác");
            }
            delete tempCodes[email];
            const hashedPassword = await hashPassword(password);
            const user = await usersModel.findOneAndUpdate(
                { email },
                { password: hashedPassword }
            );
            return user;
        } catch (error) {
            throw new Error(error);
        }
    },
    changePassword: async (payload) => {
        try {
            const { email, password, newPassword } = payload;
            const user = await usersModel.findOne({ email });
            if (!user) {
                throw new Error("Không tìm thấy user");
            }
            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                throw new Error("Mật khẩu không chính xác");
            }
            const hashedPassword = await hashPassword(newPassword);
            const updatedUser = await usersModel.findOneAndUpdate
                ({ email }, { password: hashedPassword });
            return updatedUser;
        } catch (error) {
            throw new Error(error);
        }
    },
        
};

module.exports = UserService

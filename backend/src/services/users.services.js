
const usersModel = require('../models/user.model')
const { hashPassword } = require('../utils/crypto')
const {
    createTokenPair,
    verifyToken,
    generateTokenToken,
    refreshToken
} = require('../utils/jwt')
// const USERS_MESSAGES = require('../constants/messages')
const { checkEmails } = require('../utils/email')
const tokenModel = require('../models/token.model')

require('dotenv').config()



let UserService = {

    //REGISTER
    register: async (payload) => {
        try {
            const { name, email, password } = payload
            //check if user already exists
            const checkEmail = await checkEmails(email)
            const hashedPassword = await hashPassword(password)
            const newUser = await usersModel.insertMany(
                {
                    name,
                    email,
                    password: hashedPassword,
                }
            )
            console.log('newUser', newUser)
            //create token pair
            const user_id = newUser[0]._id.toString()
            const verify = newUser[0].verified
            const result = await createTokenPair({ user_id, verify }, process.env.JWT_SECRET);
            return result
        } catch (e) {
            throw e;
        }
    },

    // LOGIN
    login: async (payload) => {
        const { email, password } = payload;

        const user = await usersModel.findOne({ email: email });
        if (!user) {
            throw new ErrorWithStatus({ message: "Không tìm thấy user", status: 400 });
        }
        user_id = user._id.toString()
        verify = user.verified
        //create token pair
        const token = await createTokenPair({ user_id, verify }, process.env.JWT_SECRET);
        const decoded_refresh_token = await verifyToken(token.refreshToken, process.env.JWT_SECRET)
        //insertOneToken into database

        const refreshToken = token.refreshToken
        const exp = decoded_refresh_token.exp

        const exps = await new Date(exp * 1000)
        const filter = { user_id }, update = {
            refreshTokensUsed: [], exp,
            refreshToken
        }, option = { upsert: true, new: true }
        const newKeyToken = await tokenModel.findOneAndUpdate(filter, update, option);

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
                throw new Error({ message: "User not found" });
            }
            // Add the new address to the addresses array
            user.addresses.push(address);
            // Save the updated user document
            await user.save();
            return user;
        } catch (error) {
            console.error("Error adding address:", error);
            throw error;
        }
    },




    //get a address 
    getAdress: async (user_id) => {
        try {
            const user = await usersModel.findOne({ _id: user_id })
            return user.addresses
            
        } catch (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    updateAddress: async (payload) => {
        try {
            const { user_id, address_id, addressData } = payload
            const user = await usersModel.findOne({ _id: user_id })
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const address = user.addresses.id(address_id);
            if (!address) {
                return res.status(404).json({ message: "Address not found" });
            }
            // Update the address fields
            address.set(addressData);
            // Save the updated user document
            await user.save();
            return res.status(200).json({ message: "Address updated successfully", user });
        } catch (error) {
            console.error("Error updating address:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    deleteAddress: async (payload) => {
        try {
            const { user_id, address_id } = payload
            const user = await usersModel.findOne({ _id: user_id })
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const address = user.addresses.id(address_id);
            if (!address) {
                return res.status(404).json({ message: "Address not found" });
            }
            // Remove the address from the addresses array
            address.remove();
            // Save the updated user document
            await user.save();
            return res.status(200).json({ message: "Address deleted successfully", user });
        } catch (error) {
            console.error("Error deleting address:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    // get profie 
    getme: async (userId) => {
        try {
            const user = await usersModel.findOne({ _id: userId })
            return user
        } catch (err) {
            throw (err)
        }
    },

    updateMe: async (payload) => {
        try {
            const { user_id, name, email, addresses } = payload
            const user = await usersModel.findOneAndUpdate({ _id: user_id }, {
                name,
                email,
                addresses,

            })
            return user

        }
        catch (err) {
            throw (err)
        }


    }



};

module.exports = UserService

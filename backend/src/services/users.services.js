
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
const userModel = require('../models/user.model')
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


    //add a address
    addAddress: async (payload) => {
        const { user_id, address } = payload
        const user = await usersModel.findOne({ _id: user_id })
        user.addresses.push(address)
        await user.save()
        return user.addresses
    },

    //get a address 
    getresses: async (payload) => {
        try {
            const { user_id } = payload
            const user = await usersModel.findOne({ _id: user_id })
            return user.addresses
        } catch (err) {
            throw (err)
        }
    },

    // get profie 
    getme: async (payload) => {
        try {
            const { user_id } = payload
            const user = await userModel.findOne({ _id: user_id })
            return user
        } catch (err) {
            throw (err)
        }
    },

    updateMe: async (payload) => {
        try {
            const { user_id, name, email, addresses } = payload
            const user = await userModel.findOneAndUpdate({ _id: user_id }, {
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

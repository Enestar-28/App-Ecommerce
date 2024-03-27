const bcrypt = require('bcryptjs')
import usersModel from '../models/user.model'
import {hashPassword} from '../utils/crypto' 
import {createTokenPair,createforgotToken,createEmailToken,verifyToken} from '../utils/jwt'
import USERS_MESSAGES  from '../constants/messages'
require('dotenv').config()
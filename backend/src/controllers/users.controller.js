const { token } = require('morgan')
const UserService = require('../services/users.services')
require('dotenv').config()



const registerController = async (req, res) => { 

    const result = await UserService.register(req.body)
    return res.json({
        message: 'User created',
        result
    })
 
}
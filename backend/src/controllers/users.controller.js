
const UserService = require('../services/users.services')
require('dotenv').config()




const loginController = async (req, res) => {
    const result = await UserService.login(req.body)
    return res.json({
        message: 'User login',
        result
    })
}

const registerController = async (req, res) => {
    const result = await UserService.register(req.body)
    return res.json({
        message: 'User created',
        result
    })
}


const addressesController = async (req, res) => {
    const result = await UserService.addresses(req.body)
    return res.json({
        message: 'User created',
        result
    })
}


const meController = async (req, res) =>{
    const result = await UserService.getme(req.body)
    return res.json({
        message: 'User created',
        result
    })
}


const updateMeController = async (req, res) =>{
    const result = await UserService.updateMe(req.body)
    return res.json({
        message: 'update successful'
        
    })
}


module.exports = {
    loginController,
    registerController,
    addressesController,
    meController
}

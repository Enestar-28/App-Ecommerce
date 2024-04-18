const express = require('express')
const {loginController,
    registerController,
    addressesController,
    meController,
    getAdressController,
    updateAddressesController,
    deleteAddressController,
    updateMeController} = require( '../controllers/users.controller')
const {
    loginValidator,
} = require('../middlewares/user.middlewares')
const { updateMe } = require('../services/users.services')



const router = express.Router()



router.post('/login',  loginController)
router.post('/register',  registerController)

// //log out 
// router.post('logout', logoutController)



router.get('/address/:user_id', getAdressController)
router.post('/address',addressesController)
router.put('/address', updateAddressesController)
router.post('/delete-address', deleteAddressController)



router.get('/me/:userId', meController )
router.put('/me', updateMeController)





module.exports = router




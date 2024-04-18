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

const wrapAsync = require('../utils/handlers')

const router = express.Router()



router.post('/login',loginValidator, wrapAsync(loginController))
router.post('/register',  wrapAsync(registerController))

// //log out 
// router.post('logout', logoutController)



router.get('/address/:user_id', wrapAsync(getAdressController))
router.post('/address',wrapAsync(addressesController))
router.put('/address', wrapAsync(updateAddressesController))
router.post('/delete-address', wrapAsync(deleteAddressController))



router.get('/me/:userId', wrapAsync(meController))
router.put('/me', wrapAsync(updateMeController))





module.exports = router




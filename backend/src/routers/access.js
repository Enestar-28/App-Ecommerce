const express = require('express')
const {loginController,
    registerController,
    addressesController,
    meController,
    updateMeController} = require( '../controllers/users.controller')
const {
    loginValidator,
} = require('../middlewares/user.middlewares')



const router = express.Router()



router.post('/login',  loginController)
router.post('/register',  registerController)

router.post('/addresses',addressesController)

// router.get('/me', meController )
// router.post('/updateme', updateMeController)

module.exports = router




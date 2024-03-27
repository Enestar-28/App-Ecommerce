const express = require('express')


const {registerController,
    } = require('../controllers/users.controller')
const {registerValidator} = require('../validators/user.validator')


const router = express.Router()


router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.post('/register',registerValidator, registerController)





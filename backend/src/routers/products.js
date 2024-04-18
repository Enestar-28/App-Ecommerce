const {
    getproController,
    addproController,
    addcatController,
    getcatController,
    getprobycateController,
    addorderController,
    getorderController
} = require('../controllers/products.controller')


const express = require('express')
const router = express.Router()


router.post('/addproducts', addproController)
router.get('/getproducts', getproController)
router.get('/getprobycate', getprobycateController)




// -------------------categoris----------------

router.post('/addcategoris', addcatController)
router.get('/getcategoris', getcatController)




// -------------------------orders-------------------

router.get('/orders/:user_id', getorderController)
router.post('/orders', addorderController)




module.exports = router

const express = require('express')



const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// init db 
require('./src/dbs/init.mongodb')
// // init routes
// app.use('/', require('./src/routes'))




module.exports = app
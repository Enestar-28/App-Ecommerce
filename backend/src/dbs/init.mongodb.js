const mongoose = require('mongoose')
require('dotenv').config()

class Database {
    constructor(){
        this.connect()
    }

    //connect to database mongodb
    connect(){
        mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('MongoDB connected')
        })
        .catch((error) => {
            console.log(error)
        })
    }

    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database()
        }
        return Database.instance 
    }
}

const instanceMongoDB = Database.getInstance()


module.exports = {
    instanceMongoDB
}


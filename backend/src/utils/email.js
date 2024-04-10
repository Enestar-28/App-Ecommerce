userModel = require('../models/user.model');


const checkEmails = async (email) => {

    const existingUser = await userModel.findOne({email: email});
    if (existingUser) {
        return res.status(400).json({ message: "Email đã tồn tại" });
    }else{
        return email
        }
}

module.exports = { 
    checkEmails 
}
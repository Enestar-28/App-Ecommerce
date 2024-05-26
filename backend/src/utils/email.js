const userModel = require('../models/user.model');
const nodemailer = require("nodemailer");

const checkEmails = async (email) => {

    const existingUser = await userModel.findOne({email: email});
    if (existingUser) {
        return res.status(400).json({ message: "Email đã tồn tại" });
    }else{
        return email
        }
}


const sendEmail = async (email, subject, text) => {
  const mailOptions = {
    from: "phamtrungnguyenvx99@gmail.com",
    to: email,
    subject: subject,
    html: text,
  };
  await transporter.sendMail(mailOptions);
};
 

module.exports = {
  checkEmails,
  sendEmail,
};
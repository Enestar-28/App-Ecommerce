const mongoose = require("mongoose");


const DOCUMENT_NAME = 'User'    
const COLLECTION_NAME = 'Users'



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  addresses: [
    {
      name: String,
      mobileNo: String,
      houseNo: String,
      street: String,
      landmark: String,
      city: String,
      country: String,
      postalCode: String,
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],

  timestamps:true,
  collection: COLLECTION_NAME,
  
});

module.exports =  mongoose.model(DOCUMENT_NAME,userSchema);


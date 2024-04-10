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
  old_password: {
    type: Array,
    default: [],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
    default: false,
  },
  refreshTokensUsed: {
    type: [String],
    default: false,
  },
  email_verify_token: {
    type: String,
    default: false,
  },
  forgot_password_token: {
    type: String,
  },
  status: {
    type: String,
    default: false,
  },
  addresses: [
    {
      name: String,
      number: String,
      street: String,
      city: String,
      country: String,
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
}, {
  timestamps: true, // Add timestamps to the document (createdAt, updatedAt)
  collection: COLLECTION_NAME, // Specify the collection name explicitly
});

module.exports = mongoose.model(DOCUMENT_NAME, userSchema);

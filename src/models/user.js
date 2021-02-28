const mongoose = require("../database");
const bcript = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  phone: {
    type: Number,
    minlength: 11,
    maxlength: 11,
  },
  permission: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const User = mongoose.model("User", UserSchema);

module.exports = User;

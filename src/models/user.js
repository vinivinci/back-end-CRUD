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

UserSchema.pre("save", async function (next) {
  const hash = await bcript.hash(this.password, 10);
  this.password = hash;
  next();
});
const User = mongoose.model("User", UserSchema);

module.exports = User;

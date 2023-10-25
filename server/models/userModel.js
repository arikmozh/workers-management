const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    phone: String,
    password: String,
    maxActions: Number,
    packageId: Number,
  },
  { versionKey: false }
);

const User = mongoose.model("user", userSchema, "users");

module.exports = User;

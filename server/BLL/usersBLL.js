// const usersWS = require("../DAL/usersWS");
// const usersFile = require("../DAL/usersFile");
const UserModel = require("../models/userModel");

const getUser = (userId) => {
  return UserModel.find({ _id: userId });
};

const getUserEmail = (email) => {
  return UserModel.find({ email: email });
};

const addUser = async (obj) => {
  obj.maxActions = 50;
  obj.packageId = 0;
  const user = new UserModel(obj);
  await user.save();
  return "Created!";
};

module.exports = {
  getUserEmail,
  addUser,
};

// const usersWS = require("../DAL/usersWS");
// const usersFile = require("../DAL/usersFile");
const DepartmentModel = require("../models/departmentModel");

// const getUserEmail = (email) => {
//   return UserModel.find({ email: email });
// };

const addDepartment = async (obj) => {
  const department = new DepartmentModel(obj);
  await department.save();
  return "Created!";
};

module.exports = {
  // getUserEmail,
  addDepartment,
};

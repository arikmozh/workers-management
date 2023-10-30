const EmployeeModel = require("../models/employeeModel");

const getEmployees = async (userId) => {
  const employees = await EmployeeModel.find({
    userId: userId,
  });
  return employees;
};

const getEmployeeById = async (employeeId) => {
  const employees = await EmployeeModel.find({
    _id: employeeId,
  });
  return employees;
};

const addEmployee = async (obj) => {
  const employee = new EmployeeModel(obj);
  await employee.save();
  return "Created!";
};

const updateEmployee = async (employeeId, updatedData) => {
  const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
    employeeId,
    updatedData,
    { new: true }
  );
  return updatedEmployee;
};

const deleteEmployee = async (employeeId) => {
  const deletedEmployee = await EmployeeModel.findOneAndDelete({
    _id: employeeId,
  });

  return deletedEmployee; // Return the deleted department
};

module.exports = {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};

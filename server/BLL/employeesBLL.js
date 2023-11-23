const EmployeeModel = require("../models/employeeModel");
const ShiftModel = require("../models/shiftModel");
const mongoose = require("mongoose"); // Add this line

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
  return employee;
};

const updateEmployee = async (employeeId, updatedData) => {
  const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
    employeeId,
    updatedData,
    { new: true }
  );
  return updatedEmployee;
};

// const deleteEmployee = async (employeeId) => {
//   const deletedEmployee = await EmployeeModel.findOneAndDelete({
//     _id: employeeId,
//   });

//   return deletedEmployee; // Return the deleted department
// };

const deleteEmployee = async (employeeId) => {
  try {
    // Find the employee to be deleted
    const deletedEmployee = await EmployeeModel.findOneAndDelete({
      _id: employeeId,
    });

    if (!deletedEmployee) {
      throw new Error("Employee not found");
    }

    // Remove the employee's _id from the corresponding shifts
    await ShiftModel.updateMany(
      { shiftEmployees: employeeId },
      { $pull: { shiftEmployees: employeeId } }
    );

    return deletedEmployee; // Return the deleted employee
  } catch (error) {
    // Handle errors (e.g., log them, throw custom error)
    console.error("Error deleting employee:", error);
    throw error;
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};

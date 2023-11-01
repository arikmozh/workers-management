const DepartmentModel = require("../models/departmentModel");

const getDepartments = async (userId) => {
  const departments = await DepartmentModel.find({
    userId: userId,
  });
  return departments;
};

const getDepartmentById = async (departmentId) => {
  const departments = await DepartmentModel.find({
    _id: departmentId,
  });
  return departments;
};

const addDepartment = async (obj) => {
  const department = new DepartmentModel(obj);
  await department.save();
  return department;
};

const updateDepartment = async (departmentId, updatedData) => {
  const updatedDepartment = await DepartmentModel.findByIdAndUpdate(
    departmentId,
    updatedData,
    { new: true }
  );
  return updatedDepartment; // Return the updated department
};

const deleteDepartment = async (departmentId) => {
  const deletedDepartment = await DepartmentModel.findOneAndDelete({
    _id: departmentId,
  });

  return deletedDepartment; // Return the deleted department
};

module.exports = {
  getDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};

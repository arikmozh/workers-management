const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    departmentName: String,
    departmentUser: String,
  },
  { versionKey: false }
);

const Department = mongoose.model(
  "department",
  departmentSchema,
  "departments"
);

module.exports = Department;

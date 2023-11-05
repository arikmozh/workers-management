const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    userId: String,
    startingDate: Date,
    employeeName: String,
    employeeAge: String,
    employeeContact: String,
    employeeSalaryPerHour: Number,
  },
  { versionKey: false }
);

const Employee = mongoose.model("employee", employeeSchema, "employees");

module.exports = Employee;

const mongoose = require("mongoose");
const Employee = require("./employeeModel");

const shiftSchema = new mongoose.Schema(
  {
    userId: String,
    departmentId: String,
    shiftName: String,
    shiftDate: Date,
    shiftStartingHour: String,
    shiftEndingHour: String,
    shiftCreatedDate: Date,
    shiftEmployees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
  },
  { versionKey: false }
);

const Shift = mongoose.model("shift", shiftSchema, "shifts");

module.exports = Shift;

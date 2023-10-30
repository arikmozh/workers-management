const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema(
  {
    userId: String,
    departmentId: String,
    shiftName: String,
    shiftDate: Date,
    shiftStartingHour: String,
    shiftEndingHour: String,
    shiftCreatedDate: Date,
    shiftEmployees: {
      type: [String],
      default: [],
    },
  },
  { versionKey: false }
);

const Shift = mongoose.model("shift", shiftSchema, "shifts");

module.exports = Shift;

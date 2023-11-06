const ShiftModel = require("../models/shiftModel");

const getShifts = async (userId) => {
  const shifts = await ShiftModel.find({
    userId: userId,
  });
  return shifts;
};

const getShiftById = async (shiftId) => {
  const shifts = await ShiftModel.find({
    _id: shiftId,
  });
  return shifts;
};

const addShift = async (obj) => {
  const shift = new ShiftModel(obj);
  await shift.save();
  return shift;
};

const updateShift = async (shiftId, updatedData) => {
  const updatedShift = await ShiftModel.findByIdAndUpdate(
    shiftId,
    updatedData,
    { new: true }
  );
  return updatedShift; // Return the updated department
};

const deleteShift = async (shiftId) => {
  const deletedShift = await ShiftModel.findOneAndDelete({
    _id: shiftId,
  });

  return deletedShift; // Return the deleted department
};

module.exports = {
  getShifts,
  getShiftById,
  addShift,
  updateShift,
  deleteShift,
};

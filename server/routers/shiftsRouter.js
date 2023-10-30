const express = require("express");
const jwt = require("jsonwebtoken");
const shiftsBLL = require("../BLL/departmentsBLL");
const router = express.Router();

//Get Shifts
router.route("/getShifts").get(async (req, res) => {
  const { userId } = req.body;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, "Workers");
    if (decoded.userId === userId) {
      const shift = await shiftsBLL.getShifts(userId);
      res.status(200).json(shift); // 200 - OK
    } else {
      res.status(401).json({ message: "Some thing went wrong" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

//Get Shift by id
router.route("/getShifts/:id").get(async (req, res) => {
  const { userId } = req.body;
  const shiftId = req.params.id;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, "Workers");
    if (decoded.userId === userId) {
      const shift = await shiftsBLL.getShiftById(shiftId);
      res.status(200).json(shift); // 200 - OK
    } else {
      res.status(401).json({ message: "Some thing went wrong" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

//Add Shift
router.route("/addShift").post(async (req, res) => {
  const { userId } = req.body;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, "Workers");
    if (decoded.userId === userId) {
      const shift = await shiftsBLL.addShift(req.body);
      res.status(200).json(shift); // 200 - OK
    } else {
      res.status(401).json({ message: "Some thing went wrong" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

//Update Shift by id
router.route("/updateShift/:id").put(async (req, res) => {
  const { userId } = req.body;
  const updatedData = req.body;
  const shiftId = req.params.id;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, "Workers");
    if (decoded.userId === userId) {
      const shift = await shiftsBLL.updateShift(shiftId, updatedData);
      res.status(200).json(shift); // 200 - OK
    } else {
      res.status(401).json({ message: "Some thing went wrong" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

//Delete Shift by id
router.route("/deleteShift/:id").delete(async (req, res) => {
  const { userId } = req.body;
  const shiftId = req.params.id;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, "Workers");
    if (decoded.userId === userId) {
      const shift = await shiftsBLL.deleteShift(shiftId);
      res.status(200).json(shift); // 200 - OK
    } else {
      res.status(401).json({ message: "Some thing went wrong" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;

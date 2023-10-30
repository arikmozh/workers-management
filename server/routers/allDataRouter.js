const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const usersBLL = require("../BLL/usersBLL");
const departmentsBLL = require("../BLL/departmentsBLL");
const shiftsBLL = require("../BLL/shiftsBLL");
const employeesBLL = require("../BLL/employeesBLL");

//All Data
router.route("/:id").get(async (req, res) => {
  const userId = req.params.id; // Extract the department ID from the URL
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, "Workers");
    if (decoded.userId === userId) {
      const user = await usersBLL.getUser(userId);
      const departments = await departmentsBLL.getDepartments(userId);
      const shifts = await shiftsBLL.getShifts(userId);
      const employees = await employeesBLL.getEmployees(userId);

      const allData = {
        user: user,
        departments: departments,
        shifts: shifts,
        employees: employees,
      };

      res.status(200).json(allData); // 200 - OK
    } else {
      res.status(401).json({ message: "Some thing went wrong" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;

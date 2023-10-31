const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const usersBLL = require("../BLL/usersBLL");
const departmentsBLL = require("../BLL/departmentsBLL");
const shiftsBLL = require("../BLL/shiftsBLL");
const employeesBLL = require("../BLL/employeesBLL");

const Department = require("../models/departmentModel");
const Shift = require("../models/shiftModel");
const Employee = require("../models/employeeModel");

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
      const data = await getDepartmentsWithShiftsAndEmployees(userId);
      const allData = {
        user: user,
        departments: departments,
        shifts: shifts,
        employees: employees,
        data: data,
      };

      res.status(200).json(allData); // 200 - OK
    } else {
      res.status(401).json({ message: "Some thing went wrong" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// const getOrderedData = async (userId) => {

// };

// Fetch departments by userId
async function getDepartmentsWithShiftsAndEmployees(userId) {
  try {
    const departments = await Department.find({ userId });

    const allShifts = await Shift.find({ userId });
    const allEmployees = await Employee.find();

    const departmentsWithShifts = await Promise.all(
      departments.map(async (department) => {
        const shiftsInDepartment = allShifts.filter(
          (shift) => String(shift.departmentId) === String(department._id)
        );

        const shiftsWithEmployees = await Promise.all(
          shiftsInDepartment.map(async (shift) => {
            const employeesInShift = allEmployees.filter((employee) =>
              shift.shiftEmployees.includes(employee._id)
            );
            return {
              ...shift.toObject(),
              employees: employeesInShift,
            };
          })
        );

        return {
          ...department.toObject(),
          shiftsInThisDepartment: shiftsWithEmployees,
        };
      })
    );

    return departmentsWithShifts;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
}

module.exports = router;

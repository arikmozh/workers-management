const express = require("express");
const jwt = require("jsonwebtoken");
const employeesBLL = require("../BLL/employeesBLL");
const router = express.Router();

//Get Employees
router.route("/getEmployees").get(async (req, res) => {
  const { userId } = req.body;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, "Workers");
    if (decoded.userId === userId) {
      const employees = await employeesBLL.getEmployees(userId);
      res.status(200).json(employees); // 200 - OK
    } else {
      res.status(401).json({ message: "Some thing went wrong" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

//Get Employee by id
router.route("/getEmployees/:id").get(async (req, res) => {
  const { userId } = req.body;
  const employeeId = req.params.id;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, "Workers");
    if (decoded.userId === userId) {
      const employee = await employeesBLL.getEmployeeById(employeeId);
      res.status(200).json(employee); // 200 - OK
    } else {
      res.status(401).json({ message: "Some thing went wrong" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

//Add Employee
router.route("/addEmployee").post(async (req, res) => {
  const { userId } = req.body;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, "Workers");
    if (decoded.userId === userId) {
      const employee = await employeesBLL.addEmployee(req.body);
      res.status(200).json(employee); // 200 - OK
    } else {
      res.status(401).json({ message: "Some thing went wrong" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

//Update Employee by id
router.route("/updateEmployee/:id").put(async (req, res) => {
  const { userId } = req.body;
  const updatedData = req.body;
  const employeeId = req.params.id;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, "Workers");
    if (decoded.userId === userId) {
      const employee = await employeesBLL.updateEmployee(
        employeeId,
        updatedData
      );
      res.status(200).json(employee); // 200 - OK
    } else {
      res.status(401).json({ message: "Some thing went wrong" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

//Delete Employees by id
router.route("/deleteEmployee/:id").delete(async (req, res) => {
  const { userId } = req.body;
  const employeeId = req.params.id;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, "Workers");
    if (decoded.userId === userId) {
      const employee = await employeesBLL.deleteEmployee(employeeId);
      res.status(200).json(employee); // 200 - OK
    } else {
      res.status(401).json({ message: "Some thing went wrong" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;

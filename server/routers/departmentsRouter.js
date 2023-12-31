const express = require("express");
const jwt = require("jsonwebtoken");
const departmentsBLL = require("../BLL/departmentsBLL");
const router = express.Router();

//Get Departments
router.route("/getDepartments").get(async (req, res) => {
  const { userId } = req.body;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, "Workers");
    if (decoded.userId === userId) {
      const department = await departmentsBLL.getDepartments(userId);
      res.status(200).json(department); // 200 - OK
    } else {
      res.status(401).json({ message: "Some thing went wrong" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

//Get Departments by id
router.route("/getDepartments/:id").get(async (req, res) => {
  const { userId } = req.body;
  const departmentId = req.params.id; // Extract the department ID from the URL
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, "Workers");
    if (decoded.userId === userId) {
      const department = await departmentsBLL.getDepartmentById(departmentId);
      res.status(200).json(department); // 200 - OK
    } else {
      res.status(401).json({ message: "Some thing went wrong" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

//Add Department
router.route("/addDepartment").post(async (req, res) => {
  const { userId, departmentName } = req.body;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, "Workers");
    if (decoded.userId === userId) {
      const obj = {
        departmentName: departmentName,
        userId: userId,
      };

      const department = await departmentsBLL.addDepartment(obj);
      res.status(200).json(department); // 200 - OK
    } else {
      res.status(401).json({ message: "Some thing went wrong" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

//Update Department by id
router.route("/updateDepartment/:id").put(async (req, res) => {
  const { userId, departmentName } = req.body;
  const updatedData = req.body; // Data to update the department

  const departmentId = req.params.id; // Extract the department ID from the URL
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, "Workers");
    if (decoded.userId === userId) {
      const department = await departmentsBLL.updateDepartment(
        departmentId,
        updatedData
      );
      res.status(200).json(department); // 200 - OK
    } else {
      res.status(401).json({ message: "Some thing went wrong" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

//Delete Department by id
router.route("/deleteDepartment/:id").delete(async (req, res) => {
  const { userId } = req.body;
  const departmentId = req.params.id; // Extract the department ID from the URL
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, "Workers");
    if (decoded.userId === userId) {
      const department = await departmentsBLL.deleteDepartment(departmentId);
      res.status(200).json(department); // 200 - OK
    } else {
      res.status(401).json({ message: "Some thing went wrong" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;

const express = require("express");
const jwt = require("jsonwebtoken");
const shiftsBLL = require("../BLL/shiftsBLL");
const employeesBLL = require("../BLL/employeesBLL");
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
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
});

//Update Shift by id
router.route("/updateShift/:id").put(async (req, res) => {
  console.log(req.body);
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

//Add employee to a Shift
router
  .route("/addEmployeeToShift/:shiftId/:employeeId")
  .post(async (req, res) => {
    const { userId } = req.body;
    const shiftId = req.params.shiftId;
    const employeeId = req.params.employeeId;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Access denied, token missing" });
    }

    try {
      const decoded = jwt.verify(token, "Workers");
      if (decoded.userId === userId) {
        const employee = await employeesBLL.getEmployeeById(employeeId);
        if (employee.length > 0) {
          const shift = await shiftsBLL.getShiftById(shiftId);
          if (shift.length > 0) {
            const existingEmployeeIndex =
              shift[0].shiftEmployees.indexOf(employeeId);
            if (existingEmployeeIndex === -1) {
              shift[0].shiftEmployees.push(employeeId);
              await shiftsBLL.updateShift(shiftId, shift[0]);
              return res.status(200).json({
                message: "Employee added to shift successfully",
              });
            } else {
              return res
                .status(401)
                .json({ message: "Employee already exists in the shift" });
            }
          } else {
            return res.status(404).json({ message: "Shift not found" });
          }
        } else {
          return res.status(404).json({ message: "Employee not found" });
        }
      } else {
        return res.status(401).json({ message: "Something went wrong" });
      }
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  });

// router
//   .route("/addEmployeeToShift/:shiftId/:employeeId")
//   .post(async (req, res) => {
//     const { userId } = req.body;
//     const shiftId = req.params.shiftId;
//     const employeeId = req.params.employeeId;
//     const token = req.headers.authorization;

//     if (!token) {
//       return res.status(401).json({ message: "Access denied, token missing" });
//     }
//     console.log("hey");
//     try {
//       const decoded = jwt.verify(token, "Workers");
//       if (decoded.userId === userId) {
//         const employee = await employeesBLL.getEmployeeById(employeeId);
//         console.log(employee);

//         if (employee.length > 0) {
//           const shift = await shiftsBLL.getShiftById(shiftId);
//           console.log(shift);

//           if (!shift[0].shiftEmployees.includes(employee[0])) {
//             shift[0].shiftEmployees.push(employee[0]);
//             // await shift.save();
//             await shiftsBLL.updateShift(shiftId, shift[0]);
//             return res.status(200).json({
//               message: "Employee added to shift successfully",
//             });
//           } else {
//             return res
//               .status(401)
//               .json({ message: "Employee already exists in the shift" });
//           }
//         } else {
//           res.status(401).json({ message: "Employee not found" });
//         }
//       } else {
//         res.status(401).json({ message: "Some thing went wrong" });
//       }
//     } catch (error) {
//       res.status(401).json({ message: "Invalid token" });
//     }
//   });

module.exports = router;

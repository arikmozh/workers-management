const express = require("express");
const jwt = require("jsonwebtoken");
const usersBLL = require("../BLL/usersBLL");
const router = express.Router();

//Get User by id
router.route("/getUser/:id").get(async (req, res) => {
  const userId = req.params.id;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, "Workers");
    if (decoded.userId === userId) {
      const user = await usersBLL.getUser(shiftId);
      res.status(200).json(user); // 200 - OK
    } else {
      res.status(401).json({ message: "Some thing went wrong" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

//Update User by id
router.route("/updateUser/:id").put(async (req, res) => {
  const updatedData = req.body;
  const userId = req.params.id;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, "Workers");
    if (decoded.userId === userId) {
      const user = await usersBLL.updateUser(userId, updatedData);
      res.status(200).json(user); // 200 - OK
    } else {
      res.status(401).json({ message: "Some thing went wrong" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;

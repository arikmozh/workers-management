const express = require("express");
const jwt = require("jsonwebtoken");
const usersBLL = require("../BLL/usersBLL");
const router = express.Router();

//Register
router.route("/register").post(async (req, res) => {
  try {
    const { fullname, email, password, phone } = req.body;

    const existEmail = await usersBLL.getUserEmail(email);

    if (existEmail.length > 0) {
      res.status(401).json({ message: "User is already exists" });
    } else {
      const obj = req.body;
      const user = await usersBLL.addUser(obj);
      res.json(user); // 200 - OK
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Invalid credentials" });
  }
});

//Login
router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  const user = await usersBLL.getUserEmail(email);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  const passwordMatch = password == user[0].password;
  if (!passwordMatch) {
    return res.status(401).json({ message: "Incorrect password" });
  }
  const token = jwt.sign(
    { userId: user[0]._id, username: user[0].email },
    "Workers", // Replace with a strong, secret key
    { expiresIn: "3h" } // Token expiration time (e.g., 1 hour)
  );

  res.status(200).json({ token: token, id: user[0]._id });
});

router.route("/isLoggedIn/:id").get(async (req, res) => {
  const userId = req.params.id; // Extract the department ID from the URL
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, "Workers");
    if (decoded.userId === userId) {
      res.status(200).json({ message: "Success" }); // 200 - OK
    } else {
      res.status(401).json({ message: "Some thing went wrong" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;

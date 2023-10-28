const express = require("express");
const jwt = require("jsonwebtoken");
const usersBLL = require("../BLL/usersBLL");
const router = express.Router();

router.route("/register").post(async (req, res) => {
  try {
    const { fullname, email, password, phone } = req.body;

    const existEmail = await usersBLL.getUserEmail(email);

    if (existEmail.length > 0) {
      res.status(401).json({ message: "User is already exists" });
    } else {
      const obj = req.body;
      console.log(req.body);
      const user = await usersBLL.addUser(obj);
      res.json(user); // 200 - OK
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Invalid credentials" });
  }
});

router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  const user = await usersBLL.getUserEmail(email);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  // Compare the provided password with the hashed password in the database
  const passwordMatch = password == user[0].password;
  console.log(password);
  console.log(user);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  // Authentication successful; you can generate a token and return it here
  // For generating tokens, you can use libraries like jsonwebtoken
  const token = jwt.sign(
    { userId: user._id, username: user.email },
    "Workers", // Replace with a strong, secret key
    { expiresIn: "3h" } // Token expiration time (e.g., 1 hour)
  );

  // Send a success response with the token, user data, or a success message
  res.status(200).json({ token });
});

module.exports = router;

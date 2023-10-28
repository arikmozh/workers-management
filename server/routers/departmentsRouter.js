const express = require("express");
const jwt = require("jsonwebtoken");
const departmentsBLL = require("../BLL/departmentsBLL");
const router = express.Router();

router.route("/addDepartment").post(async (req, res) => {
  const { departmentUser, departmentName } = req.body;

  // Extract the token from the request headers
  const token = req.headers.authorization;
  console.log(token);
  // const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, "Workers"); // Replace 'Workers' with your secret key
    console.log(decoded);
    if (decoded.userId === userId) {
      // The token belongs to the same user; proceed to add the department
      // Add your logic here to create the department in the database for the given userId
      const obj = {
        departmentName: departmentName,
        departmentUser: departmentUser,
      };
      const department = await departmentsBLL.addDepartment(obj);
      res.status(200).json(department); // 200 - OK

      // Send a success response or any necessary data
      // res
      //   .status(200)
      //   .json({ message: "Department added for user ID: " + userId });
    } else {
      res.status(401).json({ message: "Invalid token for the user" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

const verify = (token, secretKey) => {
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err);
    } else {
      // If verification succeeds, check if the decoded payload matches the provided userId and username
      // if (decoded.userId === userId && decoded.username === username) {
      //   console.log(
      //     "Token is valid and matches the provided userId and username."
      //   );
      console.log(
        "Token is valid and matches the provided userId and username."
      );
    }
    // else {
    //   console.log("Token is invalid for the provided userId and username.");
    // }
  });
};

module.exports = router;

const express = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
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

    // const existEmail = new Promise((resolve, reject) => {
    //   UserModel.findOne({ email }, function (err, user) {
    //     if (err) reject(new Error(err));
    //     if (user) reject({ error: "Please use unique email" });

    //     resolve();
    //   });
    // });

    // Promise.all([ existEmail])
    //   .then(() => {
    //     if (password) {
    //       bcrypt
    //         .hash(password, 10)
    //         .then((hashedPassword) => {
    //           const user = new UserModel({
    //             username,
    //             password: hashedPassword,
    //             profile: profile || "",
    //             email,
    //           });

    //           // return save result as a response
    //           user
    //             .save()
    //             .then((result) =>
    //               res.status(201).send({ msg: "User Register Successfully" })
    //             )
    //             .catch((error) => res.status(500).send({ error }));
    //         })
    //         .catch((error) => {
    //           return res.status(500).send({
    //             error: "Enable to hashed password",
    //           });
    //         });
    //     }
    //   })
    //   .catch((error) => {
    //     return res.status(500).send({ error });
    //   });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Invalid credentials" });
  }
});

router.route("/login").post(async (req, res) => {});

module.exports = router;

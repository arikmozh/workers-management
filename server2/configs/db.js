const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/WorkersManagement")
    .then(() => console.log("Connected to WorkersManagementDB!"))
    .catch((error) => console.log(error));
};

module.exports = connectDB;

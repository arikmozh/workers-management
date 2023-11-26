const mongoose = require("mongoose");

const connectDB = () => {
  // mongoose
  //   .connect("mongodb://localhost:27017/WorkersManagement")
  //   .then(() => console.log("Connected to WorkersManagementDB!"))
  //   .catch((error) => console.log(error));
  mongoose
    .connect(
      "mongodb+srv://arikbars:arikbars123@cluster.yfn6rie.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("Connected to WorkersManagementDB!"))
    .catch((error) => console.log(error));
};

module.exports = connectDB;

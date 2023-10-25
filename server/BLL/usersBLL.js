// const usersWS = require("../DAL/usersWS");
// const usersFile = require("../DAL/usersFile");
const UserModel = require("../models/userModel");

const getUserEmail = (email) => {
  return UserModel.find({ email: email });
};

const addUser = async (obj) => {
  obj.maxActions = 50;
  obj.packageId = 0;
  const user = new UserModel(obj);
  await user.save();
  return "Created!";
};

// const fs = require("fs");
// const filePath = "./data/actions.json";

// let userLoggedInId = "";
// const setUserLoggedInId = (userId) => {
//   userLoggedInId = userId;
// };
// const getUser = async (username, email) => {
//   const { data: usersWeb } = await usersWS.getAllUsers();
//   const userWeb = usersWeb.find(
//     (user) => user.username == username && email == email
//   );
//   return userWeb;
// };

// const getUserDB_Id = (fullname) => {
//   return User.find({ fullName: fullname }).select("_id");
// };

// // const updateUser = async (id, obj) => {
// //   await Shift.findByIdAndUpdate(id, obj);
// //   return "Updated!";
// // };

// const decreaseUserActions = async (id) => {
//   try {
//     const result = await User.updateOne(
//       { _id: id },
//       { $inc: { numOfActions: -1 } }
//     );
//     if (result.modifiedCount === 1) {
//       console.log("Document updated successfully");
//     } else {
//       console.log(
//         "No document was updated. Maybe the document with the given _id doesn't exist."
//       );
//     }
//   } catch (err) {
//     console.error(err);
//   }
//   // return User.updateOne(
//   //   { _id: id },
//   //   { $inc: { numOfActions: -1 } },
//   //   (err, result) => {
//   //     if (err) {
//   //       console.error(err);
//   //     } else {
//   //       console.log("Document updated successfully");
//   //     }
//   //   }
//   // );
// };

// const getUserNumOfActions = async (id) => {
//   return User.find({ _id: id }).select("numOfActions");
// };
// const getUserActionsAllowed = async (id) => {
//   return User.find({ _id: id }).select("maxActions");
// };

// const checkAndDecrease = async () => {
//   console.log("try userId", userLoggedInId);
//   let noa = await getUserNumOfActions(userLoggedInId);
//   let maa = await getUserActionsAllowed(userLoggedInId);
//   let numOfActions = noa[0].numOfActions;
//   let maxActions = maa[0].maxActions;

//   console.log("numOfActions:", numOfActions);
//   if (numOfActions > 0) {
//     let res = await decreaseUserActions(userLoggedInId);
//     // Usage example
//     let date = new Date().toISOString();
//     const objectToAdd = {
//       id: userLoggedInId,
//       maxActions: maxActions,
//       date: date,
//       actionsAllowed: numOfActions - 1,
//     };

//     addObjectToArrayInJSONFile(filePath, objectToAdd);

//     return "done";
//   } else {
//     return "err";
//   }
// };

// // Function to add an object to a local JSON file
// const addObjectToArrayInJSONFile = (filePath, objectToAdd) => {
//   try {
//     // Read the JSON file and parse its content
//     const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

//     // Assuming your JSON structure has an array named 'myArray'
//     jsonData.actions.push(objectToAdd);

//     // Convert the JavaScript object back to JSON
//     const updatedJsonData = JSON.stringify(jsonData, null, 2);

//     // Write the updated content back to the JSON file
//     fs.writeFileSync(filePath, updatedJsonData, "utf8");
//     console.log("Object added to JSON file successfully.");
//   } catch (err) {
//     console.error("Error:", err);
//   }
// };

module.exports = {
  getUserEmail,
  addUser,
};

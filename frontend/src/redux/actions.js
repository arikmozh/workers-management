const doAddRegisterPage1 = (obj) => {
  return {
    type: "doAddRegisterPage1",
    payload: obj,
  };
};
const doAddLoginPage1 = (obj) => {
  return {
    type: "doAddLoginPage1",
    payload: obj,
  };
};

// const doRemoveProduct = (prodId) => {
//   return {
//     type: "REMOVE",
//     payload: prodId,
//   };
// };

export { doAddRegisterPage1, doAddLoginPage1 };

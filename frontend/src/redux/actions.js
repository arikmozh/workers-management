////////////////////////     Auth      //////////////////////
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
const doLogout = () => {
  return {
    type: "doLogout",
  };
};

export const updateUsername = (username) => {
  return {
    type: "UPDATE_USERNAME",
    payload: username,
  };
};

////////////////////////     updateRootState after login     //////////////////////

const updateRootState = (data) => {
  return {
    type: "UPDATE_ROOT_STATE",
    payload: data,
  };
};

////////////////////////     updateRootState Departments     //////////////////////

const doAddDepartment = (data) => {
  return {
    type: "ADD_DEPARTMENT",
    payload: data,
  };
};

export {
  doAddRegisterPage1,
  doAddLoginPage1,
  doLogout,
  updateRootState,
  doAddDepartment,
};

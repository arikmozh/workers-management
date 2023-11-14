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

////////////////////////     updateRootState User     //////////////////////

const updateRootState = (data) => {
  return {
    type: "UPDATE_ROOT_STATE",
    payload: data,
  };
};

////////////////////////     updateRootState after login     //////////////////////

const doUpdateUser = (data) => {
  return {
    type: "UPDATE_USER",
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

const doUpdateDepartment = (data) => {
  return {
    type: "UPDATE_DEPARTMENT",
    payload: data,
  };
};

const doDeleteDepartment = (data) => {
  return {
    type: "DELETE_DEPARTMENT",
    payload: data,
  };
};

////////////////////////     updateRootState Shifts     //////////////////////

const doAddShift = (data) => {
  return {
    type: "ADD_SHIFT",
    payload: data,
  };
};

const doUpdateShift = (data) => {
  return {
    type: "UPDATE_SHIFT",
    payload: data,
  };
};

const doDeleteShift = (data) => {
  return {
    type: "DELETE_SHIFT",
    payload: data,
  };
};

export {
  doAddRegisterPage1,
  doAddLoginPage1,
  doLogout,
  updateRootState,
  doUpdateUser,
  doAddDepartment,
  doUpdateDepartment,
  doDeleteDepartment,
  doAddShift,
  doUpdateShift,
  doDeleteShift,
};

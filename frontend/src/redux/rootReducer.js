const initialState = {
  register: {
    fullName: "",
    email: "",
    phone: "",
    // password: "",
  },
  login: {
    email: "",
  },
  user: [],
  departments: [],
  shifts: [],
  employees: [],
  data: [],
};
const clear = {
  register: {
    fullName: "",
    email: "",
    phone: "",
    // password: "",
  },
  login: {
    email: "",
  },
  user: [],
  departments: [],
  shifts: [],
  employees: [],
  data: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "doAddRegisterPage1": {
      const { fullName, email, phone } = action.payload;
      return {
        ...state,
        register: {
          ...state.register,
          fullName: fullName || state.register.fullName,
          email: email || state.register.email,
          phone: phone || state.register.phone,
        },
      };
    }

    case "doAddLoginPage1": {
      const email = action.payload;
      return {
        ...state,
        login: {
          ...state.login,
          email: email || state.login.email,
        },
      };
    }

    case "doLogout": {
      return { ...clear };
    }

    case "UPDATE_ROOT_STATE":
      return {
        // ...state,
        user: action.payload.user,
        departments: action.payload.departments,
        shifts: action.payload.shifts,
        employees: action.payload.employees,
        data: action.payload.data,
      };

    case "UPDATE_USERNAME":
      return {
        ...state,
        login: {
          ...state.login,
          email: action.payload,
        },
      };

    case "ADD_DEPARTMENT":
      return {
        ...state,
        departments: [
          ...state.departments,
          action.payload, // Adding the new department to the existing array
        ],
        data: [
          ...state.data,
          {
            departmentName: action.payload.departmentName,
            shiftsInThisDepartment: [],
            userId: action.payload.userId,
            _id: action.payload._id,
          },
        ],
      };
    default:
      return state;
  }
};

export default rootReducer;

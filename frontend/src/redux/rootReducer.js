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

    // case "UPDATE_ROOT_STATE":
    //   return action.payload;
    case "UPDATE_ROOT_STATE":
      return {
        ...state,
        user: action.payload.user[0],
        departments: action.payload.departments,
        shifts: action.payload.shifts,
        employees: action.payload.employees,
      };

    case "UPDATE_USERNAME":
      return {
        ...state,
        login: {
          ...state.login,
          email: action.payload,
        },
      };

    default:
      return state;
  }
};

export default rootReducer;

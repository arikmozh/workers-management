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

    case "REMOVE": {
      const products = state.products.filter(
        (prod) => prod.id !== action.payload
      );

      return { ...state, products };
    }

    default:
      return state;
  }
};

export default rootReducer;

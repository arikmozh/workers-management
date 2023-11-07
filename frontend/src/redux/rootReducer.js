/* eslint-disable no-case-declarations */
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

    case "UPDATE_DEPARTMENT":
      return {
        ...state,
        departments: state.departments.map((department) => {
          if (department._id === action.payload._id) {
            return {
              ...department,
              departmentName: action.payload.departmentName,
            };
          }
          return department;
        }),
        data: [
          ...state.data.map((d) => {
            if (d._id === action.payload._id) {
              return {
                ...d,
                departmentName: action.payload.departmentName,
              };
            }
            return d;
          }),
        ],
      };

    case "DELETE_DEPARTMENT":
      return {
        ...state,
        departments: state.departments.filter(
          (department) => department._id !== action.payload._id
        ),
        data: state.data.filter((d) => d._id !== action.payload._id),
      };

    case "ADD_SHIFT":
      return {
        ...state,
        shifts: [
          ...state.shifts,
          action.payload, // Adding the new department to the existing array
        ],
        data: [
          ...state.data.map((d) => {
            if (d._id === action.payload.departmentId) {
              return {
                ...d,
                shiftsInThisDepartment: [
                  ...d.shiftsInThisDepartment,
                  action.payload,
                ],
              };
            }
            return d;
          }),
        ],
      };

    case "UPDATE_SHIFT":
      const updatedShifts = state.shifts.map((shift) => {
        return shift._id === action.payload._id
          ? { ...shift, ...action.payload }
          : shift;
      });

      const updatedData = state.data.map((d) => {
        return d._id === action.payload.departmentId
          ? {
              ...d,
              shiftsInThisDepartment: d.shiftsInThisDepartment.map((s) => {
                return s._id === action.payload._id
                  ? { ...s, ...action.payload }
                  : s;
              }),
            }
          : d;
      });

      return {
        ...state,
        shifts: updatedShifts,
        data: updatedData,
      };

    // return {
    //   ...state,
    //   shifts: state.shifts.map((shift) => {
    //     if (shift._id === action.payload._id) {
    // return {
    //   ...shift,
    //   ...action.payload,
    // };
    //     }
    //     return shift;
    //   }),
    //   // data: [
    //   //   ...state.data.map((d) => {
    //   //     if (d._id === action.payload.departmentId) {
    //   //       return {
    //   //         ...d.shiftsInThisDepartment: d.shiftsInThisDepartment.map((s)=>{
    //   //                     if (s._id === action.payload._id) {
    //   //     return {
    //   //       action.payload,
    //   //     };
    //   //   }

    //   //         })

    //   //       };
    //   //     }
    //   //     return d;
    //   //   }),
    //   // ],
    // };

    case "DELETE_SHIFT":
      return {
        ...state,
        shifts: state.shifts.filter(
          (shift) => shift._id !== action.payload._id
        ),
        data: state.data.map((department) => {
          if (department._id === action.payload.departmentId) {
            return {
              ...department,
              shiftsInThisDepartment: department.shiftsInThisDepartment.filter(
                (shift) => shift._id !== action.payload._id
              ),
            };
          }
          return department;
        }),
      };

    default:
      return state;
  }
};

export default rootReducer;

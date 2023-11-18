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

    case "UPDATE_USER":
      return {
        ...state,
        user: [action.payload],
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

    case "ADD_EMPLOYEE":
      return {
        ...state,
        employees: [
          ...state.employees,
          action.payload, // Adding the new department to the existing array
        ],
      };

    case "UPDATE_EMPLOYEE":
      console.log("actiionnn", action.payload);

      return {
        ...state,
        employees: state.employees.map((emp) => {
          // If emp._id matches action.payload._id, update the employee
          if (emp._id === action.payload._id) {
            return {
              // Update other properties from action.payload if needed
              ...action.payload,
            };
          }
          // Otherwise, return the original employee
          return emp;
        }),
      };

    default:
      return state;
  }
};

export default rootReducer;

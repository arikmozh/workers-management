interface RegisterState {
  fullName: string;
  email: string;
  phone: string;
}
interface LoginState {
  email: string;
}

interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  maxActions: number;
  packageId: number;
}

interface RootState {
  register: RegisterState;
  login: LoginState;
  user: User;
  departments: Department[];
  shifts: Shift[];
  employees: Employee[];
  data: dataDepartment[];
}
interface Department {
  _id: string;
  departmentName: string;
  userId: string;
}

interface Shift {
  userId: string;
  departmentId: string;
  shiftName: string;
  shiftDate: Date;
  shiftStartingHour: string;
  shiftEndingHour: string;
  shiftCreatedDate: Date;
  shiftEmployees: string[];
}

interface Employee {
  userId: string;
  departmentId: string;
  startingDate: Date;
  employeeName: string;
  employeeAge: string;
  employeeContact: string;
  employeeSalaryPerHour: number;
}

interface dataDepartment {
  _id: string;
  departmentName: string;
  userId: string;
  shiftsInThisDepartment: dataShift[];
}

interface dataShift {
  userId: string;
  departmentId: string;
  shiftName: string;
  shiftDate: Date;
  shiftStartingHour: string;
  shiftEndingHour: string;
  shiftCreatedDate: Date;
  shiftEmployees: string[];
  employees: Employee[];
}

export type {
  RootState,
  RegisterState,
  LoginState,
  User,
  Department,
  Shift,
  Employee,
  dataDepartment,
  dataShift,
};

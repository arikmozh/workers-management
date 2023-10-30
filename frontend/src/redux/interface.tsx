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
  departments: [];
  shifts: [];
  employees: [];
}

export type { RootState, RegisterState, LoginState, User };

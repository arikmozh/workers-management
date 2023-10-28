interface RegisterState {
  fullName: string;
  email: string;
  phone: string;
}
interface LoginState {
  email: string;
}

interface RootState {
  register: RegisterState;
  login: LoginState;
}

export type { RootState, RegisterState, LoginState };

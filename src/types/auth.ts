export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName:string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

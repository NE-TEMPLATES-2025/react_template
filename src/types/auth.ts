export interface User {
  id: string
  email: string
  names: string
  telephone?: string
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterInput) => Promise<void>
  logout: () => void
  clearError: () => void
}

export interface RegisterInput {
  names: string
  email: string
  telephone: string
  password: string
}

export interface LoginInput {
  email: string
  password: string
} 
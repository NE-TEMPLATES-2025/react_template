/* eslint-disable no-useless-catch */
import { UnauthorizedApi } from "@/lib/api"
import { LoginInput, RegisterInput, ForgotPasswordInput, VerifyOtpInput, ResetPasswordInput } from "@/lib/validations/auth"

export class AuthService {
  private static instance: AuthService
  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async login(data: LoginInput): Promise<{ token: string }> {
    try {
      const response = await UnauthorizedApi.post("/auth/login", data)

      if (response.status !== 200) {
        throw new Error("Login failed")
      }

      return response.data
    } catch (error) {
      throw error
    }
  }

  async register(data: RegisterInput): Promise<{ token: string }> {
    try {
      const response = await UnauthorizedApi.post("/user/create", data)

      if (response.status !== 201) {
        throw new Error("Registration failed")
      }
      return response.data
    } catch (error) {
      throw error
    }
  }

  async forgotPassword(data: ForgotPasswordInput): Promise<void> {
    try {
      const response = await UnauthorizedApi.patch("/auth/initiate-reset-password", data)

      if (response.status !== 200) {
        throw new Error("Failed to send recovery email")
      }
    } catch (error) {
      throw error
    }
  }

  async verifyOtp(data: VerifyOtpInput): Promise<void> {
    try {
      const response = await UnauthorizedApi.patch("/auth/verify-code", {email: data.email, code: data.code})
      if (response.status !== 200) {
        throw new Error("Invalid OTP")
      }
    } catch (error) {
      throw error
    }
  }

  async resendOtp(email: string): Promise<void> {
    try {
      const response = await UnauthorizedApi.patch("/auth/initiate-reset-password", { email })

      if (response.status !== 200) {
        throw new Error("Failed to resend OTP")
      }
    } catch (error) {
      throw error
    }
  }

  async resetPassword(data: ResetPasswordInput & { email: string; code: string }) {
    return UnauthorizedApi.patch("/auth/reset-password", {email: data.email, password: data.password, code: data.code})
  }
} 
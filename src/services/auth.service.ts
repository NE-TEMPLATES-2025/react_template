/* eslint-disable no-useless-catch */
import { UnauthorizedApi } from "@/lib/api";
import { LoginInput, RegisterInput, User } from "@/types/auth";

export class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(data: LoginInput): Promise<{ token: string; user: User }> {
    try {
      const response = await UnauthorizedApi.post("/auth/login", data);

      if (response.status !== 200) {
        throw new Error("Login failed");
      }
      return response.data?.data;
    } catch (error) {
      throw error;
    }
  }

  async register(data: RegisterInput): Promise<{ token: string; user: User }> {
    try {
      const response = await UnauthorizedApi.post("/auth/register", data);

      if (response.status !== 201) {
        throw new Error("Registration failed");
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(data: { email: string }): Promise<void> {
    try {
      const response = await UnauthorizedApi.patch(
        "/auth/initiate-reset-password",
        data,
      );

      if (response.status !== 200) {
        throw new Error("Failed to send recovery email");
      }
    } catch (error) {
      throw error;
    }
  }

  async verifyOtp(data: { code: string; email: string }): Promise<void> {
    try {
      const response = await UnauthorizedApi.patch(
        "/auth/verify-email/" + data.code,
      );

      if (response.status !== 200) {
        throw new Error("Invalid OTP");
      }
    } catch (error) {
      throw error;
    }
  }

  async resendOtp(email: string): Promise<void> {
    try {
      const response = await UnauthorizedApi.post("/auth/resend-otp", {
        email,
      });

      if (response.status !== 200) {
        throw new Error("Failed to resend OTP");
      }
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(data: {
    password: string;
    email: string;
    otp: string;
  }): Promise<void> {
    try {
      const response = await UnauthorizedApi.patch(
        "/auth/reset-password",
        data,
      );

      if (response.status !== 200) {
        throw new Error("Failed to reset password");
      }
    } catch (error) {
      throw error;
    }
  }
}

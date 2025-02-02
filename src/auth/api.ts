
import { AuthStateType } from '../context/types';
import { internalFetcher } from './auth';

// Login API function
export const loginAPI = async (username: string, password: string): Promise<AuthStateType> => {
  try {
    const response = await internalFetcher('auth/login', {
      username,
      password,
    });

    if (response.status === "success") {
      const userData: AuthStateType = {
        access_token: response.data.access_token,
        isLoggedIn: true,
        role: response.data.role,
        user: response.data.user,
      };
      return userData;
    } else {
      throw new Error(response.message || "Login failed");
    }
  } catch (error: any) {
    throw new Error(error.message || "Login API call failed");
  }
};

// Logout API function
export const logoutAPI = async (): Promise<void> => {
  try {
    // Use internalFetcher to call the logout endpoint
    const response = await internalFetcher('auth/logout', {});
    if (response.status !== "success") {
      throw new Error(response.message || "Logout failed");
    }
  } catch (error: any) {
    throw new Error(error.message || "Logout failed");
  }
};

// Refresh Token API function
export const refreshTokenAPI = async (refreshToken: string): Promise<string | null> => {
  try {
    const response = await internalFetcher('auth/refresh-token', {
      refreshToken,
    });
    if (response.status === "success") {
      return response.data.access_token;
    } else {
      throw new Error("Failed to refresh token");
    }
  } catch (error: any) {
    throw new Error(error.message || "Refresh token failed");
  }
};

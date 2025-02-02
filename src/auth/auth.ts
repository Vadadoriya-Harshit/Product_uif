import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useContext } from 'react';

import { blacklistToken, updateAccessToken } from './authUtills'; // Adjust the import path as necessary
import { AuthContext } from '../context/AuthContext';

// Axios instance to handle all requests
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Use environment variable or fallback to localhost
  timeout: 120000, // Timeout set to 2 minutes
  headers: { 'Content-Type': 'application/json' }, // Default header for JSON content
});

// Interface for the API response structure
interface ApiResponse<T = any> {
  status: string;
  data: T;
  message?: string;
}

// The main internalFetcher function
export const internalFetcher = async <T = any>(
  endpoint: string, // API endpoint
  payload?: any, // Data to send with the request
  customHeaders?: Record<string, string> // Optional custom headers
): Promise<ApiResponse<T>> => {
  // Access the AuthContext
  const { authState, logout, token, refreshToken } = useContext<any>(AuthContext);

  // If no token, log the user out and throw error
  if (!token) {
    logout();
    throw new Error('User not authenticated');
  }

  // Prepare the final payload with necessary data
  const finalPayload = {
    ...payload,
    loginUserDetails: authState?.loginUserDetails,
    authState,
  };

  // Axios request configuration
  const config: AxiosRequestConfig = {
    url: `/${endpoint}`, // Full endpoint URL
    method: 'POST', // Ensuring POST method
    data: finalPayload, // Use the updated payload with loginUserDetails and authState
    headers: { Authorization: `Bearer ${token}`, ...customHeaders }, // Add auth token to headers
  };

  try {
    // Make the API call using axios
    const response: AxiosResponse<ApiResponse<T>> = await axiosInstance(config);
    return response.data; // Return the response data
  } catch (error: any) {
    // If token is expired (401), try refreshing it
    if (error.response?.status === 401) {
      console.log('Access token expired, refreshing...');

      // Blacklist current token if exists
      const currentToken = localStorage.getItem('token');
      if (currentToken) await blacklistToken(currentToken);

      // Handle refresh token flow
      if (refreshToken) {
        const newToken = await updateAccessToken(refreshToken);
        if (newToken) {
          // Retry the request after refreshing token
          return internalFetcher<T>(endpoint, payload, customHeaders);
        }
      }

      // If no refreshToken or refresh fails, log out the user
      logout();
      throw new Error('Failed to refresh the access token.');
    }

    // Handle other errors
    throw error;
  }
};

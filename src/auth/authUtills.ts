import axios from 'axios';

// Function to get the auth token from localStorage or state
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Function to refresh the access token using the refresh token (new logic here)
export const updateAccessToken = async (refreshToken: string): Promise<string | null> => {
    try {
      // Call your API to refresh the token with the provided refresh token
      const response = await axios.post('/auth/refresh-token', { refreshToken });
  
      // If successful, store the new access token in localStorage
      const newAccessToken = response.data.accessToken;
      localStorage.setItem('authToken', newAccessToken);
      
      return newAccessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null; // Return null if refreshing token fails
    }
  };
  

// Function to get the login user details from localStorage
export const getLoginUserDetails = () => {
  const userDetails = localStorage.getItem('loginUserDetails');
  return userDetails ? JSON.parse(userDetails) : null;
};

// Function to store user details in localStorage (after successful login)
export const setLoginUserDetails = (userDetails: object): void => {
  localStorage.setItem('loginUserDetails', JSON.stringify(userDetails));
};

// Function to clear login user details (on logout or session expiration)
export const clearLoginUserDetails = (): void => {
  localStorage.removeItem('loginUserDetails');
};

// Function to blacklist the token when user logs out
export const blacklistToken = async (token: string): Promise<void> => {
  try {
    await axios.post('/auth/logout', { token });  // Endpoint to blacklist the token
    console.log('Token blacklisted successfully');
  } catch (error) {
    console.error('Error blacklisting token:', error);
  }
};

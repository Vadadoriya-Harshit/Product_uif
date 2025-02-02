import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define the types for AuthContext
interface AuthState {
  // Add your specific state properties here (example: user role, last login time, etc.)
  userRole: string;
  lastLogin: string;
}

interface AuthContextType {
  login: (data: any) => void;
  logout: () => void;
  isLoggedIn: boolean;
  token: string;
  refreshToken: string;
  loginUserDetails: any;
  authState: AuthState; // Add authState here
}

const initialState: AuthState = {
  userRole: 'guest',
  lastLogin: '',
};

// Create the AuthContext
export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
  token: '',
  refreshToken: '',
  loginUserDetails: null,
  authState: initialState, // Set default authState
});

// Custom hook to use the AuthContext
export const useAuthContext = () => useContext(AuthContext);

// Provider component to wrap around your app
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const [loginUserDetails, setLoginUserDetails] = useState<any>(null);
  const [authState, setAuthState] = useState<AuthState>(initialState); // State for authState

  // Assuming you may fetch these values from localStorage, API, or other sources
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedRefreshToken = localStorage.getItem('refreshToken');
    const savedLoginUserDetails = localStorage.getItem('loginUserDetails');
    const savedAuthState = localStorage.getItem('authState');

    if (savedToken && savedRefreshToken && savedLoginUserDetails) {
      setToken(savedToken);
      setRefreshToken(savedRefreshToken);
      setLoginUserDetails(JSON.parse(savedLoginUserDetails));

      // Parse and set the saved authState if available
      if (savedAuthState) {
        setAuthState(JSON.parse(savedAuthState));
      }

      setIsLoggedIn(true);
    }
  }, []);

  const login = (data: any) => {
    const { token, refreshToken, userDetails, authState } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('loginUserDetails', JSON.stringify(userDetails));
    localStorage.setItem('authState', JSON.stringify(authState)); // Store authState

    setToken(token);
    setRefreshToken(refreshToken);
    setLoginUserDetails(userDetails);
    setAuthState(authState); // Set authState

    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('loginUserDetails');
    localStorage.removeItem('authState'); // Remove authState

    setToken('');
    setRefreshToken('');
    setLoginUserDetails(null);
    setAuthState(initialState); // Reset authState
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoggedIn,
        token,
        refreshToken,
        loginUserDetails,
        authState, // Pass authState here
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

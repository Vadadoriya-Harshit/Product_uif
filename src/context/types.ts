// types.ts

export interface UserDetails {
    id: string;
    name: string;
    branch: string;
  }
  
  export interface AuthStateType {
    access_token: string;
    isLoggedIn: boolean;
    role: string;
    user: UserDetails;
  }
  
  export interface ActionType {
    type: "login" | "logout";
    payload: AuthStateType | {}; // For login, payload will be AuthStateType, for logout it will be empty object
  }
  
  export interface AuthContextType {
    login: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: boolean; // Boolean flag to represent login state
    authState: AuthStateType;
    loginUserDetails: (userDetails: AuthStateType) => void;
    refreshToken: (currentRefreshToken: string) => void;
  }
  
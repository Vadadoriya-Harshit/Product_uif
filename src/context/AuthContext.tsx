import {
  createContext,
  useCallback,
  useReducer,
  useState,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthSDK } from "../auth/auth";

interface User {
  name: string;
  lastLogin: string;
  id: string;
}

interface AccessToken {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  generateTime?: string;
  refresh_token?: string;
}

interface AuthState {
  access_token: AccessToken;
  isLoggedIn: boolean;
  role: string;
  companyName: string;
  workingDate: string;
  minDate: string;
  access: Record<string, any>;
  uniqueAppId: string;
  user: User;
  idealTimer: string;
}

interface AuthContextType {
  login: (payload: AuthState, stopNavigation?: boolean) => void;
  logout: (reqFlag?: string) => void;
  isLoggedIn: () => boolean;
  authState: AuthState;
}

const initialState: AuthState = {
  access_token: {},
  isLoggedIn: false,
  role: "",
  companyName: "",
  workingDate: "",
  minDate: "",
  access: {},
  uniqueAppId: "",
  user: {
    name: "",
    lastLogin: "",
    id: "",
  },
  idealTimer: "",
};

const authReducer = (state: AuthState, action: { type: string; payload?: AuthState }): AuthState => {
  switch (action.type) {
    case "login":
      return action.payload || state;
    case "logout":
      return initialState;
    default:
      return state;
  }
};

let timeoutID: NodeJS.Timeout | null = null;

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [authenticating, setAuthenticating] = useState<boolean>(true);
  const navigate = useNavigate();

  const isLoggedIn = useCallback(() => {
    return state.isLoggedIn;
  }, [state.isLoggedIn]);

  const login = useCallback((payload: any, stopNavigation?: boolean) => {
    dispatch({
      type: "login",
      payload: { ...payload, isLoggedIn: true },
    });
    AuthSDK.setToken(payload?.RESPONSE?.preloginToken);
    // AuthSDK.loginUserDetails(payload);
    setLoginDatainLocalStorage({ ...payload, isLoggedIn: true });
    if (stopNavigation) return;
  }, []);

  const logout = useCallback((reqFlag = "N") => {
    const result = sessionStorage.getItem("authDetails");
    if (result) {
      const localStorageAuthState: AuthState = JSON.parse(result);
      if (localStorageAuthState?.isLoggedIn && localStorageAuthState?.user?.id) {
        // API.LogoutAPI({
        //   USER_ID: localStorageAuthState.user.id,
        //   APP_TRAN_CD: "51",
        //   REQ_FLAG: reqFlag,
        // });
      }
    }
    sessionStorage.removeItem("authDetails");
    dispatch({ type: "logout" });
    if (timeoutID) clearTimeout(timeoutID);
    if (window.location.pathname !== "/cbsenfinity/forgotpassword") {
      navigate("/cbsenfinity/login");
    }
  }, [navigate]);

  const setLoginDatainLocalStorage = async (payload: AuthState): Promise<void> => {
    sessionStorage.setItem("authDetails", JSON.stringify(payload));
  };

  return (
    <AuthContext.Provider value={{ login, logout, isLoggedIn, authState: state }}>
      {/* {authenticating ? "Loading.." : children} */}
      {children}
    </AuthContext.Provider>
  );
};

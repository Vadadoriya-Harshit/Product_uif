import { Fragment, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

export const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuthContext(); // Corrected the context hook here

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect to the login page if the user is not logged in
      navigate("/easyGrave/login");
    }
  }, [navigate, isLoggedIn]);

  // If the user is logged in, render the protected content
  if (isLoggedIn) {
    return <Fragment>{children}</Fragment>;
  }

  // If not logged in, return null or a loading spinner
  return null;
};

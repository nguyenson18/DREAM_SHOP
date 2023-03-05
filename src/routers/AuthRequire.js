import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "../componets/LoadingScreen";
import useAuth from "../hooks/useAuth";

function AuthRequire({ children }) {
  const { isInitialized, isAuthenticated } = useAuth();
  const accessToken = window.localStorage.getItem("accessToken");
  const location = useLocation();
  if (location.pathname == "/account" && !accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!isInitialized) {
    return <LoadingScreen />;
  }
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }
  return children;
}

export default AuthRequire;

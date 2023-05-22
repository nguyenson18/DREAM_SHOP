import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "../componets/LoadingScreen";
import useAuth from "../hooks/useAuth";

function AuthRequire({ children }) {
  const { isInitialized, role } = useAuth();
  const routersCheckRoleMaster = [
    "/checkout",
    //  "/order"
  ];
  const routersCheckRoleNormal = ["/createproduct"];
  const accessToken = window.localStorage.getItem("accessToken");
  const location = useLocation();

  const checkRoleMaster = routersCheckRoleMaster.includes(location.pathname);
  const checkRoleNormal = routersCheckRoleNormal.includes(location.pathname);

  if (location.pathname == "/account" && !accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (
    (checkRoleMaster && (role === "master" || !role)) ||
    (checkRoleNormal && role === "normal")
  ) {
    return <Navigate to="/*" />;
  }

  return children;
}

export default AuthRequire;

import { useSnackbar } from "notistack";
import { createContext, useEffect, useReducer } from "react";
import { useSelector } from "react-redux/es";
import { toast } from "react-toastify";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  role: null,
};

const LOGIN_SUCCESS = "AUTH.REGISTER_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const INITIALIZE = "AUTH.INITIALIZE";
const LOGOUT = "AUTH.LOGOUT";
const UPDATEDPROFILE = "AUTH.UPDATEDPROFILE";
const RESETPASSWORD = "Auth.RESETPASSWORD";
const CHANGEPASSWORD = "AUTH.CHANGEPASSWORD";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { user, isAuthenticated } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user,
        role: user?.role,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action?.payload?.user,
        role: action?.payload?.user?.role,
      };
    case REGISTER_SUCCESS:
      return { ...state, user: null, isAuthenticated: false, role: null };
    case RESETPASSWORD:
      return { ...state };
    case CHANGEPASSWORD:
      return { ...state };
    case LOGOUT:
      return { ...state, isAuthenticated: false, user: null, role:null };
    case UPDATEDPROFILE:
      return { ...state, user: action?.payload?.user, role: action?.payload?.user?.role };
    default:
      return state;
  }
};

const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

const AuthContext = createContext({ ...initialState });

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { updatedProfile } = useSelector((state) => state.user);

  useEffect(() => {
    if (updatedProfile) {
      dispatch({
        type: UPDATEDPROFILE,
        payload: { user: updatedProfile },
      });
    }
  }, [updatedProfile]);

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const reponse = await apiService.get("users/me");
          const user = reponse.data;
          dispatch({
            type: INITIALIZE,
            payload: {
              user: user,
              isAuthenticated: true,
            },
          });
        } else {
          setSession(null);
          dispatch({
            type: INITIALIZE,
            payload: {
              user: null,
              isAuthenticated: false,
            },
          });
        }
      } catch (error) {
        setSession(null);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async ({ email, password }, callBack) => {
    const reponse = await apiService.post("/auth/login", { email, password });
    const { user, accessToken } = reponse.data;
    setSession(accessToken);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user },
    });
    callBack();
    enqueueSnackbar("login success", { variant: "success" });
  };
  const logout = async (callback) => {
    setSession(null);
    dispatch({ type: LOGOUT });
    callback();
  };
  const register = async (
    { name, email, password },
    enqueueSnackbar,
    setCurrentTab
  ) => {
    await apiService.post("/users", {
      name,
      email,
      password,
    });
    dispatch({ type: REGISTER_SUCCESS });
    enqueueSnackbar("Register Successlly", { variant: "success" });
    setCurrentTab("LOGIN");
  };
  const reserPassword = async ({ email }, setCurrentTab, enqueueSnackbar) => {
    await apiService.post("/users/resetpassword", { email });
    dispatch({ type: RESETPASSWORD });
    enqueueSnackbar("Reset Password successfully", { variant: "success" });
    setCurrentTab("LOGIN");
  };

  const handleChangePassword = async (
    { password, changePassword, userId },
    enqueueSnackbar
  ) => {
    const reponse = await apiService.post(`/users/changepassword/${userId}`, {
      password,
      changePassword,
    });
    enqueueSnackbar("Change Password Successfully", { variant: "success" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        reserPassword,
        handleChangePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

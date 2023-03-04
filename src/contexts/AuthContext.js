import { createContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: [],
};

const LOGIN_SUCCESS = "AUTH.REGISTER_SUCCESS";
const INITIALIZE = "AUTH.INITIALIZE";
const LOGOUT = "AUTH.LOGOUT";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { user, isAuthenticated } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user,
      };
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, user: action.payload.user };
    case LOGOUT:
      return { ...state, isAuthenticated: false, user: null };
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
    toast.success("login success");
  };
  const logout = async (callback) => {
    setSession(null);
    dispatch({ type: LOGOUT });
    callback();
    toast.success("logout success");
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthProvider };

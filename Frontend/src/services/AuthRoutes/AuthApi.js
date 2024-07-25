import toast from "react-hot-toast";
import { setLoading, setRegisterData, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { endPoints } from "../api";

const { LOGIN_API, SIGNUP_API, UPDATE_AVATAR } = endPoints;

export function signUp({ firstName, lastName, email, password }, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
      });

      if (!response.data.statusCode) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      if (!response.data.statusCode) {
        throw new Error(response.data.message);
      }

      dispatch(setToken(response.data.data.accessToken));
      dispatch(setRegisterData(response.data.data.user));

      localStorage.setItem(
        "token",
        JSON.stringify(response.data.data.accessToken)
      );

      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      navigate("/dashboard");
      toast.success("Login Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return async (dispatch) => {
    dispatch(setToken(null));
    dispatch(setRegisterData(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}

export function updateAvatar(data, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "PATCH",
        UPDATE_AVATAR,
        data,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("RESPONSE: ", response);
      if (!response.data.statusCode) {
        throw new Error(response.data.message);
      }

      dispatch(setRegisterData({ ...response.data.data }));

      localStorage.setItem(
        "user",
        JSON.stringify({ ...response.data.data })
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error while update the avatar");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

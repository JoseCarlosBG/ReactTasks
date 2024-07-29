import {
  loginUser as loginUserService,
  getUserData as getUserDataService,
} from "../../services";
import { loginUserAction, logoutUserAction, fetchUserAction } from "./actions";

// Async action for login
export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const { token } = await loginUserService(email, password);
      const user = await getUserDataService(token);

      const userData = {
        token,
        name: user.result.name,
        email: user.result.email,
        role: user.result.role,
      };

      // Save token and user data to local storage
      localStorage.setItem("userToken", token);
      localStorage.setItem("userName", user.result.name);
      localStorage.setItem("userRole", user.result.role);

      dispatch(loginUserAction(userData));
    } catch (error) {
      console.error("Error during login:", error.message);
      // Optionally, dispatch an action to handle the error state
    }
  };
};

// Async action for logout
export const logoutUser = () => {
  return (dispatch) => {
    // Clear local storage
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");

    // Dispatch logout action
    dispatch(logoutUserAction());
  };
};

// Async action for fetching user data
export const fetchUserData = (token) => {
  return async (dispatch) => {
    try {
      const user = await getUserDataService(token);
      const userData = {
        token,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      dispatch(fetchUserAction(userData));
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Optionally, dispatch an action to handle the error state
    }
  };
};

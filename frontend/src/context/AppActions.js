import axios from "axios";

// export const registerCall = async (userCredentials, dispatch) => {
//   dispatch({ type: "REGISTER_START" });
//   try {
//     const { data } = await axios.post("/api/auth/register", userCredentials);
//     dispatch({ type: "REGISTER_SUCCESS", payload: data });
//     localStorage.setItem("user", JSON.stringify(data));
//   } catch (err) {
//     dispatch({ type: "REGISTER_FAILED", payload: err.response });
//   }
// };

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const { data } = await axios.post("/api/auth/login", userCredentials);

    dispatch({ type: "LOGIN_SUCCESS", payload: data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILED", payload: err.response });
  }
};

export const Follow = (userId, dispatch) => {
  dispatch({ type: "FOLLOW", payload: userId });
};

export const Unfollow = (userId, dispatch) => {
  dispatch({ type: "UNFOLLOW", payload: userId });
};

export const logout = (dispatch) => {
  dispatch({ type: "LOGOUT" });
};

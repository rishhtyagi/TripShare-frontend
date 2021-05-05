import * as AT from "./authTypes";
import axios from "axios";

export const authenticateUser = (email, password) => {
  const credentials = {
    email: email,
    password: password,
  };
  console.log(email);
  console.log(password);
  return (dispatch) => {
    dispatch({
      type: AT.LOGIN_REQUEST,
    });
    axios
      .post("http://localhost:8085/user/authenticate", credentials)
      .then((response) => {
        console.log(JSON.stringify(response));
        let token = response.data.token;
        localStorage.setItem("jwtToken", token);
        dispatch(success(true));
      })
      .catch((error) => {
        dispatch(failure());
      });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: AT.LOGOUT_REQUEST,
    });
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("newtripId");
    dispatch(success(false));
  };
};

const success = (isLoggedIn) => {
  return {
    type: AT.SUCCESS,
    payload: isLoggedIn,
  };
};

const failure = () => {
  return {
    type: AT.FAILURE,
    payload: false,
  };
};

import * as actionTypes from "./actionTypes";
import axios from "axios";

export const resetSignUp = () => {
  return {
    type: actionTypes.RESET_SIGN_UP,
  };
};

export const signUpStart = () => {
  return {
    type: actionTypes.SIGN_UP_START,
  };
};

export const signUpSuccess = (token, userId) => {
  return {
    type: actionTypes.SIGN_UP_SEND,
    idToken: token,
    userId: userId,
  };
};

export const signUpSend = () => {
  return {
    type: actionTypes.SIGN_UP_SEND,
  };
};

export const signUpSendSuccess = (token, userId) => {
  return {
    type: actionTypes.SIGN_UP_SEND_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const signUpSendFail = () => {
  return {
    type: actionTypes.SIGN_UP_SEND_FAIL,
  };
};

export const signUpData = (userData, token) => {
  return (dispatch) => {
    dispatch(signUpSend());
    axios
      .post(
        "https://scholar-sheep.firebaseio.com/userdata.json?auth=" + token,
        userData
      )
      .then((response) => {
        dispatch(
          signUpSendSuccess(response.data.idToken, response.data.localId)
        );
      })
      .catch((error) => {
        dispatch(signUpSendFail(error));
      });
  };
};

export const signUpFail = (error) => {
  return {
    type: actionTypes.SIGN_UP_FAIL,
    error: error,
  };
};

export const signUp = (firstname, lastname, username, email, password) => {
  return (dispatch) => {
    dispatch(signUpStart());
    const userCredentials = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbEAqq9PukE2pnIfmfiXe7kGGD5X1aYCs";
    axios
      .post(url, userCredentials)
      .then((response) => {
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        dispatch(signUpSuccess(response.data.idToken, response.data.localId));
        const userData = {
          firstname: firstname,
          lastname: lastname,
          username: username,
          email: email,
          userId: response.data.localId,
          level: 0,
          dateJoined: Date().substring(4, 15),
        };
        dispatch(signUpData(userData, response.data.idToken));
      })
      .catch((error) => {
        dispatch(signUpFail(error.response.data.error));
      });
  };
};

export const setSignUpRedirectPath = (path) => {
  return {
    type: actionTypes.SET_SIGNUP_REDIRECT_PATH,
    path: path,
  };
};

import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchUserDataSuccess = (userData) => {
  return {
    type: actionTypes.FETCH_USER_DATA_SUCCESS,
    userData: userData[0],
  };
};

export const fetchUserDataFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_DATA_FAIL,
    error: error,
  };
};

export const fetchUserDataStart = () => {
  return {
    type: actionTypes.FETCH_USER_DATA_START,
  };
};

export const fetchUserData = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchUserDataStart());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("https://scholar-sheep.firebaseio.com/userdata.json" + queryParams)
      .then((response) => {
        const fetchedData = [];
        for (let key in response.data) {
          fetchedData.push({
            ...response.data[key],
            id: key,
          });
        }
        localStorage.setItem("username", fetchedData[0].username);
        dispatch(fetchUserDataSuccess(fetchedData));
      })
      .catch((error) => {
        dispatch(fetchUserDataFail(error));
      });
  };
};

export const fetchUserQuizzes = (token, userId) => {
  const queryParams =
    "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
  return (dispatch) => {
    dispatch(fetchUserQuizzesStart());
    axios
      .get("https://scholar-sheep.firebaseio.com/quizzes.json" + queryParams)
      .then((response) => {
        const fetchedData = [];
        for (let key in response.data) {
          fetchedData.push({
            ...response.data[key],
            id: key,
          });
        }
        dispatch(fetchUserQuizzesSuccess(fetchedData));
      })
      .catch((error) => {
        dispatch(fetchUserQuizzesFail(error));
      });
  };
};

export const updateUserDataSuccess = (userData) => {
  return {
    type: actionTypes.UPDATE_USER_DATA_SUCCESS,
    userData: userData,
  };
};

export const updateUserDataFail = (error) => {
  return {
    type: actionTypes.UPDATE_USER_DATA_FAIL,
    error: error,
  };
};

export const updateUserDataStart = () => {
  return {
    type: actionTypes.UPDATE_USER_DATA_START,
  };
};

export const updateUserData = (userData) => {
  return (dispatch) => {
    dispatch(updateUserDataStart());
    axios
      .put(
        "https://scholar-sheep.firebaseio.com/userdata/" +
          userData.id +
          ".json",
        userData
      )
      .then((response) => {
        dispatch(updateUserDataSuccess(response.data));
      })
      .catch((error) => {
        dispatch(updateUserDataFail(error));
      });
  };
};

export const fetchUserQuizzesSuccess = (quizzes) => {
  return {
    type: actionTypes.FETCH_USER_QUIZZES_SUCCESS,
    quizzes: quizzes,
  };
};

export const fetchUserQuizzesFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_QUIZZES_FAIL,
    error: error,
  };
};

export const fetchUserQuizzesStart = () => {
  return {
    type: actionTypes.FETCH_USER_QUIZZES_START,
  };
};

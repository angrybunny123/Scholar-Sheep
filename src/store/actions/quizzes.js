import * as actionTypes from "./actionTypes";
import axios from "../../axios-scholarsheep";

export const fetchQuizzesSuccess = (quizzes) => {
  return {
    type: actionTypes.FETCH_QUIZZES_SUCCESS,
    quizzes: quizzes,
  };
};

export const fetchQuizzesFail = (error) => {
  return {
    type: actionTypes.FETCH_QUIZZES_FAIL,
    error: error,
  };
};

export const fetchQuizzesStart = () => {
  return {
    type: actionTypes.FETCH_QUIZZES_START,
  };
};

export const fetchQuizzes = () => {
  return (dispatch) => {
    dispatch(fetchQuizzesStart());
    axios
      .get("/quizzes.json")
      .then((res) => {
        const fetchedQuizzes = [];
        for (let key in res.data) {
          fetchedQuizzes.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchQuizzesSuccess(fetchedQuizzes));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchQuizzesFail(err));
      });
  };
};

import * as actionTypes from "./actionTypes";
import axios from "../../axios-scholarsheep";

export const quizFilter = (quizzes) => {
  return {
    type: actionTypes.QUIZ_FILTER,
    quizzes: quizzes,
  };
};

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

export const quizStart = (quiz) => {
  console.log(quiz);
  return {
    type: actionTypes.QUIZ_START,
    quiz: quiz,
  };
};

export const submitQuizSuccess = (id, orderData) => {
  return {
    type: actionTypes.SUBMIT_QUIZ_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const submitQuizFail = (error) => {
  return {
    type: actionTypes.SUBMIT_QUIZ_FAIL,
    error: error,
  };
};

export const submitQuizStart = () => {
  return {
    type: actionTypes.SUBMIT_QUIZ_START,
  };
};

//more can be done here when a quiz is submitted
export const submitQuiz = (quiz, id) => {
  return (dispatch) => {
    dispatch(submitQuizStart());
    axios
      .put("/quizzes/" + id + ".json", quiz)
      .then((response) => {
        dispatch(submitQuizSuccess(response.data, quiz));
      })
      .catch((error) => {
        dispatch(submitQuizFail(error));
      });
  };
};

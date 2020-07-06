import * as actionTypes from "./actionTypes";
import axios from "../../axios-scholarsheep";

export const quizFilterStart = () => {
  return {
    type: actionTypes.QUIZ_FILTER_START,
  };
};

export const quizFilterSuccess = (quizzes) => {
  console.log(quizzes, "quiz filter success");
  return {
    type: actionTypes.QUIZ_FILTER_SUCCESS,
    quizzes: quizzes,
  };
};

export const quizFilter = (quizzes) => {
  return (dispatch) => {
    dispatch(quizFilterStart());
    axios.get("/quizzes.json").then((res) => {
      dispatch(quizFilterSuccess(quizzes));
    });
  };
};

export const quizSearch = (quizzes) => {
  return {
    type: actionTypes.QUIZ_SEARCH,
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
        dispatch(fetchQuizzesFail(err));
      });
  };
};

export const fetchDailyQuizSuccess = (quiz) => {
  return {
    type: actionTypes.FETCH_DAILY_QUIZ_SUCCESS,
    quiz: quiz,
  };
};

export const fetchDailyQuizFail = (error) => {
  return {
    type: actionTypes.FETCH_DAILY_QUIZ_FAIL,
    error: error,
  };
};

export const fetchDailyQuizStart = () => {
  return {
    type: actionTypes.FETCH_DAILY_QUIZ_START,
  };
};

export const fetchDailyQuiz = () => {
  return (dispatch) => {
    dispatch(fetchDailyQuizStart());
    axios
      .get("/dailyQuiz.json")
      .then((res) => {
        dispatch(fetchDailyQuizSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchDailyQuizFail(err));
      });
  };
};

export const quizStart = (quiz) => {
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
    //dailyquiz
    if (id === null) {
      axios
        .put("/dailyQuiz.json", quiz)
        .then((response) => {
          dispatch(submitQuizSuccess(response.data, quiz));
        })
        .catch((error) => {
          dispatch(submitQuizFail(error));
        });
    } else {
      axios
        .put("/quizzes/" + id + ".json", quiz)
        .then((response) => {
          dispatch(submitQuizSuccess(response.data, quiz));
        })
        .catch((error) => {
          dispatch(submitQuizFail(error));
        });
    }
  };
};

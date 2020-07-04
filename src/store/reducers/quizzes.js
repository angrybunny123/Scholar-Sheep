import * as actionTypes from "../actions/actionTypes";

const initialState = {
  quizzes: [],
  quizzesCopy: [],
  quizzesDisplayed: [],
  loading: false,
  error: "",
  currentQuiz: null,
  pageCount: null,
  dailyQuiz: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.QUIZ_FILTER:
      return {
        ...state,
        quizzesCopy: action.quizzes,
        quizzesDisplayed: action.quizzes,
      };
    case actionTypes.QUIZ_SEARCH:
      return {
        ...state,
        quizzesDisplayed: action.quizzes,
      };
    case actionTypes.FETCH_QUIZZES_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_QUIZZES_SUCCESS:
      return {
        ...state,
        quizzes: action.quizzes,
        quizzesCopy: action.quizzes,
        quizzesDisplayed: action.quizzes,
        error: "",
        loading: false,
        pageCount: action.pageCount,
      };
    case actionTypes.FETCH_QUIZZES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };
    case actionTypes.FETCH_DAILY_QUIZ_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_DAILY_QUIZ_SUCCESS:
      return {
        ...state,
        dailyQuiz: action.quiz,
        loading: false,
      };
    case actionTypes.FETCH_DAILY_QUIZ_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };
    case actionTypes.QUIZ_START:
      return {
        ...state,
        currentQuiz: action.quiz,
      };
    case actionTypes.SUBMIT_QUIZ_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SUBMIT_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        currentQuiz: null,
      };
    case actionTypes.SUBMIT_QUIZ_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };
    default:
      return state;
  }
};

export default reducer;

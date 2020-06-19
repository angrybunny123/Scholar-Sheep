import * as actionTypes from "../actions/actionTypes";

const initialState = {
  quizzes: [],
  loading: false,
  error: "",
  currentQuiz: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_QUIZZES_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_QUIZZES_SUCCESS:
      return {
        ...state,
        quizzes: action.quizzes,
        error: "",
        loading: false,
      };
    case actionTypes.FETCH_QUIZZES_FAIL:
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
        //can do more data here when data is posted!
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

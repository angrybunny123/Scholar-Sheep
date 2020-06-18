import * as actionTypes from "../actions/actionTypes";

const initialState = {
  quizzes: [],
  loading: false,
  error: "",
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
        loading: false,
      };
    case actionTypes.FETCH_QUIZZES_FAIL:
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

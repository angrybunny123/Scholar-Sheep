import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userData: [],
  loading: false,
  error: "",
  createdQuizzes: [],
  quizzesLoading: false,
  quizzesError: "",
};

const fetchUserDataStart = (state, action) => {
  return {
    ...state,
  };
};

const fetchUserDataSuccess = (state, action) => {
  return {
    ...state,
    userData: action.userData,
  };
};

const fetchUserDataFail = (state, action) => {
  return {
    ...state,
  };
};

const updateUserDataStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const updateUserDataFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error.message,
  };
};

const updateUserDataSuccess = (state, action) => {
  return {
    ...state,
    userData: action.userData,
    loading: false,
    error: "",
  };
};

const fetchUserQuizzesStart = (state, action) => {
  return {
    ...state,
    quizzesLoading: true,
  };
};

const fetchUserQuizzesFail = (state, action) => {
  return {
    ...state,
    quizzesLoading: false,
    quizzesError: action.error.message,
  };
};

const fetchUserQuizzesSuccess = (state, action) => {
  return {
    ...state,
    quizzesLoading: false,
    quizzesError: "",
    createdQuizzes: action.quizzes,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_DATA_START:
      return fetchUserDataStart(state, action);
    case actionTypes.FETCH_USER_DATA_SUCCESS:
      return fetchUserDataSuccess(state, action);
    case actionTypes.FETCH_USER_DATA_FAIL:
      return fetchUserDataFail(state, action);
    case actionTypes.UPDATE_USER_DATA_START:
      return updateUserDataStart(state, action);
    case actionTypes.UPDATE_USER_DATA_FAIL:
      return updateUserDataFail(state, action);
    case actionTypes.UPDATE_USER_DATA_SUCCESS:
      return updateUserDataSuccess(state, action);
    case actionTypes.FETCH_USER_QUIZZES_FAIL:
      return fetchUserQuizzesFail(state, action);
    case actionTypes.FETCH_USER_QUIZZES_SUCCESS:
      return fetchUserQuizzesSuccess(state, action);
    case actionTypes.FETCH_QUIZZES_START:
      return fetchUserQuizzesStart(state, action);

    default:
      return state;
  }
};

export default reducer;

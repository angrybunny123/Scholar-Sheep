import * as actionTypes from "../actions/actionTypes";

const initialState = {
    email: null,
    award1: null,
    award2: null,
    award3: null,
    quizhistory: null,
}

const initUserDetails = (state, action) => {
    return {
        ...state,
        email: action.email,
        award1: action.award1 !== null ? action.award1 : "Locked",
        award2: action.award2 !== null ? action.award2 : "Locked",
        award3: action.award3 !== null ? action.award3 : "Locked",
        quizhistory: action.quizhistory,
    }
}

const changeAward1 = (state, action) => {
    return {
        ...state,
        award1: action.award,
    }
}

const changeAward2 = (state, action) => {
    return {
        ...state,
        award1: action.award,
    }
}

const changeAward3 = (state, action) => {
    return {
        ...state,
        award1: action.award,
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.INIT_USER_DETAILS:
            return initUserDetails(state, action);
    default:
        return state;
    }
}

export default reducer;
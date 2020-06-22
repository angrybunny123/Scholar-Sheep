import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    path: '/',
};

const signUpStart = ( state, action ) => {
    return {
        ...state,
        error: null, 
        loading: true,
    };
};

const signUpSuccess = ( state, action ) => {
    return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
    };
}

const signUpFail = ( state, action ) => {
    return {
        ...state,
        error: action.error,
        loading: false,
    };
};

const signUpSend = ( state, action ) => {
    return {
        ...state,
        error: null, 
        loading: true,
    };
};

const signUpSendSuccess = ( state, action ) => {
    return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
    };
};

const signUpSendFail = ( state, action ) => {
    return {
        ...state,
        error: action.error, 
        loading: false,
    };
};

const setSignUpRedirectPath = (state, action) => {
    return {
        ...state,
        path: action.path,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGN_UP_START:
            return signUpStart(state, action);
        case actionTypes.SIGN_UP_SUCCESS:
            return signUpSuccess(state, action);
        case actionTypes.SIGN_UP_FAIL:
            return signUpFail(state, action);
        case actionTypes.SIGN_UP_SEND:
            return signUpSend(state, action);
        case actionTypes.SIGN_UP_SEND_SUCCESS:
            return signUpSendSuccess(state, action);
        case actionTypes.SIGN_UP_SEND_FAIL:
            return signUpSendFail(state, action);
        case actionTypes.SET_SIGNUP_REDIRECT_PATH:
            return setSignUpRedirectPath(state, action);
        default:
            return state;
    }
}

export default reducer;
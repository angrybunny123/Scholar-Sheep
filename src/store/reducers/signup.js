import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    signUpRedirectPath: '/'
};

const signUpStart = ( state, action ) => {
    return {
        ...state,
        error: null, 
    };
};

const signUpSuccess = ( state, action ) => {
    return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        error: null,
    };
}

const signUpFail = ( state, action ) => {
    return {
        ...state,
        error: action.error,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGN_UP_START:
            return signUpStart(state, action);
        case actionTypes.SIGN_UP_SUCCESS:
            return signUpSuccess(state, action);
        case actionTypes.SIGN_UP_FAIL:
            return signUpFail(state, action);
        default:
            return state;
    }
}

export default reducer;
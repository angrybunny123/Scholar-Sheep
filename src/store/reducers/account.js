import * as actionTypes from "../actions/actionTypes";

const initialState = {
    userData: [],
}

const fetchUserDataStart = (state, action) => {
    return {
        ...state,
    }
}

const fetchUserDataSuccess = (state, action) => {
    return {
        ...state,
        userData: action.userData,
    }
}

const fetchUserDataFail = (state, action) => {
    return {
        ...state,
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_USER_DATA_START:
            return fetchUserDataStart;
        case actionTypes.FETCH_USER_DATA_SUCCESS:
            return fetchUserDataSuccess;
        case actionTypes.FETCH_USER_DATA_FAIL:
            return fetchUserDataFail;
    default:
        return state;
    }
}

export default reducer;
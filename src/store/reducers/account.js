import * as actionTypes from "../actions/actionTypes";

const initialState = {
    token: null,
    displaypic: null, //put a generic photo
    error: null,
    quizhistory: null,
}

const getDisplayPic = (state, action) => {
    return {
        ...state,
        displaypic: action.displaypic,
    }
}

const reducer = (state = initialState, action) => {
    



}
import * as actionTypes from './actionTypes';
import axios from 'axios';
import { authSuccess } from './auth';

export const signUpStart = () => {
    return {
        type: actionTypes.SIGN_UP_START,
    };
};

export const signUpSuccess = (token, userId) => {
    return {
        type: actionTypes.SIGN_UP_SUCCESS,
        idToken: token,
        userId: userId,
    };
};

export const signUpFail = (error) => {
    return {
        type: actionTypes.SIGN_UP_FAIL,
        error: error,
    }
}

export const signUp = (firstname,
                       lastname,
                       username,
                       email,
                       password) => {
    return dispatch => {
        dispatch(signUpStart());
        const userCredentials = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbEAqq9PukE2pnIfmfiXe7kGGD5X1aYCs";
        axios.post(url, userCredentials)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem("token", response.data.idToken);
                localStorage.setItem("userId", response.data.localId);
                dispatch(signUpSuccess(response.data.idToken, response.data.localId));
                console.log(response.data.idToken);
            })
            .catch(error => {
                dispatch(signUpFail(error.response.data.error))
            });
        const userData = {
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                password: password,
            };
        axios.post( 'https://scholar-sheep.firebaseio.com/userdata.json', userData)
            .then( response => {
                console.log("sent over already");
            })
            .catch(error => {
                console.log("Something happened");
            });
    };
};

export const setSignUpRedirectPath = (path) => {
    return {
        type: actionTypes.SET_SIGNUP_REDIRECT_PATH,
        path: path,
    }
}
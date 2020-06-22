import * as actionTypes from "./actionTypes";
import axios from "axios";


export const fetchUserDataSuccess = (userData) => {
    return {
        type: actionTypes.FETCH_USER_DATA_SUCCESS,
        userData: userData,
    };
};

export const fetchUserDataFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_DATA_FAIL,
        error: error,
    }
}

export const fetchUserDataStart = () => {
    return {
        type: actionTypes.FETCH_USER_DATA_START,
    }
}

export const fetchUserData = (token, userId) => {
    return (dispatch) => {
        dispatch(fetchUserDataStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get("https://scholar-sheep.firebaseio.com/userdata.json" + queryParams)
             .then( response => {
                 console.log(response);
                 const fetchedData = [];
                 for (let key in response.data) {
                     fetchedData.push({
                         ...response.data[key],
                         id: key
                     });
                 }
                 dispatch(fetchUserDataSuccess(fetchedData));
             })
             .catch( error => {
                 dispatch(fetchUserDataFail(error));
             });
    };
};
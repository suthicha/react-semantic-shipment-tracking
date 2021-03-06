import * as actionTypes from './actionTypes';
import axios from '../../axios-local';
import { promiseTimeout } from '../../shared/utility';
import { successAlert, errorAlert } from './notificationAction';

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    }
};

export const signupSuccess = () => {
    return {
        type: actionTypes.SIGNUP_SUCCESS
    }
};

export const signupFail = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: error
    }
};

export const register = (user) => {
    return dispatch => {
        dispatch(signupStart());
        const promise = promiseTimeout(500, axios.post(`/user/signup`, user));
        
        promise.then(res => {
            dispatch(successAlert('Register','Your account was registered.'));
            dispatch(signupSuccess());
        })
        .catch(err => {
            dispatch(errorAlert('Register', err));
            dispatch(signupFail(err));
        });
    }
};




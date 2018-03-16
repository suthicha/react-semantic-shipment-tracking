import * as actionType from './actionTypes';
import axios from '../../axios-local';
import { promiseTimeout } from '../../shared/utility';

export const updateUserStart = () => {
    return { type: actionType.USER_UPDATE_START }
};

export const updateUserSuccess = () => {
    return { type: actionType.USER_UPDATE_SUCCESS}
};

export const updateUserFail = (error) => {
    return { type: actionType.USER_UPDATE_FAIL, error: error }
};

export const updateUser = (user) => {
    return dispatch => {
        dispatch(updateUserStart());
        const userId = localStorage.getItem('userId');
        const groupId = localStorage.getItem('groupId');
        const token = localStorage.getItem('token');

        const userData = {
            ...user,
            UserID: userId,
            UserGroupID: groupId
        };

        // Fix callback render user.
        const company = JSON.parse(localStorage.getItem('company'));
        dispatch({type: actionType.SETTINGS_LOAD_SUCCESS, user: userData, company: company})

        const promise = promiseTimeout(500, axios.post(`/user/${userId}?token=${token}`, userData));

        promise.then(res => {
            dispatch(updateUserSuccess());
        })
        .catch(err => {
            dispatch(updateUserFail(err));
        })
    }
};
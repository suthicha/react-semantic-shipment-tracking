import * as actionType from './actionTypes';
import axios from '../../axios-local';
import { promiseTimeout } from '../../shared/utility';
import { successAlert, errorAlert } from './notificationAction';

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

        dispatch({type: actionType.SETTINGS_LOAD_SUCCESS, user: userData})

        const promise = promiseTimeout(500, axios.post(`/user/${userId}?token=${token}`, userData));

        promise.then(res => {
            dispatch(successAlert('Account Settings', 'Update your account success.'));
            dispatch(updateUserSuccess());
        })
        .catch(err => {
            dispatch(errorAlert('Account Settings', err));
            dispatch(updateUserFail(err));
        })
    }
};
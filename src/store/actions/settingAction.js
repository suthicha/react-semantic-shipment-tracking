import * as actionType from './actionTypes';
import axios from '../../axios-local';
import { promiseTimeout } from '../../shared/utility';
import { successAlert, errorAlert } from './notificationAction';

export const loadSettingStart = () => {
    return { type: actionType.SETTINGS_LOAD_START }
};

export const loadSettingSuccess = (user) => {
    return {
        type: actionType.SETTINGS_LOAD_SUCCESS,
        user: user
    }
};

export const loadSettingFail = (error) => {
    return {
        type: actionType.SETTINGS_LOAD_FAIL,
        error: error
    }
};


export const loadSetting = () => {
    return dispatch => {
        dispatch(loadSettingStart());
        dispatch({type: actionType.USER_UPDATE_RESET});
        
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        let promise = promiseTimeout(500, axios.get(`/user/${userId}?token=${token}`));

        promise.then(res => {
            dispatch(successAlert('Account Settings', 'Your account information is ready.'));
            dispatch(loadSettingSuccess(res.data.user));
        })
        .catch(error => {
            dispatch(errorAlert('Account Settings', error));
            dispatch(loadSettingFail(error));
        })
    }
};


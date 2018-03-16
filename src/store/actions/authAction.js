import axios from '../../axios-local';
import jwtDecode from 'jwt-decode';
import * as actionTypes from './actionTypes';
import { promiseTimeout } from '../../shared/utility';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, userName, groupId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
        userName: userName,
        groupId: groupId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('groupId');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('jobs');
    localStorage.removeItem('trackingdata');

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout());
        }, expirationTime);
    }
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        
        const authData = {
            userId: email, 
            password: password
        };

        const promise = promiseTimeout(500, axios.post('/user/login', authData));
            
            promise.then(response => {
                
                if (response.status === 200){

                    const decoded = jwtDecode(response.data.token);
                    const expirationDate = new Date(decoded.exp * 1000);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', decoded.userId);
                    localStorage.setItem('userName', decoded.userName);
                    localStorage.setItem('groupId', decoded.groupId);
                    localStorage.setItem('expirationDate', expirationDate);

                    const current_time = new Date().getTime();
                    const expirationTime = expirationDate.getTime() - current_time;
                    dispatch(authSuccess(
                        {
                            token: response.data.token,
                            userId: decoded.userId,
                            userName: decoded.userName,
                            groupId: decoded.groupId
                        }));
                    dispatch(checkAuthTimeout(expirationTime));
                }
            })
            .catch(error => {
                dispatch(authFail(error));
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        
        if (!token){
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            
            if (expirationDate < new Date()){
                
                dispatch(logout());
            }else{
                const userId = localStorage.getItem('userId');
                const userName = localStorage.getItem('userName');
                const groupId = localStorage.getItem('groupId');

                const nextExpirationTime = expirationDate.getTime() - new Date().getTime();
                dispatch(authSuccess(token, userId, userName, groupId));
                dispatch(checkAuthTimeout(nextExpirationTime));
            }
        }
    }
};
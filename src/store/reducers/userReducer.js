import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    users: null,
    loading: false,
    isSuccess: false,
    resetPasswordProcessing: false,
    itemProcessing: false,
    error: null,
    itemError: null
};

const updateUserStart = (state, action) => {
    return updateObject(state, { loading: true, isSuccess: false, error: null })
};

const updateUserSuccess = (state, action) => {
    return updateObject(state, { loading: false, isSuccess: true })
};

const updateUserFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error })
};

const resetUserUpdate = (state, action) => {
    return updateObject(state, initialState )
};

const selectUserStart = (state, action) => {
    return updateObject(state, { loading: true, error: null })
};

const selectUserSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        users: action.users
    })
};


const selectUserFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error })
};

const resetUserPasswordStart = (state, action) => {
    return updateObject(state, { 
        resetPasswordProcessing: true, 
        isSuccess: false, 
        itemError: null
    })
};

const resetUserPasswordSuccess = (state, action) => {
    return updateObject(state, {
        resetPasswordProcessing: false,
        isSuccess: true, 
        itemError: null 
    })
};

const resetUserPasswordFail = (state, action) => {
    return updateObject(state, { 
        resetPasswordProcessing: false,
        isSuccess: false, 
        itemError: action.error 
    })
};

const adminUpdateUserStart = (state, action) => {
    return updateObject(state, { itemError: null })
};

const adminUpdateUserSuccess = (state, action) => {
    return updateObject(state, { itemError: null })
};

const adminUpdateUserFail = (state, action) => {
    return updateObject(state, { itemError: action.error })
};

const adminDeleteUserStart = (state, action) => {
    return updateObject(state, { itemProcessing: true, itemError: null })
};

const adminDeleteUserSuccess = (state, action) => {
    return updateObject(state, { itemProcessing: false, itemError: null })
};

const adminDeleteUserFail = (state, action) => {
    return updateObject(state, { itemProcessing: false, itemError: action.error })
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.USER_UPDATE_START: return updateUserStart(state, action);
        case actionType.USER_UPDATE_SUCCESS: return updateUserSuccess(state, action);
        case actionType.USER_UPDATE_FAIL: return updateUserFail(state, action);
        case actionType.USER_UPDATE_RESET: return resetUserUpdate(state, action);
        case actionType.USER_SELECT_START: return selectUserStart(state, action);
        case actionType.USER_SELECT_SUCCESS: return selectUserSuccess(state, action);
        case actionType.USER_SELECT_FAIL: return selectUserFail(state, action);
        case actionType.USER_RESET_PASSWORD_START: return resetUserPasswordStart(state, action);
        case actionType.USER_RESET_PASSWORD_SUCCESS: return resetUserPasswordSuccess(state, action);
        case actionType.USER_RESET_PASSWORD_FAIL: return resetUserPasswordFail(state, action);
        case actionType.ADMIN_UPDATE_USER_START: return adminUpdateUserStart(state, action);
        case actionType.ADMIN_UPDATE_USER_SUCCESS: return adminUpdateUserSuccess(state, action);
        case actionType.ADMIN_UPDATE_USER_FAIL: return adminUpdateUserFail(state, action);
        case actionType.ADMIN_DELETE_USER_START: return adminDeleteUserStart(state, action);
        case actionType.ADMIN_DELETE_USER_SUCCESS: return adminDeleteUserSuccess(state, action);
        case actionType.ADMIN_DELETE_USER_FAIL: return adminDeleteUserFail(state, action);
        default:
            return state;
    }
};

export default reducer;
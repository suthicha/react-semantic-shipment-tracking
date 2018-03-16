import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    isSuccess: false,
    error: null
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.USER_UPDATE_START: return updateUserStart(state, action);
        case actionType.USER_UPDATE_SUCCESS: return updateUserSuccess(state, action);
        case actionType.USER_UPDATE_FAIL: return updateUserFail(state, action);
        case actionType.USER_UPDATE_RESET: return resetUserUpdate(state, action);
        default:
            return state;
    }
};

export default reducer;
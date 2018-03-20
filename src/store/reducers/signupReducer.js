import * as actionTypes from '../../store/actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    isSuccess: false,
    loading: false,
    error: null
};

const signupStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};

const signupSuccess = (state, action) => {
    return updateObject(state, {
        isSuccess: true, 
        error: null, 
        loading: false})
};

const signupFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false});
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SIGNUP_INIT: return initialState;
        case actionTypes.SIGNUP_START: return signupStart(state, action);
        case actionTypes.SIGNUP_SUCCESS: return signupSuccess(state, action);
        case actionTypes.SIGNUP_FAIL: return signupFail(state, action);
        default:
            return state;
    }
}

export default reducer;

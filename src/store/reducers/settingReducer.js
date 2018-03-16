import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    user: null,
    company: null,
    error: null
};


const loadSettingStart = (state, action) => {
    return updateObject(state, {
        loading: true, 
        error: null
    })
};

const loadSettingSuccess = (state, action) => {
    return updateObject(state, {
        loading: false, 
        user: action.user, 
        company: action.company}
    )
};

const loadSettingFail = (state, action) => {
    return updateObject(state, {loading: false, error: action.error})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SETTINGS_LOAD_START: return loadSettingStart(state, action);
        case actionType.SETTINGS_LOAD_SUCCESS: return loadSettingSuccess(state, action);
        case actionType.SETTINGS_LOAD_FAIL: return loadSettingFail(state, action);
        default:
            return state;
    }
};

export default reducer;
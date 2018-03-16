import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    company: null,
    error: null,
};

const reducerCompanyStart = (state, action) => {
    return updateObject(state, { loading: true, error: null })
};

const reducerCompanyFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error })
};

const reducerCompanySuccess = (state, action) => {
    return updateObject(state, { 
        loading: false
    })
};

const fetchCompanySuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        company: action.company
    })
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.COMPANY_INSERT_START: return reducerCompanyStart(state, action);
        case actionType.COMPANY_UPDATE_START: return reducerCompanyStart(state, action);
        case actionType.COMPANY_DELETE_START: return reducerCompanyStart(state, action);
        case actionType.COMPANY_FETCH_START: return reducerCompanyStart(state, action);
        case actionType.COMPANY_INSERT_FAIL: return reducerCompanyFail(state, action);
        case actionType.COMPANY_UPDATE_FAIL: return reducerCompanyFail(state, action);
        case actionType.COMPANY_DELETE_FAIL: return reducerCompanyFail(state, action);
        case actionType.COMPANY_FETCH_FAIL: return reducerCompanyFail(state, action);
        case actionType.COMPANY_INSERT_SUCCESS: return reducerCompanySuccess(state, action);
        case actionType.COMPANY_UPDATE_SUCCESS: return reducerCompanySuccess(state, action);
        case actionType.COMPANY_DELETE_SUCCESS: return reducerCompanySuccess(state, action);
        case actionType.COMPANY_FETCH_SUCCESS: return fetchCompanySuccess(state, action);
        default:
            return state;
    }
};

export default reducer;
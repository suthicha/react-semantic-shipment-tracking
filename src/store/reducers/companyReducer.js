import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    reqComplete: false,
    company: null,
    error: null,
    isNewItem: false,
};

const reducerCompanyFail = (state, action) => {
    return updateObject(state, { loading: false, reqComplete: false, error: action.error })
};

const reducerCompanySuccess = (state, action) => {
    return updateObject(state, { 
        loading: false,
        company: null
    })
};

const fetchCompanyStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        company: null,
        error: null
    })
};

const fetchCompanySuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        company: action.company
    })
};

const additemCompanyStart = (state, action) => {
    return updateObject(state, { isNewItem: false })
};

const additemCompanySuccess = (state, action) => {
    return updateObject(state, { isNewItem: true })
};

const insertCompanyStart = (state, action) => {
    return updateObject(state, { loading: true, reqComplete: false, error: null })
};

const insertCompanySuccess = (state, action) => {
    return updateObject(state, { 
        loading: false,
        isNewItem: false,
        reqComplete: true
    });
}

const updateCompanyStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    })
};

const updateCompanySuccess = (state, action) => {
    return updateObject(state, {
        loading: false
    })
};

const updateCompanyFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
};

const deleteCompanyStart = (state, action) => {
    return updateObject(state, { loading: false, error: null})
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.COMPANY_INSERT_START: return insertCompanyStart(state, action);
        case actionType.COMPANY_UPDATE_START: return updateCompanyStart(state, action);
        case actionType.COMPANY_DELETE_START: return deleteCompanyStart(state, action);
        case actionType.COMPANY_FETCH_START: return fetchCompanyStart(state, action);
        case actionType.COMPANY_INSERT_FAIL: return reducerCompanyFail(state, action);
        case actionType.COMPANY_UPDATE_FAIL: return updateCompanyFail(state, action);
        case actionType.COMPANY_DELETE_FAIL: return reducerCompanyFail(state, action);
        case actionType.COMPANY_FETCH_FAIL: return reducerCompanyFail(state, action);
        case actionType.COMPANY_INSERT_SUCCESS: return insertCompanySuccess(state, action);
        case actionType.COMPANY_UPDATE_SUCCESS: return updateCompanySuccess(state, action);
        case actionType.COMPANY_DELETE_SUCCESS: return reducerCompanySuccess(state, action);
        case actionType.COMPANY_FETCH_SUCCESS: return fetchCompanySuccess(state, action);
        case actionType.COMPANY_ADDITEM_START: return additemCompanyStart(state, action);
        case actionType.COMPANY_ADDITEM_SUCCESS: return additemCompanySuccess(state, action);
        default:
            return state;
    }
};

export default reducer;

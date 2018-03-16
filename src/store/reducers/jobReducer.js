import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    jobs: null,
    error: null
};

const jobQueryStart = (state, action) => {
    return updateObject(state, {loading: true, jobs: null, error: null})
};

const jobQuerySuccess = (state, action) => {
    return updateObject(state, {loading: false, jobs: action.jobs})
};

const jobQueryFail = (state, action) => {
    return updateObject(state, {loading: false, error: action.error})
};

const jobFilterStart = (state, action) => {
    return updateObject(state, {loading: true, jobs: null, error: null})
};

const jobFilterSuccess = (state, action) => {
    return updateObject(state, {loading: false, jobs: action.jobs})
};

const jobFilterFail = (state, action) => {
    return updateObject(state, {loading: false, error: action.error})
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionType.JOB_FILTER_START: return jobFilterStart(state, action);
        case actionType.JOB_FILTER_SUCCESS: return jobFilterSuccess(state, action);
        case actionType.JOB_FILTER_FAIL: return jobFilterFail(state, action);
        case actionType.JOB_QUERY_START: return jobQueryStart(state, action);
        case actionType.JOB_QUERY_SUCCESS: return jobQuerySuccess(state, action);
        case actionType.JOB_QUERY_FAIL: return jobQueryFail(state, action);
        default: 
            return state;
    }
};

export default reducer;
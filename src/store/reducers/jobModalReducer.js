import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    showModal: false,
    job: null,
    saving: false,
    saveJobStatus: false
};

const jobModalStart = (state, action) => {
    return updateObject(state, {showModal: true, job: null, saveJobStatus: false })
};

const jobModalSuccess = (state, action) => {
    return updateObject(state, {showModal: false, job: action.job})
};

const jobTsPoolUpdateStart = (state, action) => {
    return updateObject(state, {saving: true, saveJobStatus: false, error: null})  
};

const jobTsPoolUpdateSuccess = (state, action) => {
    return updateObject(state, {saving: false, saveJobStatus: true})
};

const jobTsPoolUpdateFail = (state, action) => {
    return updateObject(state, {saving: false, saveJobStatus: false, error: action.error})
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionType.JOB_MODAL_START: return jobModalStart(state, action);
        case actionType.JOB_MODAL_SUCCESS: return jobModalSuccess(state, action);
        case actionType.JOB_TSPOOL_UPDATE_START: return jobTsPoolUpdateStart(state, action);
        case actionType.JOB_TSPOOL_UPDATE_SUCCESS: return jobTsPoolUpdateSuccess(state, action);
        case actionType.JOB_TSPOOL_UPDATE_FAIL: return jobTsPoolUpdateFail(state, action);
        default:
            return state;
    }
};

export default reducer;
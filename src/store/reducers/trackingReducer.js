import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    shipments: null,
    loading: false,
    error: null
};

const trackingSearchStart = (state, action) => {
    return updateObject(state, { loading: true, shipments:null, error: null})
}

const trackingSearchSuccess = (state, action) => {
    return updateObject(state, { loading: false, shipments: action.shipments})
}

const trackingSearchFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.TRACKING_SEARCH_START: return trackingSearchStart(state, action);
        case actionTypes.TRACKING_SEARCH_SUCCESS: return trackingSearchSuccess(state, action);
        case actionTypes.TRACKING_SEARCH_FAIL: return trackingSearchFail(state, action);
        default:
            return state;
    }
}

export default reducer;
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: null,
    error: null,
    loading: false
};

const fetchOrdersStart = (state, action) => {
    return updateObject(state, { error: null, loading: true});
};

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false,
        error: null
    });
};

const fetchOrdersFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false});
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.ORDERS_FAIL: return fetchOrdersFail(state, action);
        default:
            return state;
    }
};

export default reducer;


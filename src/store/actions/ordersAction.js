import * as actionTypes from './actionTypes';
import axios from '../../axios-local';
import { promiseTimeout } from '../../shared/utility';

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.ORDERS_START
    }
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.ORDERS_FAIL,
        error: error
    }
};

export const fetchOrders = (refno) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const token = localStorage.getItem('token');
        const promise = promiseTimeout(500, axios.get(`/order/${refno}?token=${token}`));

        promise.then(response => {
            localStorage.setItem('orders', JSON.stringify(response.data));
            dispatch(fetchOrdersSuccess(response.data));
        })
        .catch(error => {
            dispatch(fetchOrdersFail(error));
        })
    }
}

export const fetchOrdersFromState = () => {
    return dispatch => {
        const orders = localStorage.getItem('orders');
        dispatch(fetchOrdersSuccess(orders));
    }
}
import * as actionTypes from './actionTypes';
import axios from '../../axios-local';
import { promiseTimeout } from '../../shared/utility';
import { successAlert, errorAlert } from './notificationAction';

export const trackingSearchStart = () => {
    return {
        type: actionTypes.TRACKING_SEARCH_START
    }
}

export const trackingSearchSuccess = (data, refno) => {
    return {
        type: actionTypes.TRACKING_SEARCH_SUCCESS,
        shipments: data,
        refno: refno
    }
}

export const trackingSearchFail = (error) => {
    return {
        type: actionTypes.TRACKING_SEARCH_FAIL,
        error: error
    }
}

export const tracking = (refno) => {
    return dispatch => {
        dispatch(trackingSearchStart());
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');  

        const promise = promiseTimeout(500, axios.get(`/tracking/${userId}/${refno}?token=${token}`));

        promise.then(res => {
            // localStorage.setItem('shipments', JSON.stringify(res.data.shipments));
            dispatch(trackingSearchSuccess(res.data.shipments, refno));
            dispatch(successAlert('Tracking', 'Found ' + refno));
            
        })
        .catch(error => {
            dispatch(errorAlert('Tracking', error));
            error.refno = refno;
            dispatch(trackingSearchFail(error));
        })
        
    }
}

export const fetchTrackingFromState = () => {
    return dispatch => {
        dispatch(trackingSearchStart());
        setTimeout(()=> {
            try {
                dispatch(trackingSearchSuccess(null));
            }catch(e){}
            
        }, 500);
    }
}

import * as actionTypes from './actionTypes';
import axios from '../../axios-local';
import { promiseTimeout } from '../../shared/utility';

export const trackingSearchStart = () => {
    return {
        type: actionTypes.TRACKING_SEARCH_START
    }
}

export const trackingSearchSuccess = (data) => {
    return {
        type: actionTypes.TRACKING_SEARCH_SUCCESS,
        trackingdata: data
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

        promise.then(response => {
            const table = response.data[0];
            localStorage.setItem('trackingdata', JSON.stringify(table));
            dispatch(trackingSearchSuccess(table));
            
        })
        .catch(error => {
            dispatch(trackingSearchFail(error));
        })
        
    }
}

export const fetchTrackingFromState = () => {
    return dispatch => {
        dispatch(trackingSearchStart());
        setTimeout(()=> {
            try {
                const trackingdata = JSON.parse(localStorage.getItem('trackingdata'));
                dispatch(trackingSearchSuccess(trackingdata));
            }catch(e){}
            
        }, 500);
    }
}

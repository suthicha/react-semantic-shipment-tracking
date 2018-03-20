import * as actionType from './actionTypes';
import axios from '../../axios-local';
import { promiseTimeout, formatDateToString } from '../../shared/utility';
import { successAlert, errorAlert } from './notificationAction';

export const jobQueryStart = () => {
    return {
        type: actionType.JOB_QUERY_START
    }
};

export const jobQuerySuccess = (jobs) => {
    return {
        type: actionType.JOB_QUERY_SUCCESS,
        jobs: jobs
    }
};

export const jobQueryFail = (error) => {
    return {
        type: actionType.JOB_QUERY_FAIL,
        error: error
    }
};

export const jobFilterStart = () => {
    return {
        type: actionType.JOB_FILTER_START
    }
};

export const jobFilterSuccess = (jobs) => {
    return {
        type: actionType.JOB_FILTER_SUCCESS,
        jobs: jobs
    }
};

export const jobFilterFail = (error) => {
    return {
        type: actionType.JOB_FILTER_FAIL,
        error: error
    }
};

export const jobQuery = (etd, refno) => {
    return dispatch => {
        dispatch(jobQueryStart());
        const token = localStorage.getItem('token');
        const period = formatDateToString(etd,'');
        
        let promise = promiseTimeout(500, axios.get(`/jobs/${period}?token=${token}`));
        
        if(refno){
            promise = promiseTimeout(500, axios.get(`/jobs/${period}/${refno}?token=${token}`));            
        }

        promise.then(res => {
            
            if (res.status === 200){    
                promise = promiseTimeout(100, axios.get(`/bookings/etd/${etd}?token=${token}`));
                promise.then(cb => {
                    const jobs = res.data.jobs;
                    if (cb.data.bookings && cb.data.bookings.length > 0){
                        const bookings = cb.data.bookings;
                        for (let i = 0; i < bookings.length; i++) {
                            const bkgItem = bookings[i];
                            const index = jobs.findIndex((job) => job.TrxNo === bkgItem.RefId);
                            const updateBooking = {...jobs[index], ...bkgItem};
                            jobs[index] = updateBooking;
                        }
                    }
                    localStorage.setItem('jobs', JSON.stringify(jobs));
                    dispatch(successAlert('Booking', 'Load booking success.'));
                    dispatch(jobQuerySuccess(jobs));
                });
            }
        }).catch(err => {
            dispatch(errorAlert('Booking', err));
            dispatch(jobQueryFail(err));
        })
    }
};


export const jobFilter = (refno) => {
    return dispatch => {
        dispatch(jobFilterStart());
        if (refno === ""){
            const jobs = JSON.parse(localStorage.getItem('jobs'));
            dispatch(jobFilterSuccess(jobs));
        } else {
            var filterAction = (job)=>{
                return job.JobNo.includes(refno) || 
                job.BookingNo.includes(refno) ||
                job.MasterJobNo.includes(refno) ||
                job.OBL.includes(refno) ||
                job.MotherVessel.includes(refno) ||
                job.CustomerName.includes(refno);
            }
            const jobs = JSON.parse(localStorage.getItem('jobs'));
            const resJobs = jobs.filter(filterAction);
            dispatch(jobFilterSuccess(resJobs));
        }
    }
};

export const fetchJobFromState = () => {
    return dispatch => {
        dispatch(jobFilterStart());
        try{
            const jobs = JSON.parse(localStorage.getItem('jobs'));
            setTimeout(()=>{
                dispatch(jobFilterSuccess(jobs));
            },500);
        }catch(e){}
    }
};

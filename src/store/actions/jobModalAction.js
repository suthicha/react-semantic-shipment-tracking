import * as actionType from './actionTypes';
import axios from '../../axios-local';
import { promiseTimeout, formatDateToString } from '../../shared/utility';

export const jobModalStart = () => {
    return {
        type: actionType.JOB_MODAL_START
    }
};

export const jobModalSuccess = (job) => {
    return {
        type: actionType.JOB_MODAL_SUCCESS,
        job: job
    }
};

export const openJobModal = (job) => {
    return dispatch => {
        dispatch(jobModalStart());
        setTimeout(()=>{
            dispatch(jobModalSuccess(job));
        },500);
    }
};


export const saveJobToTSPool = (job) => {
    return dispatch => {
        dispatch({type: actionType.JOB_TSPOOL_UPDATE_START});
        const curdate = new Date();
        const curdateFormat = formatDateToString(curdate,'');

        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const { TrxNo } = job;
        const jobOrder = {...job};

        const arrivalDate = formatDateToString(jobOrder.ArrivalDate,'');
        const departureDate = formatDateToString(jobOrder.DepartureDate,'');
        const deliveryDate = formatDateToString(jobOrder.DeliveryDate,'');

        jobOrder.RefId = TrxNo;
        jobOrder.UserID = userId;
        jobOrder.UpdateBy = '';

        if (jobOrder.ShipmentStatus){
            jobOrder.RefId = job.RefId;
            jobOrder.UpdateBy = userId;            
        }

        jobOrder.ArrivalDate = arrivalDate;
        jobOrder.DepartureDate = departureDate;
        jobOrder.DeliveryDate = deliveryDate;
        jobOrder.CreateDateTime = curdateFormat;
        jobOrder.UpdateDateTime = curdateFormat;
        jobOrder.ShipmentStatus= 'A';

        const promise = promiseTimeout(500, axios.post(`/bookings?token=${token}`, jobOrder));

        promise.then(res => {
            
            if (res.status === 201){
                dispatch({type: actionType.JOB_QUERY_START});

                let jobs = JSON.parse(localStorage.getItem('jobs'));
                const refId = jobOrder.ShipmentStatus  === 'A'? jobOrder.TrxNo: jobOrder.RefId;
                const index =jobs.findIndex(job => job.TrxNo === refId);
                
                if (index >= 0){
                    const updateBooking = {...jobs[index], ...jobOrder};
                    updateBooking.ArrivalDate = job.ArrivalDate;
                    updateBooking.DepartureDate = job.DepartureDate;
                    updateBooking.DeliveryDate = job.DeliveryDate;
                    jobs[index] = updateBooking;
                }
                
                dispatch({type: actionType.JOB_TSPOOL_UPDATE_SUCCESS});

                localStorage.setItem('jobs', JSON.stringify(jobs));
                
                setTimeout(()=>{
                    dispatch({type: actionType.JOB_QUERY_SUCCESS, jobs: jobs});
                },200);
                
            }
        })
        .catch(error => {
            dispatch({
                type: actionType.JOB_TSPOOL_UPDATE_FAIL, 
                error: error
            });
        })

    }
};
import * as actionType from './actionTypes';
import axios from '../../axios-local';
import { promiseTimeout } from '../../shared/utility';

export const insertCompanyStart = () => {
    return { type: actionType.COMPANY_INSERT_START }
};

export const insertCompanySuccess = () => {
    return { 
        type: actionType.COMPANY_INSERT_SUCCESS
    }
};

export const insertCompanyFail = (error) => {
    return {
        type: actionType.COMPANY_INSERT_FAIL,
        error: error
    }
};

export const updateCompanyStart = () => {
    return { type: actionType.COMPANY_UPDATE_START }
};

export const updateCompanySuccess = () => {
    return { 
        type: actionType.COMPANY_UPDATE_SUCCESS
    }
};

export const updateCompanyFail = (error) => {
    return { 
        type: actionType.COMPANY_UPDATE_FAIL,
        error: error
    }
};

export const deleteCompanyStart = () => {
    return { 
        type: actionType.COMPANY_DELETE_START
    }
};

export const deleteCompanySuccess = () => {
    return { 
        type: actionType.COMPANY_DELETE_SUCCESS
    }
};

export const deleteCompanyFail = (error) => {
    return {
        type: actionType.COMPANY_DELETE_FAIL,
        error: error
    }
};

export const fetchCompanyStart = () => {
    return { type: actionType.COMPANY_FETCH_START }
};

export const fetchCompanySuccess = (data) => {
    return { 
        type: actionType.COMPANY_FETCH_SUCCESS,
        company: data
    }
};

export const fetchCompanyFail = (error) => {
    return {
        type: actionType.COMPANY_FETCH_FAIL,
        error: error
    }
};

export const insertCompany = (data) => {
    return dispatch => {
        dispatch(updateCompanyStart());
        const token = localStorage.getItem('token');
        const promise = promiseTimeout(500, axios.put(`/company?token=${token}`, data));

        promise.then(res => {

            dispatch(updateCompanySuccess());
            fetchCompany();

        })
        .catch(err => {
            dispatch(updateCompanyFail(err));
        })
    }
};

export const updateCompany = (data) => {
    return dispatch => {
        dispatch(updateCompanyStart());
        const token = localStorage.getItem('token');
        const promise = promiseTimeout(500, axios.post(`/company/${data.CmpID}?token=${token}`, data));

        promise.then(res => {

            let company = JSON.parse(localStorage.getItem('company'));
            const index =company.findIndex(cmp => cmp.CmpID === data.CmpID);
            if (index >= 0){
                const updateCompany = {...company[index], ...data};
                company[index] = updateCompany;
            }
        
            localStorage.setItem('company', JSON.stringify(company));
            dispatch(updateCompanySuccess());
            dispatch(fetchCompanySuccess(company));
            
        })
        .catch(err => {
            dispatch(updateCompanyFail(err));
        })
    }
};

export const deleteCompany = (data) => {
    return dispatch => {
        dispatch(deleteCompanyStart());
        const token = localStorage.getItem('token');
        const promise = promiseTimeout(500, axios.delete(`/company/${data.CmpID}?token=${token}`, data));

        promise.then(res => {

            let company = JSON.parse(localStorage.getItem('company'));
            const updateCompany = company.filter(cmp => cmp.CmpID !== data.CmpID);
            localStorage.setItem('company', updateCompany);
            
            dispatch(deleteCompanySuccess());
            dispatch(fetchCompanySuccess(updateCompany));

        })
        .catch(err => {
            dispatch(deleteCompanyFail(err));
        })
    }
};

export const fetchCompany = () => {
    return dispatch => {
        dispatch(fetchCompanyStart());
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        
        const promise = promiseTimeout(500, axios.get(`/company/${userId}?token=${token}`));
            promise.then(res => {
                localStorage.setItem('company', JSON.stringify(res.data.company));
                dispatch(fetchCompanySuccess(res.data.company));
            })
            .catch(err => {
                dispatch(fetchCompanyFail(err));
            });
    }
};
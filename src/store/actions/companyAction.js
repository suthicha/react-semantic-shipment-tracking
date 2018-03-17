import * as actionType from './actionTypes';
import axios from '../../axios-local';
import { promiseTimeout, guid } from '../../shared/utility';

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
        dispatch(insertCompanyStart());
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        const companyItem = {
            CmpID: data.idValue,
            CmpName: data.nameValue,
            CmpTaxNo: data.taxnoValue,
            CmpBranch: data.branchValue,
            UserID: userId
        };

        let company = JSON.parse(localStorage.getItem('company'));
        const index =company.findIndex(cmp => cmp.CmpID === companyItem.CmpID);
        const promise = promiseTimeout(500, axios.put(`/company?token=${token}`, companyItem));

        promise.then(res => {
            if (index >= 0){
                const updateCompany = {...company[index], ...res.data.company[0], ItemType: null};
                company[index] = updateCompany;
            }

            localStorage.setItem('company', JSON.stringify(company));
            dispatch(fetchCompanySuccess(company));
            dispatch(insertCompanySuccess());
           
        })
        .catch(err => {
            if (index >= 0){
                const updateCompany = {...company[index], ...companyItem, ItemType: 'NEW', error: err};
                company[index] = updateCompany;
            }
            localStorage.setItem('company', JSON.stringify(company));
            dispatch(fetchCompanySuccess(company));
            dispatch(insertCompanyFail(err));
        })
    }
};

export const updateCompany = (data) => {
    return dispatch => {
        dispatch(updateCompanyStart());
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        const companyItem = {
            CmpID: data.idValue,
            CmpName: data.nameValue,
            CmpTaxNo: data.taxnoValue,
            CmpBranch: data.branchValue,
            UserID: userId
        };

        let company = JSON.parse(localStorage.getItem('company'));
        const index =company.findIndex(cmp => cmp.CmpID === companyItem.CmpID);
        const promise = promiseTimeout(500, axios.post(`/company/${companyItem.CmpID}?token=${token}`, companyItem));

        promise.then(res => {

            if (index >= 0){
                const updateCompany = {...company[index], ...companyItem};
                updateCompany.error = null;
                company[index] = updateCompany;
            }
        
            localStorage.setItem('company', JSON.stringify(company));
            dispatch(updateCompanySuccess());
            dispatch(fetchCompanySuccess(company));
            
        })
        .catch(err => {

            if (index >= 0){
                const oldCompany = company[index];
                const updateCompany = {...company[index], 
                    ...companyItem, 
                    oldValue: {...oldCompany},
                    error: err};
                company[index] = updateCompany;
            }
            localStorage.setItem('company', JSON.stringify(company));

            dispatch(updateCompanyFail(err));
            dispatch(fetchCompanySuccess(company));
            
        })
    }
};

export const deleteCompany = (data) => {
    return dispatch => {
        dispatch(deleteCompanyStart());
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const delCompany = (cmp)=> {
            let company = JSON.parse(localStorage.getItem('company'));
            return company.filter(q => q.CmpID !== cmp.CmpID);
        }

        const companyItem = {
            CmpID: data.idValue,
            UserID: userId
        };

        if (data.itemType){
            
            const delItemFromCompany = delCompany(companyItem);
            localStorage.setItem('company', JSON.stringify(delItemFromCompany));
            dispatch(deleteCompanySuccess());
            dispatch(fetchCompanySuccess(delItemFromCompany));
            
        }else {
            
            const promise = promiseTimeout(500, axios.delete(`/company/${userId}/${companyItem.CmpID}?token=${token}`));

            promise.then(res => {

                const delItemAfterCompanyRESTful = delCompany(companyItem);
                localStorage.setItem('company', JSON.stringify(delItemAfterCompanyRESTful));
                dispatch(deleteCompanySuccess());
                dispatch(fetchCompanySuccess(delItemAfterCompanyRESTful));

            })
            .catch(err => {
                dispatch(deleteCompanyFail(err));
            })
        }
        
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

export const addCompanyItem = () => {
    return dispatch => {
        dispatch({type: actionType.COMPANY_ADDITEM_START});
        const userId = localStorage.getItem('userId');
        const randNumber = Math.floor(Math.random() * 99999) + Math.floor(Math.random());
        let company = JSON.parse(localStorage.getItem('company'));

        let newItem = {
            CmpID: randNumber * (-1),
            CmpName: '',
            CmpTaxNo: '',
            CmpBranch: '',
            UserID: userId,
            ItemType: 'NEW',
            RefKey: guid(),
            error: null,
            triggerValue: null,
            oldValue: null
        };

        company.push(newItem);
        localStorage.setItem('company', JSON.stringify(company));
        dispatch(fetchCompanySuccess(company));
        dispatch({type: actionType.COMPANY_ADDITEM_SUCCESS });
    }
};

export const fetchCompanyFromCache = (refkey) => {
    return dispatch => {
        dispatch(fetchCompanyStart());
        let company = JSON.parse(localStorage.getItem('company'));

        for(var i=0; i < company.length;i++){
            if (company[i].oldValue){
                const oldValue = company[i].oldValue;
                const fields = Object.keys(oldValue);
                for(var j=0; j < fields.length; j++){
                    const fieldName = fields[j];
                    company[i][fieldName]= oldValue[fieldName];
                }
                company[i].oldValue=null;
                company[i].error=null;
                company[i].triggerValue = true;
            }
        };

        const index = company.findIndex(q=> q.ItemType === 'NEW' && q.RefKey === refkey);
        
        company.splice(index,1);

        localStorage.setItem('company', JSON.stringify(company));
        dispatch(fetchCompanySuccess(company));

    }
};
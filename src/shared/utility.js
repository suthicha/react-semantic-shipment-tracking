export const updateObject = (oldObject, updateProperties) => {
    return {
        ...oldObject,
        ...updateProperties
    };
};

export const promiseTimeout = (ms, promise) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            promise.then(resp => { resolve(resp)}).catch(err => { reject(err)});
        },ms);
    })
};


export const getFirstDayOfMonth = (space) => {
    const pad = (n) => {
        return  (n.toString().length < 2) ? "0" + n : n;
    }
    const date      = new Date();
    const yearObj   = date.getFullYear();
    const monthObj  = date.getMonth() + 1;
    return yearObj + space + pad(monthObj) + space + '01';
}

export const formatDateToString = (date, space) => {
    date = new Date(date);
    const pad = (n) => {
        return  (n.toString().length < 2) ? "0" + n : n;
    }
    const yearObj   = date.getFullYear();
    const monthObj  = date.getMonth() + 1;
    const dayObj = date.getDate();
    return yearObj + space + pad(monthObj) + space + pad(dayObj);
}

export const guid = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};

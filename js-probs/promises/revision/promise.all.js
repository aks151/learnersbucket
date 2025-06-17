/* promise.all() takes in a list of promises and resolve all of it and returns a new promise that resolves to s list of resolved values. */

const promiseAll = (promiseList) => {
    let res = [];
    let resolveCount = 0;

    return new Promise((resolve, reject) => {
        promiseList.forEach((ele, indx) => {
            Promise.resolve(ele).then((val) => {
                res.push(val);
                resolveCount++;

                if(resolveCount === promiseList.length){
                    resolve(res);
                }
            }).catch((error) => {
                reject(error);
            })
        })
    })
}
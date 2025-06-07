// Promise.all polyfill

const promiseAll = (promiseList) => {
    let resList = [];
    let resolveCount = 0;
    return new Promise((resolve, reject) => {
        promiseList.forEach((ele, indx) => {
            ele.then((res) => {
                resList[indx] = res;
                resolveCount++;

                 if(resolveCount === promiseList.length){
                resolve(resList);
            }
            }).catch((error) => {
                console.log("error", error );
                reject(error);
            })
        })
    })
}

// test cases - 
//all promises resolve

const func1 = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {resolve(time)}, time);   /* an important concept to take note of, the callback func inside setTimout expects a func definition and not a func invocation. */
    })
}
const taskList = [func1(1000), func1(2000), func1(3000)]

const res = promiseAll(taskList).then(res => console.log(res));

// console.log(res);
/* returns all the elemenets resolved/rejected! */

const allSettled = (promiseList) => {
    let res = [];
    let count = 0;

    return new Promise((resolve) => {
        promiseList.forEach((ele, indx) => {
            Promise.resolve(ele).then((val) => {
                const obj = {
                    status: "fulfilled",
                    value: val
                }
                res[indx] = obj;
            }).catch((error) => {
                const obj = {
                    status: "rejected",
                    reason: error
                }
                res[indx] = obj;
            }).finally(() => {
                count++;
                if(count === promiseList.length){
                    resolve(res);
                }
            })

            
        })

    })
}


const allSettledMap = (promiseList) => {
    const newList = promiseList.map((ele) => {
        return Promise.resolve(ele).then((val) => {
            return {
                status: 'fulfilled', value: val
            }
        })
        .catch((error) => {
            return { "status": 'rejected', reason: error }
        })
    })

    return Promise.all(newList);
}


// input
const a = new Promise((resolve) => setTimeout(() => { resolve(3) },200));
const b = new Promise((resolve,reject) => reject(9));
const c = new Promise((resolve) => resolve(5));

allSettledMap([a, b, c]).then((val) => {
    console.log(val);
})

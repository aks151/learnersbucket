/* 
promise.race polyfill

it should resolve in pending state forever according to mdn, in case of empty list of promise
*/

const promiseRace = (promiseList) => {
    
    return new Promise((myResolve, myReject) => {
        promiseList.forEach((promiseEle) => {
            Promise.resolve(promiseEle).then((val) => {
                myResolve(val);
            }).catch((error) => {
                myReject(error);
            })
        })
    })
}

/* more polished version for the above code to look like SDE2 level */

const race = (promiseList) => {
    return new Promise((myResolve, myReject) => {
        promiseList.forEach((ele) => {
            Promise.resolve(ele).then(myResolve, myReject);
        })
    })

}


const test1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'one');
  });
  
  const test2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 100, 'two');
  });
  
  const test3 = new Promise(function (resolve, reject) {
    setTimeout(reject, 200, 'three');
  });

  race([test1, test2, test3]).then(function (value) {
    // first two resolve, 3rd fails, but promise2 is faster
    console.log(value);
  }).catch(function (err){
    console.log(err);
  });
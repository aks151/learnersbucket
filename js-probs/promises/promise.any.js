/*
    the resolve part would be the same,
    the challenge here is to handle reject part
*/


const promiseAny = (promiseList) => {
    let errorCount = 0;
    let errorList = [];
    if(!promiseList || typeof promiseList[Symbol.iterator] !== 'function'){  // Edge Case
        return Promise.reject("Provide a valid iterator");
    }
    return new Promise((myResolve, myReject) => {
        promiseList.forEach((ele, indx) => {
            Promise.resolve(ele)
            .then(myResolve)
            .catch((error) => {
                errorCount++;
                errorList[indx] = error;

                if(errorCount === promiseList.length){
                    // myReject("Aggregate Error"); -> not the right way to return aggregate error
                    /* aggregate error is a special type of error designed to represent multiple errors in a single object. */                    
                   myReject( AggregateError(errorList, "All promises were rejected") )
                }
            });
        })
    })
}


const test1 = new Promise(function (resolve, reject) {
    setTimeout(reject, 500, 'one');
  });
  
  const test2 = new Promise(function (resolve, reject) {
    setTimeout(reject, 600, 'two');
  });
  
  const test3 = new Promise(function (resolve, reject) {
    setTimeout(reject, 200, 'three');
  });
  


  promiseAny([test1, test2, test3]).then(function (value) {
    // first and third fails, 2nd resolves
    console.log(value);
  }).catch(function (err){
    console.log(err);
  });
  
  
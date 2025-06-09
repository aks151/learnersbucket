/* retries a promise n number of time with delay between each call */

/* what does it means delay between each call - is it there to give time for call to resolve/reject? */


const retryPromise = ( promise, n) => {
    let failCount = 0;

    return new Promise((myResolve, myReject) => {
         Promise.resolve(promise).then((val) => {
            myResolve(val);
    }).catch((error) => {
        failCount++;
        if(failCount < n){
            setTimeout(1000);
            retryPromise(n, promise);
        } else {
            myReject(error + "retried for " + n + " times and still failed");
        }
    })
    })

   
}


const getTestFunc = () => {
  let callCounter = 0;
  return async () => {
    callCounter += 1;
    // if called less than 5 times
    // throw error
    if (callCounter < 5) {
      throw new Error('Not yet');
    }
  }
}

// Test the code
const test = async () => {
  await retryPromise(getTestFunc(), 10);
  console.log('success');
  await retryPromise(getTestFunc(), 3);
  console.log('will fail before getting here');
}

test().catch(console.error);
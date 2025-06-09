/* executing promises in series - learnable */

/* tests understanding of async control flow */

/* approach - 1: recursion */



const seriesExecRecursive = (promiseList) => {

    return new Promise((resolve, reject) => {
    const n = promiseList.length;
    let res = [];
    let index = 0;


})
}


const asyncTask = function(i) {
    return function(callback){
      setTimeout(() => {
        callback(`Completing ${i}`)
      }, 100*i);
    };
  }
  
  const tasks = [
    asyncTask(3),
    asyncTask(1),
    asyncTask(7),
    asyncTask(2),
    asyncTask(5),
  ];

  seriesExecRecursive(tasks).then(val => console.log(val))
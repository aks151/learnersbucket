const promisePriority = (promiseList) => {
    let maxPriority = -1, resSoFar;
    promiseList.forEach(({task, priority}, indx) => {
        Promise.resolve(task).then((val) => {
            if(priority > maxPriority){
                maxPriority = priority;
                resSoFar = val;
            }
        })
    })
}

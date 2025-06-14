/* 
while throttling requests, if a high priority api call ccomes
*/

// const throttle = (fn, throttleTime) => {
//     let inThrottle = false;

//     return function(...args) {
//         if(!inThrottle){

//         const context = this;
//         fn.apply(context, args);

//         inThrottle = true;

//         setTimeout(() => {
//             inThrottle = false;
//         }, throttleTime)
//     }

//     }

// }

/* method-1 for priority api */

const priorityApiCall1 = async () => {
    await fetch('https://bored-api.appbrewery.com/random')
    await fetch('https://bored-api.appbrewery.com/random', {
        priority: 'high'
    })
}

/* method 2: microtask queue */

const priorityApiCall2 = () => {
    let callback = () => {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => console.log(json))
      }
      let callback2 = () => {
        fetch('https://jsonplaceholder.typicode.com/todos/2')
        .then(response => response.json())
        .then(json => console.log(json))
      }
      let urgentCallback = () => {
        fetch('https://jsonplaceholder.typicode.com/todos/3')
        .then(response => response.json())
        .then(json => console.log(json))
      }

    setTimeout(callback, 0);
    setTimeout(callback2, 10);
    queueMicrotask(urgentCallback);
}



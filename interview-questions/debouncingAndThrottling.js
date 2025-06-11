/* 
both are to limit the count of function execution based on different situations

debouncing - a function runs after a certain delay from the time it was last run

throttling - a function runs atmost once in a given period of time

*/


const debouncing = (fn, time, ...args) => {

    setInterval(fn.apply(...args), time);



}

const throttling = () => {

}
/* 
both are to limit the count of function execution based on different situations

debouncing - a function runs after a certain delay from the time it was last run

throttling - a function runs atmost once in a given period of time

*/

//  throttle is being called once in a given time period
// args - function to be throttled, args, timeperiod
// throttle(time, fn, arg1, arg2, arg3, arg4)

// const throttle = (timespan,fn, ...args) => {
//     //have to call function only once in timespan, so will simply wait for timespan and then just run it????? hmnm looks like it

//     setTimeout()
// }



/*debounce - execute a function after a delay, like call search-api only after some amount of time once the user the user has stopped typing, calculate the layout after sometime,
when the user has resized the window, autosave - auto save after sometime from the time user has stopped typing   */


// <input class = "searchBar" placeholder = "Search information" id = "searchInput"> 

const callSearchApi = () => {
    const searchInput = document.getElementById("something");


}

// const debounceSearch  = debounce(callSearchApi, 500)

// so we are interested in creating a debounced version of a given function, hmmmm


const debounce = (fn, timeDelay) => {
    let timeoutId;

    return function(...args) {
        const context = this;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(context, args);
        }, timeDelay);
    }
}

/*  */

const throttle = (fn, cooldownTime) => {
    let inThrottle = false;

    return function(...args) {
        if(inThrottle){
            return;
        }
        const context = this;

        fn(context, cooldownTime);

        setTimeout(() => {
            inThrottle = true;
        })
    }

}
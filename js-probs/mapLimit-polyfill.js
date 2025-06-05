//implement a mapLimit() function similar to the Array.map() function.

const arr1 = [1, 2, 3, 4, 5];

// arr1.map((ele, indx) => console.log("hanji ", indx, " pe ",ele  ));

arr1.map().then((ele, indx) => console.log("hanji ", indx, " pe ", ele));


/*

Implement a mapLimit function that is similar to the Array.map() which returns a promise that resolves on the list of 
output by mapping each input through an asynchronous iteratee function or rejects it if any error occurs. It also accepts 
a limit to decide how many operations can occur at a time.

*/
/* flow:
array.map takes an iterator function and applies it to each of the element
*/

const mapLimit = (func) => {
    // i will have to call a function
}
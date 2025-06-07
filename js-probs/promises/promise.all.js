// Promise.all polyfill

/* edge cases: 
1. if the promiseList being passed to Promise.all() is empty -> Promise.resolve([])

2. if not all the elements of promise list is a promise ->  Promise.resolve(one_promise_element_from_the_list) instead of doing
one_promise_element_from_the_list.then() - this will break the implementation
*/

const promiseAll = (promiseList) => {
    let resList = [];
    let resolveCount = 0;

    return new Promise((resolve, reject) => {
        promiseList.forEach((ele, indx) => {
            ele.then((res) => {
                resList[indx] = res;
                resolveCount++;

                 if(resolveCount === promiseList.length){
                resolve(resList);
            }
            }).catch((error) => {
                console.log("error", error );
                reject(error);
            })

        })
    })
}

// test cases - 
//all promises resolve

const func1 = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {resolve(time)}, time);   /* an important concept to take note of, the callback func inside setTimout expects a func definition and not a func invocation. */
    })
}
const taskList = [func1(1000), func1(2000), func1(3000)]

const res = promiseAll(taskList).then(res => console.log(res));

// console.log(res);



/* 

gemini -> 
This is an absolutely fantastic question, and your polyfill implementation is very well done. It correctly handles the main logic. Your question about the promisesCompleted counter gets to the very heart of why Promise.all is a non-trivial problem.

Let's break it down.

The Core Problem: Asynchronicity and Order

The key challenge is this: You do not know the order in which the promises will resolve.

Imagine you give Promise.all three tasks:

task(100): Finishes in 100ms.

task(300): Finishes in 300ms.

task(200): Finishes in 200ms.

Even though you pass them in the order [task(100), task(300), task(200)], the JavaScript engine runs them concurrently. They will finish in this order:

task(100) completes first.

task(200) completes second.

task(300) completes last.

Your polyfill needs to handle two things simultaneously:

Preserve Order: The final resolved array must be [100, 300, 200], matching the input order, not the completion order.

Know When to Finish: It must only resolve the main promise when all of the input promises are done.

Your code correctly solves #1 by using results[index] = val;. This places the result in the correct slot, regardless of when it finishes.

The promisesCompleted counter is the solution to #2.

Why The Counter is Essential

The counter's only job is to answer the question: "Are we done yet?"

Let's trace your code with our example: [task(100), task(300), task(200)].

Start: myPromiseAll is called. The forEach loop starts. All three promises begin their timers.

results = []

promisesCompleted = 0

taskList.length = 3

After ~100ms: task(100) resolves.

Its .then() callback runs.

results[0] = 100. Now results looks like [100].

promisesCompleted becomes 1.

The check: if (1 === 3) is false. The function does nothing else. It correctly waits.

After ~200ms: task(200) resolves.

Its .then() callback runs.

results[2] = 200. Now results looks like [100, <1 empty item>, 200].

promisesCompleted becomes 2.

The check: if (2 === 3) is false. The function correctly continues to wait.

After ~300ms: task(300) resolves.

Its .then() callback runs.

results[1] = 300. Now results is [100, 300, 200].

promisesCompleted becomes 3.

The check: if (3 === 3) is true. The condition is met!

resolve(results) is called. The main promise is fulfilled with the correctly ordered array.

Without the counter, there would be no reliable way to know when the last promise has finished.

"Can't I just check results.length?"

This is a common follow-up thought. Let's see why it's a trap.

What if you replaced if (promisesCompleted === taskList.length) with if (results.length === taskList.length)?

Let's re-run our trace:

After ~100ms: task(100) resolves. results[0] = 100. results.length is 1. The check 1 === 3 is false. So far, so good.

After ~200ms: task(200) resolves. Here's the problem.

results[2] = 200 is executed.

Because you are assigning to index 2, JavaScript pads the array. The results array is now [100, <empty>, 200].

What is results.length? It is 3!

The check: if (3 === 3) is true.

Your function would call resolve([100, undefined, 200]) prematurely, before task(300) has even finished. This is a bug.

The counter reliably tracks the number of promises that have actually resolved, while the array's length can be misleading.

SDE2 Level: Edge Cases

For an SDE2 role, interviewers will expect you to think about edge cases. Your current code has one subtle bug.

What happens if taskList is an empty array []?

myPromiseAll([]) is called.

taskList.forEach is called on an empty array, so the loop never runs.

The promise constructor new Promise(...) has been called, but neither resolve nor reject will ever be reached.

Result: Your promise will remain pending forever.

The Correct Behavior: According to the spec, Promise.all([]) should resolve immediately with an empty array [].

The Fix: You should add a check at the very beginning of your function.

function myPromiseAll(taskList) {
  // Handle the edge case of an empty iterable
  if (!taskList || taskList.length === 0) {
    return Promise.resolve([]);
  }
  
  const results = [];
  let promisesCompleted = 0;

  return new Promise((resolve, reject) => {
    // ... rest of your code is perfect
    taskList.forEach((promise, index) => {
      // It's also good practice to handle non-promise values
      Promise.resolve(promise).then((val) => { // This line makes it more robust
        results[index] = val;
        promisesCompleted += 1;
        
        if (promisesCompleted === taskList.length) {
          resolve(results);
        }
      })
      .catch(error => {
        reject(error);
      });
    });
  });
}


(Note: I added Promise.resolve(promise) which makes the polyfill even more robust, as the real Promise.all can handle an array of mixed promises and regular values, like [task(100), 42])

Summary for your interview prep

When asked about your Promise.all polyfill:

The Counter (promisesCompleted): "I use a counter to reliably track when all promises have fulfilled. Because promises resolve asynchronously, I cannot rely on the order of execution. The counter is the only way to know when the final promise has completed, allowing me to resolve the main outer promise."

The Index (results[index]): "To ensure the output array maintains the same order as the input array, I use the index from the forEach loop to place each result in its correct position. This decouples the completion order from the final output order."

The results.length Trap: "I specifically avoid checking results.length because assigning to a high index in a JavaScript array can create a 'sparse' array, making the length property an unreliable indicator of completion and leading to premature resolution."

Edge Cases: "I also handle the edge case of an empty input array by resolving immediately with an empty array, matching the native Promise.all behavior."

*/



/* promise.then vs Promise.resolve(promise).then

gemini 2.5 pro

Excellent follow-up question. Understanding the difference between Promise.resolve(value) and the new Promise() constructor is a sign of a deeper mastery of Promises.

Let's break it down into the core concepts.

Concept 1: The Job of new Promise()

Job: To create a new promise and give you the tools (resolve, reject) to manually control its state from within an asynchronous operation.

Think of the new Promise() constructor as a "wrapper" or "adapter". You use it when you have an asynchronous API that is not already promise-based (like setTimeout, old-school callbacks, or event listeners) and you want to make it behave like a promise.

// You are "promisifying" setTimeout
const wait = (ms) => {
  // 1. Create a NEW, pending promise
  return new Promise((resolve, reject) => {
    // 2. Start some async work (that itself isn't a promise)
    setTimeout(() => {
      // 3. Manually resolve the promise when the work is done
      resolve(`Waited ${ms}ms`); 
    }, ms);
  });
};


In short: Use new Promise() when you need to create a promise from a non-promise async action.

Concept 2: The Job of Promise.resolve()

Job: To take any value and return a promise that is already resolved with that value. It's a "converter" or "normalizer".

Its primary power lies in how it handles different types of input:

If you give it a non-Promise value: It returns a new promise that is immediately fulfilled with that value.

const p1 = Promise.resolve(42);
// p1 is a promise that is already resolved with the value 42.
// p1.then(val => console.log(val)); // logs 42 almost instantly
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
JavaScript
IGNORE_WHEN_COPYING_END

If you give it a Promise: It simply returns that exact same promise. It does not create a new one. This is the key behavior for your Promise.all polyfill.

const originalPromise = new Promise(resolve => setTimeout(() => resolve('done'), 100));
const p2 = Promise.resolve(originalPromise);

// p2 IS the originalPromise. They are the same object in memory.
console.log(p2 === originalPromise); // true
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
JavaScript
IGNORE_WHEN_COPYING_END

If you give it a "thenable" (an object with a .then method): It "unwraps" the thenable into a genuine promise. This is more of an advanced interoperability feature.

In short: Use Promise.resolve() when you want to ensure you are working with a promise, regardless of whether the input value is already a promise or just a plain value.

Applying this to your Promise.all Polyfill

Let's look at the two options side-by-side.

Your Original Code:

taskList.forEach((promise, index) => {
  promise.then(...) // Assumes 'promise' is always a promise
});
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
JavaScript
IGNORE_WHEN_COPYING_END

The More Robust Code:

taskList.forEach((promise, index) => {
  Promise.resolve(promise).then(...) // Ensures we are working with a promise
});
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
JavaScript
IGNORE_WHEN_COPYING_END

Why is the second one better?

The native Promise.all method is designed to be very flexible. You can give it an array of mixed values:

const p1 = new Promise(res => setTimeout(() => res('First'), 100));
const p2 = 200; // Not a promise!
const p3 = new Promise(res => setTimeout(() => res('Third'), 50));

Promise.all([p1, p2, p3]).then(results => {
  console.log(results); // After ~100ms, logs: ['First', 200, 'Third']
});
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
JavaScript
IGNORE_WHEN_COPYING_END

The native Promise.all handles this perfectly. How? Internally, it does exactly what Promise.resolve() does: it normalizes every item in the input array to be a promise.

Now let's see how your two polyfill versions would handle [p1, p2, p3]:

Your Original Polyfill (promise.then(...))

For p1: p1.then(...) works perfectly.

For p2 (which is the number 200): It tries to run 200.then(...). This will immediately throw a TypeError: 200.then is not a function, breaking your entire myPromiseAll function.

The Robust Polyfill (Promise.resolve(promise).then(...))

For p1: Promise.resolve(p1) just returns p1. The code then calls p1.then(...). Perfect.

For p2 (the number 200): Promise.resolve(200) returns a new promise that is already resolved with the value 200. The code then calls .then() on this new promise. The .then() callback executes immediately, storing 200 in the results array. Perfect.

Summary: The Key Mental Model
Tool	Purpose	When to Use	Analogy
new Promise(executor)	Wrapping / Creation	To convert a callback-based async operation into a promise. You are creating a new state machine.	Building a brand new car from parts. You get the engine (resolve) and brakes (reject) to install yourself.
Promise.resolve(value)	Normalizing / Conversion	To guarantee you have a promise, whether the input is a promise, a thenable, or a plain value.	A universal car key. If you give it a car (Promise), it's ready to go. If you give it a scooter (value), it instantly gives you a car (new Promise) with the scooter in the trunk.

By using Promise.resolve(item) at the start of your loop, you make your polyfill behave exactly like the robust, flexible native method, which is a hallmark of high-quality, professional code.

*/




/* 
Promise.resolve() returns an already resolved value if the parameter inside resolve isn't a promise, and it returns the same promsie 
if the parameter inside is a promsie already.

*/
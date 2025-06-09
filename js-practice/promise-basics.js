/*
Simple Delayed Message:

Create a function delayedMessage(message, delay) that returns a Promise.
This Promise should resolve with the given message after delay milliseconds.
Use setTimeout to achieve the delay.
Test it by calling delayedMessage("Hello World", 2000) and logging the resolved message.

 */


const delayedMessage = (message, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(reject, delay, message);
    })
}

delayedMessage("hello hello", 1000).then(console.log)
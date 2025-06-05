/*
analytics sdk
n%5 delay

 */

// const sleep = () => {
//     return new Promise(resolve => setTimeout(resolve, 5000));
// }

// new Promise((resolve, reject) => {
//     if(true)
//     {
//         resolve()
//     } else {
//         reject("reject ho gya");
//     }
// }).then(shout => console.log("kehndi" + shout))

class analyticsSDK {
    constructor() {
        this.queue = []

        this.count = 1;
    }

    logEvent = () => {

    }

    
}
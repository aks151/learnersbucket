 const limit = 4;

 const sum = (...args) => {

    if(args.length === 0) return 0;
    let storage = [...args];

    if(storage.length === limit){
        const sum = storage.reduce((currSum, ele) => {
            return ele + currSum;
        }, 0);
        return sum;
    } else {
        const temp = function(...args2){
            storage = [...storage, ...args2];
            if(storage.length === limit){
                const sum = storage.reduce((currSum, ele) => {
                    return ele + currSum;
                }, 0);
                return sum;
            } else {
                return temp;
            }
        }

        return temp;
    }
 }

 const res = sum(1, 2, 3, 4);
const res2 = sum(1)(2)(3)(4);
const res3 = sum(1, 2)(3, 4);
const res4 = sum(1, 2, 3)(4);
const res5 = sum();

console.log(res, res2, res3, res4, res5);
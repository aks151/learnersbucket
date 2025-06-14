// take a nested function with obj and then do things

const pipe = (obj) => {
    return function(...args) {
        for(let key in obj){
            if(typeof obj[key] === 'function'){
                obj[key] = obj[key](...args);
            } else {
                pipe(obj[key])(...args);
            }
        }

        return obj

    }
}



let test = {
    a: {
        b: (a, b, c) => a + b + c,
        c: (a, b, c) => a + b - c,
    },
    d: (a, b, c) => a - b - c,
    e: 1,
    f: true
};

console.log(pipe(test)(1, 1, 1));

/* Output:
{
  "a": {
    "b": 3,
    "c": 1
  },
  "d": -1,
  "e": 1,
  "f": true
}
 */

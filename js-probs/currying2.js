// sum(1)(2)(3) - 6

const sum = (a, b, c, d) => {
    return a + b + c + d;
}


const curry = (...args) => {
    const par = [...args]
}


const currySum = curry(sum);


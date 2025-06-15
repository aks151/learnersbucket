const curry = () => {
    let cumRes = 0;
    return function(val = 0){
        cumRes += val;
        return cumRes;
    }
}


let sum = curry();

console.log(sum(5)); //5
console.log(sum(3)); //8
console.log(sum(4)); //12
console.log(sum(0)); //12
console.log(sum()); //12
const fn = () => {
    console.log("bakchodi goli ho ho ho ho");
}

const sampler = (func, count) => {
let countLocal = 0;

return () => {
    if(((++countLocal) % count) == 0){
        func();

    }
}
}

const sample = sampler(fn, 4)
sample();
sample();
sample();
sample();
sample();
sample();
sample();
sample();

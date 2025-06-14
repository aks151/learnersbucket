const pipe = (...funcList) => {

    return function(val) {
        for(let func of funcList) {
            val = func(val)
        }

        return val;
    }

}

const getSalary = (person) => person.salary
const addBonus = (netSalary) => netSalary + 1000;
const deductTax = (grossSalary) => grossSalary - (grossSalary * .3);

const val = { salary: 10000 };

const result = pipe(
  getSalary,
  addBonus,
  deductTax 
)({ salary: 10000 });

console.log(result);
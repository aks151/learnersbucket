// const mergeShallow = ( obj1, obj2, deep = false) => {
//     return {...obj1, ...obj2} // shallow
// }
// let dummyObj = {}
// Object.assign(dummyObj, obj1, obj2)



// const mergeDeep = (obj1, obj2) => {
//   let finalObj = {}
//   for(let val in obj1){
//     if(typeof obj1[val] !== Object){

//       finalObj[val] = obj1[val];

//     } else {
//       // this will have repetation of values and  
//       if(Object.prototype.hasOwnProperty.call(obj1, key)){
//         finalObj[val] = {
//           ...finalObj[val], ...obj1[val]
//         }
//       } else {
//         finalObj[val] = obj1[val];
//       }
//     }
//   }

// }

/* deep merge will take a recursive function, right right */
const isObj = (val) => {

  if(val && typeof val === 'object' && !Array.isArray(val)){
    return true;
  }

}
const deepMerge = (target, ...sources) => {

  if(sources.length === 0){
    return target;
  } 
  const obj = sources.shift();

    if(isObj(target) && isObj(obj)) {
      for(let val in obj) {

        if(isObj(obj[val])){
          if(!target[val]){
            target[val] = {};
          }
          deepMerge(target[val], obj[val]);
        } else {
          target[val] = obj[val];
        }

      }
    }

return deepMerge(target, ...sources);
}

const mergeObj = (target, ...sources) => {



}

const baseObj = {
  name: 'Alice',
  id: 1,
  isActive: true,
  details: {
    theme: 'dark',
    notifications: {
      email: true,
      sms: false
    }
  },
  roles: ['admin']
};

const updates1 = {
  isActive: false,
  details: {
    language: 'en',
    notifications: {
      sms: true,
      push: true
    }
  }
};

const updates2 = {
  name: 'Alice Smith',
  roles: ['editor', 'viewer']
};

let deep =  deepMerge({}, baseObj, updates1);
console.log("deepMerge 2311: ", deep);

// let obj1 = {
//     name: 'prashant',
//     age: 23,
//     nature: {
//       "helping": true,
//       "shy": false
//     }
//   }
  
//   let obj2 = {
//     qualification: 'BSC CS',
//     loves: 'Javascript',
//     nature: {
//       "angry": false,
//       "shy": true
//     }
//   }

// console.log(mergeShallow(obj1, obj2));
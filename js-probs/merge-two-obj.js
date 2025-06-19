const mergeShallow = ( obj1, obj2, deep = false) => {
    return {...obj1, ...obj2} // shallow
}



const mergeDeep = (obj1, obj2) => {
  let finalObj = {}
  for(let val in obj1){
    if(typeof obj1[val] !== Object){

      finalObj[val] = obj1[val];

    } else {
      // this will have repetation of values and  
      if(Object.prototype.hasOwnProperty.call(obj1, key)){
        finalObj[val] = {
          ...finalObj[val], ...obj1[val]
        }
      } else {
        finalObj[val] = obj1[val];
      }
    }
  }

}

let obj1 = {
    name: 'prashant',
    age: 23,
    nature: {
      "helping": true,
      "shy": false
    }
  }
  
  let obj2 = {
    qualification: 'BSC CS',
    loves: 'Javascript',
    nature: {
      "angry": false,
      "shy": true
    }
  }

console.log(mergeShallow(obj1, obj2));
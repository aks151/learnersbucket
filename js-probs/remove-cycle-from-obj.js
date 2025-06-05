// Input:
// const List = function(val){
//   this.next = null;
//   this.val = val;
// };

// const item1 = new List(10);
// const item2 = new List(20);
// const item3 = new List(30);

// item1.next = item2;
// item2.next = item3;
// item3.next = item1;

// // this form a cycle, if you console.log this you will see a circular object, 
// // like, item1 -> item2 -> item3 -> item1 -> so on.

// Output:
// // removes cycle
// // item1 -> item2 -> item3


// will have a list of objects

const obj1 = {
    val: 3, 
    next: null
}

const obj2 = {
    val: 4, 
    next: null
}

const obj3 = {
    val: 5, 
    next: null
}

obj1.next = obj2
obj2.next = obj3
obj3.next = obj1


const objList = []
objList.push(obj1)
objList.push(obj2)
objList.push(obj3)

console.log("***************************************")
console.log("initial list of objects: ", objList);

const breakCycle = () => {

    // i need something like a map/hashtable to get this job done
    //had it been cpp, the job would have been done, but since it is js, i can just think of brute force ways of getting this done, like like like, ummm
    // obj of objects, 
    /* 
    {
    obj1: true,
    obj2: true,
    obj3: true
    }
     */
    const objMap = {};
    objList.forEach((obj) => {
        if(objMap[obj.next] === true){
            obj.next = null;
        }

        objMap[obj] = true;

    })
    console.log("objList after iteration: ", objList )
}
breakCycle()


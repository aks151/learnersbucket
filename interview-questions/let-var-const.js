/* 
a quick revision 

while discussing let vs var vs const, the main points of discussions are: scope, hoisting, re-declaration, re-assign

var is function scope, which means it's available within the function anywhere, where it is defined.
let, const block scope, only available within the block of code where it is defined, let re-assign, no redeclare; const no redeclare and noassign
arrrays and objects defined using const are not immutable, their references can't be changed only;

var hoisted and initialized with undefined

let, const hoisted and not intialized

temporal dead zone. 

*/
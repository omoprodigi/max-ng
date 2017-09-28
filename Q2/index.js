function getElements(item) {
    let newSet = [];
    if(!item.constructor === Array){
        newSet.push(item);
    } else if(item.length === 1 && !(item[0].constructor === Array)){
        newSet.push(item[0]);
    } else {
        for(let sub of item){
             newSet.push(...getElements(sub));
        }
    }
    return newSet;
}
var arr = ['a', ['b'], ['c', [ ['d'] ], 'e'], 'f'];
console.log(getElements(arr));

// Considerations
// The Array contains either single elements or arrays
// Child arrays might contain only one element
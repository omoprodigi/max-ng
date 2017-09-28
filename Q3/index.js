function reverseAndPrepend(array){
    return array.slice().reverse().concat(array);
}

console.log(reverseAndPrepend([ 1, 2, 3, 4, 5 ]));
const validColors = 'abcdefghijklm';

function printerError(input) {
    let invalid = 0;
    for(let char of [...input]){
        if (!validColors.includes(char))
            invalid++;
    }
    return `${invalid}/${[...input].length}`
}

var res = printerError('aaaxbbbbyyhwawiwjjjwwm');
console.log(res);
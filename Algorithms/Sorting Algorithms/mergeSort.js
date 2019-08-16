function merge(array1, array2) {
    console.log(array1.join(" "));
    console.log(array2.join(" "));
    if(array1.length == 0)
        return array2;
    if(array2.length == 0)
        return array1;
    if(array1[0] < array2[0]) {
        array1.shift();
        return Array.prototype.concat(array1[0], merge(array1, array2));
    }
    else{
        array2.shift();
        return Array.prototype.concat(array2[0],merge(array1,array2));
    }

}

function mergeSort(_array) {
    alert("hi: " + _array.join(" "));
    if(_array.length == 1)
        return [_array[0]];
    var x = parseInt(_array.length / 2);
    return merge(_array.slice(0, x), _array.slice(x, _array.length));
}
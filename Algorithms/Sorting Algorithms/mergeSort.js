function merge(array1, array2) {
    let array_return = [];
    let i = 0, j = 0;
    for(; (i < array1.length && j < array2.length);){
        if(parseInt(array1[i]) < parseInt(array2[j])) {
            array_return.push(parseInt(array1[i]));
            i++;
        }
        else {
            array_return.push(parseInt(array2[j]));
            j++;
        }
    }
    while(i < array1.length){
        array_return.push(parseInt(array1[i]));
        i++;
    }
    while(j < array2.length){
        array_return.push(parseInt(array2[j]));
        j++;
    }
    return array_return;
}

function mergeSort(_array) {
    if(_array.length == 0)
        return [];
    if(_array.length == 1)
        return _array;

    var x = parseInt(_array.length / 2);

    return merge(mergeSort(_array.slice(0, x)), mergeSort(_array.slice(x, _array.length)));
}
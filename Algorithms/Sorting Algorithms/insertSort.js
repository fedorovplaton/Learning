function insertSort(_array) {
    if(_array.length <= 1)
        return _array;
    for(var i = 1; i <_array.length; i++){
        var currentInserting = _array[i];
        var j = i;
        while(_array[j - 1] > currentInserting && j >= 1){
            _array[j] = _array[j-1];
            j--;
        }
        _array[j] = currentInserting;
    }
    return _array;
}
function bubbleSort(_array) {
    if(_array.length <= 1)
        return _array;
    for(var i = 0; i < _array.length; i++){
        for(var j = 0; j < _array.length - 1 - i; j++) {
            if(_array[j] > _array[j+1]){
                var c = _array[j];
                _array[j] = _array[j+1];
                _array[j + 1] = c;
            }
        }
    }
    return _array;
}
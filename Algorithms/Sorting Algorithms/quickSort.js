

function _quickSort(_array, _l, _r) {
    let l = _l;
    let r = _r;
    let pivot = _array[parseInt((r + l) / 2 )];
    while(l <= r){
        while(_array[l] < pivot){
            l++;
        }
        while(_array[r] > pivot){
            r--;
        }
        if(l <= r) {
            let c = _array[l];
            _array[l] = _array[r];
            _array[r] = c;
            l++;
            r--;
        }
    }
    if(_l < r){
        _quickSort(_array, _l, r);
    }
    if(l < _r){
        _quickSort(_array, l, _r)
    }
}

function quickSort(_array) {
    _quickSort(_array, 0, _array.length - 1);
    return _array;
}
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});


let answer = "";
let lines = [];
let points = [];
let n, m;

function Segment(_l, _r){
    this.l = parseInt(_l);
    this.r = parseInt(_r);
}

function binarySearchL(key, array){
    if(key < array[0].l)
        return 0;
    if(key >= array[array.length - 1].l)
        return array.length;

    let l = 0;
    let r = array.length;

    while(true){
        let m = parseInt((l + r)/2);

        if(m == 0)
            return 1;

        if(array[m].l > key && array[m - 1].l <= key)
            return m;

        if(array[m].l <= key){
            l = m;
        }
        else{
            r = m;
        }
    }
}

function binarySearchR(key, array){
    if(key <= array[0].r)
        return 0;
    if(key > array[array.length - 1].r)
        return array.length;

    let l = 0;
    let r = array.length;

    while(true){
        let m = parseInt((l + r)/2);

        if(m == 0)
            return 1;

        if(array[m].r >= key && array[m - 1].r < key)
            return m;

        if(array[m].r <= key){
            l = m;
        }
        else{
            r = m;
        }
    }
}

function quickSortL(array, _l, _r){

    //console.log("[" + _l + "," + _r + "]");

    if(array.length < 3){
        return array.sort((a,b)=>{return a.l - b.l});
    }

    let l = _l;
    let r = _r;
    let a = [];
    let b = [];
    let c = [];

    let pivot = array[_l + parseInt(Math.random() * (_r - _l))].l;

    for(let i = l; i <= r; i++){
        if(array[i].l < pivot){
            a.push(array[i]);
            continue;
        }
        if(array[i].l > pivot){
            c.push(array[i]);
            continue;
        }
        b.push(array[i]);
    }

    return quickSortL(a, 0, a.length - 1).concat(b, quickSortL(c, 0, c.length - 1));
}

function quickSortR(array, _l, _r){

    //console.log("[" + _l + "," + _r + "]");

    if(array.length < 3){
        return array.sort((a,b)=>{return a.r - b.r});
    }

    let l = _l;
    let r = _r;
    let a = [];
    let b = [];
    let c = [];

    let pivot = array[l + parseInt(Math.random() * (_r - _l))].r;

    for(let i = l; i <= r; i++){
        if(array[i].r < pivot){
            a.push(array[i]);
            continue;
        }
        if(array[i].r > pivot){
            c.push(array[i]);
            continue;
        }
        b.push(array[i]);
    }

    return quickSortR(a, 0, a.length - 1).concat(b, quickSortR(c, 0, c.length - 1));
}

rl.once('line', (input) => {
    [n, m] = input.split(" ");
    let i = 1;
    rl.on('line', (line)=>{
        if(i <= n) {
            lines.push(new Segment(line.split(" ")[0], line.split(" ")[1]));
            i++;
        }
        else{
            points = line.split(" ");
        }
    });
}).on('close', ()=>{

    let linesSortedL = quickSortL(lines, 0, lines.length - 1).slice();
    let linesSortedR = quickSortR(lines, 0, lines.length - 1).slice();

    /*
    for(let i = 0; i < linesSortedL.length; i++){
        console.log(linesSortedL[i]);
    }

    for(let i = 0; i < linesSortedR.length; i++){
        console.log(linesSortedR[i]);
    }*/


    /*
    for(let i = 0; i < points.length; i++){
        answer += (binarySearchL(parseInt(points[i]), linesSortedL) - binarySearchR(parseInt(points[i]), linesSortedR)) + " ";
    }*/

    for(let i = 0; i < points.length; i++){
        answer += (linesSortedL.filter(elem=> elem.l) - binarySearchR(parseInt(points[i]), linesSortedR)) + " ";
    }

    process.stdout.write(answer);
});

/*

6 3
0 4
2 4
2 7
0 2
10 4
1 0
1 2 3

 */
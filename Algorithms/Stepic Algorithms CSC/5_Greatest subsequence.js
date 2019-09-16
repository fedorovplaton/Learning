const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let A = [];
let answer = [];
let D;
let pos;
let prev;

function binarySearchIndex(_key){
    let l = 0;
    let r = D.length - 1;
    if(_key <= D[D.length - 1])
        return -1;
    if(_key > D[0])
        return 0;
    while (l <= r){
        let m = parseInt((l + (r - l) / 2));
        if(D[m] < _key && D[m - 1] >= _key){
            return m;
        }
        if(_key <= D[m]){

            l = m + 1;
        }
        else{
            r = m - 1;
        }
    }
    return -1;
}

rl.once('line', (input) => {
    rl.on('line', (line)=>{A = line.split(" ");});
}).on('close', ()=>{

    /*
    A = [];
    let N = 1000;
    for(let i = 0; i < N; i++)
        A.push(1 + Math.random() * 100000);*/

    pos = new Array(A.length + 1);
    D = new Array(A.length + 1);
    prev = new Array(A.length);

    D[0] = Infinity;
    for(let i = 1; i < D.length; i++)
        D[i] = -1;

    let length = 0;
    pos[0] = -1;

    for(let i = 0; i < A.length; i++){
        let j = binarySearchIndex(parseInt(A[i]));
        if((D[j - 1] >= parseInt(A[i])) && parseInt(A[i]) > D[j]){
            D[j] = parseInt(A[i]);
            length = Math.max(length, j);
            pos[j] = i;
            prev[i] = pos[j - 1];
        }
    }


    let ansAr = "";

    let p = pos[length];

    while(p != -1){
        ansAr = (p + 1) + " " + ansAr;
        p = prev[p];
    }
    if(A.length != 1) {
        process.stdout.write(length + '\n' + ansAr);
    }
    else
        process.stdout.write('1\n1');
});
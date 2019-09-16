const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let n;
let heap = [];
let m = 0;
let answer = "";

let SiftDown = function(i){
    while(2 * i + 1 < heap.length){
        let index = (heap[2 * i + 1] < heap[i])?(2 * i + 1):i;
        if(2 * i + 2 < heap.length && heap[2 * i + 2] < heap[index]){
            index = 2 * i + 2;
        }
        if(index != i){
            answer = answer + i + " " + index + "\n";
            m++;
            let c = heap[i];
            heap[i] = heap[index];
            heap[index] = c;
            i = index;
            continue;
        }
        else{
            break;
        }
    }
};

rl.once('line', (input) => {
    n = parseInt(input);
    rl.once('line', (line) => {
        heap = line.split(" ").map((item)=>{return parseInt(item)});
    });
}).on('close', ()=>{
    for(let i = parseInt(n/2); i >= 0 ;i--){
        SiftDown(i);
    }
    answer = m + '\n' + answer;
    process.stdout.write(answer);
});
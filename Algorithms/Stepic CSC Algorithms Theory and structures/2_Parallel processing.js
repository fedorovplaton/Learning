const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let n; // Count of processors
let m; // Count of programs

let array = [];

let heap = [];

let answer = "";

let Processor = function(_index){
    this.index = _index;
    this.time = BigInt(0);
};

let SiftDown = function(i){
    while(2 * i + 1 < heap.length){
        /*if(2 * i + 2 < heap.length && heap[2 * i + 2].time == heap[2 * i + 1].time && heap[2 * i + 2].index < heap[2 * i + 1].index){
            let c = heap[2 * i + 2];
            heap[2 * i + 2] = heap[2 * i + 1];
            heap[2 * i + 1] = c;
        }*/

        let index = i;
        if((heap[2 * i + 1].time == heap[i].time && heap[2 * i + 1].index < heap[i].index) || heap[2 * i + 1].time < heap[i].time){
            index = 2 * i + 1;
        }
        if(2 * i + 2 < heap.length && ((heap[2 * i + 2].time < heap[index].time) || (heap[2 * i + 2].time == heap[index].time && heap[2 * i + 2].index < heap[index].index ))){
            index = 2 * i + 2;
        }

        if(index != i){
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
    n = parseInt(input.split(" ")[0]);
    m = parseInt(input.split(" ")[1]);
    rl.once('line', (line) => {
        array = line.split(" ").map((item)=>{return parseInt(item)});
    });
}).on('close', ()=>{
    for(let i = 0; i < n; i++){
        heap.push(new Processor(i));
    }

    for(let i = 0; i < array.length; i++){

        /*
        let print = "";
        for(let i = 0; i < heap.length; i++){
            print += "[" + heap[i].time + ", " + heap[i].index + "] ";
        }
        console.log(print);*/


        answer += heap[0].index + " " + heap[0].time + "\n";
        heap[0].time += BigInt(array[i]);
        if(array[i] != 0) {
            SiftDown(0);
        }

    }

    process.stdout.write(answer);
});
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

function Test() {
    this.array = [];
    this.insert = function (new_elem) {
        this.array.push(new_elem);
    };
    this.extractMax = function () {
        return this.array.pop();
    };
    this.sor = function () {
      this.array.sort((a,b)=>{return a - b});
    }

}


function Heap(){
    this.array = [];
    this.insert = function (new_elem) {
        this.array.push(new_elem);
        let i = this.array.length - 1;
        while(parseInt((i - 1) / 2) >= 0 && this.array[parseInt((i - 1) / 2)] < this.array[i]){
            let c = this.array[parseInt((i-1)/2)];
            this.array[parseInt((i-1)/2)] = this.array[i];
            this.array[i] = c;
            i = parseInt((i - 1) / 2);
        }
    };
    this.print = function () {
        console.log(this.array.join(" "));
    };
    this.printHeap = function () {
        let del = 1;
        let check = 1;
        let printStr = "                             ";
        let space = 23;
        let i_sp;
        for(let i = 0; i < this.array.length; i++){
            printStr += this.array[i] + " ";
            if(i % check == 0){
                printStr += '\n';
                del *= 2;
                check += i + del + 1;
                for(let i = 0; i < space; i++){
                    printStr += " ";
                }
                space /= 2;
                space = parseInt(space);
            }
        }
        console.log(printStr);
    };
    this.check = function () {
        for(let i = 0; i < this.array.length; i++){
            if(2*i + 1 < this.array.length){
                if(this.array[i] < this.array[2 * i + 1])
                    console.log("i: " + i + " : " + this.array[i] + " 2*i+1: " + (2 * i + 1) + " : "+ this.array[2 * i +1]);
            }
            if(2 * i + 2 < this.array.length){
                if(this.array[i] < this.array[2 * i + 2])
                    console.log("i: " + i + " : " + this.array[i] + " 2*i+2: " + (2 * i + 2) + " : "+ this.array[2 * i +2]);
            }
        }
    };

    this.extractMax = function () {

        let c = this.array[0];
        this.array[0] = this.array[this.array.length - 1];
        this.array[this.array.length - 1] = c;

        let answer = this.array.pop();

        this.siftDown(0);
        return answer;
    };

    this.siftDown=function (i) {
        while(2 * i + 1 < this.array.length){
            let left = 2 * i + 1;
            let right = 2 * i + 2;
            let j = left;
            if(right < this.array.length && this.array[right] > this.array[left])
                j = right;
            if(this.array[i] >= this.array[j])
                break;
            let c = this.array[i];
            this.array[i] = this.array[j];
            this.array[j] = c;
            i = j;
        }
    }


};

let answer = '';
let lines = [];

rl.once('line', (_n)=> {
    n = parseInt(_n);
    rl.on('line', (line) => {
        lines.push(line);
    });
}).on('close', ()=>{
    let heap = new Heap();
    for(let i = 0; i < lines.length; i++){
        if (lines[i][0] == 'I') {
            let insertValue = lines[i].split(" ")[1];
            heap.insert(parseInt(insertValue));
        } else {
            answer += heap.extractMax() + '\n';
        }
    }
    process.stdout.write(answer);
});
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let arrayCounter = [0,0,0,0,0,0,0,0,0,0,0,0];
let array = [];
let answer = "";

rl.once('line', (input) => {
    rl.on('line', (line)=>{array = line.split(" ");});
}).on('close', ()=>{
    for(let i = 0; i < array.length; i++){
        arrayCounter[parseInt(array[i])]++;
    }
    for(let i = 0; i < arrayCounter.length; i++){
        if(arrayCounter[i] != 0) {
            for (let j = 0; j < arrayCounter[i]; j++) {
                answer += i + " ";
            }
        }
    }
    process.stdout.write(answer);
});
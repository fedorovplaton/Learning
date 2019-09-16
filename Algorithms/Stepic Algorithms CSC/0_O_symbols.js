const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});


let n;

let map = new Map();

rl.once('line', (_n)=>{
    n = parseInt(_n)
}).on('ling', (line)=>{
    map.set(line.split(" ")[0], line.split(" ")[1])
}).on('close', ()=>{
    for(let lines of map){
        console.log(lines);
    }
});

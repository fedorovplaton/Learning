const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let answer = 0;

rl.once('line', (line)=>{
    answer = parseInt(line.split(" ")[0]) + parseInt(line.split(" ")[1])
}).on('close', ()=>{
    process.stdout.write(answer.toString());
});
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let n;
let answer = '';
let d = [-Infinity];
let arr = [];

rl.once('line', (input) => {
    n = parseInt(input);
    rl.on('line', (line) => {

        if(line[1] == 'u'){
            let push_num = parseInt(line.split(" ")[1]);
            d[d.length] = Math.max(d[d.length - 1], push_num);
        }
        if(line[1] == 'o'){
            d.pop();
        }
        if(line[1] == 'a'){
            answer += d[d.length - 1] + '\n';
        }
    });
}).on('close', ()=>{
    if(answer != ''){
        process.stdout.write(answer);
    }
});
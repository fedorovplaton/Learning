const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let answer = "";
let n, m;

let lines = [];

rl.on('line', (t)=>{
    lines.push(t);
}).on('close', ()=>{
    let t = parseInt(lines[0]);
    for(let i = 0; i < t; i++){
        let marks = lines[i * 2 + 2].split(" ");
        [n,m] = lines[i * 2 + 1].split(' ');
        //console.log(n + " " + m);
        let my_mark = parseInt(marks[0]);
        let sum = 0;
        for(let j = 1; j < parseInt(n); j++){
            sum += parseInt(marks[j]);
        }
        if(sum + my_mark > parseInt(m))
            answer += m + '\n';
        else{
            answer += (sum + my_mark) + '\n'
        }
    }
    console.log(answer);
});
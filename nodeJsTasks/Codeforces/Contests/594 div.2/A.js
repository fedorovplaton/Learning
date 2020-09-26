const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let answer = "";

let lines = [];

rl.on('line', (t)=>{
    lines.push(t);
}).on('close', ()=>{
    let t = parseInt(lines[0]);
    for(let i = 0; i < t; i++){
        let a = lines[1 + i * 4 + 1].split(" ");
        let b = lines[1 + i * 4 + 3].split(" ");

        let n1 = 0, m1 = 0, n2 = 0, m2 = 0;

        a.map((n)=>{if(n%2 == 0) n1++; else m1++;});
        b.map((n)=>{if(n%2 == 0) n2++; else m2++;});

        answer += ("" + (n1 * n2 + m1 * m2) + '\n');
    }
    console.log(answer);
});
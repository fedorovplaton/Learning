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
    for(let i = 0; i < t; i++)
    {
        let n = parseInt(lines[i * 2 + 1]);
        let a = lines[i * 2 + 2].split(" ").map(function (x) {
            return parseInt(x);
        });
        /*
        console.log('a: ' + a.join());
        console.log('a.sort ' + a.sort().join());
        console.log('a[0] + a[1] = ' + (a[0] + a[1]));

         */
        answer += a.sort((x,y)=>x - y).reverse().join(' ') + '\n';
    }
    console.log(answer);
});
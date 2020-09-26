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

    for(let i = 1; i <= t; i++)
    {
        let [n,m] = lines[i].split(' ').map(function (x) {
            return parseInt(x);
        });

        if(n % m === 0){
            answer += 'YES\n';
        }
        else{
            answer += 'NO\n';
        }

    }





    console.log(answer);
});
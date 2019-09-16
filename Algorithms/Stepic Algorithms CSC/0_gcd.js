const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});


let n, m;

rl.once('line', (_n)=>{
    [n, m] = _n.split(" ");
}).on('close', ()=>{
    a = parseInt(n);
    b = parseInt(m);
    let i =0;
    while(a && b){
        if(a > b){
            a = a % b;
        }
        else
            b = b % a;
        //console.log(`a: ${a} b: ${b}`);
        i++;
    }
    process.stdout.write(Math.max(a, b).toString());
});

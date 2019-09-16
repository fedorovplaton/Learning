const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});


let n;
rl.once('line', (_n)=>{
    n = _n;
}).on('close', ()=>{
    let a = 1;
    let b = 1;
    let c = 0;
    if(n == 0 || n == 1)
        process.stdout.write("1");
    for(let i = 3; i <= n; i++){
        let c = (a + b) % 10;
        a = b;
        b = c;
    }
    process.stdout.write(b.toString());
});

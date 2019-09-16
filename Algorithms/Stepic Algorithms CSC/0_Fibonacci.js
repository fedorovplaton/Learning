const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});


let n;
rl.once('line', (_n)=>{
    n = _n;
}).on('close', ()=>{
    let array = [1,1];
    if(n == 0 || n == 1)
        process.stdout.write(array[n-1].toString());
    else{
        for(let i = 2; i < n; i++){
            array.push(array[array.length - 1] + array[array.length - 2]);
        }
        process.stdout.write(array[array.length - 1].toString());
    }
});

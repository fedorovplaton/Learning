const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let n;
let a = [];

rl.once('line', (input) => {
    n = parseInt(input);
    rl.on('line', (line)=>{
        a = line.split(" ");});
}).on('close', ()=>{

    if(a.length == 1){
        process.stdout.write(a[0]);
    }

    else{

        a.unshift(0);

        let d = new Array(a.length);

        d[0] = 0;
        d[1] = parseInt(a[1]);

        //console.log(a.join(" "));

        for(let i = 2; i < a.length; i++){
            d[i] = parseInt(a[i]);
            d[i] += Math.max(d[i - 1], d[i - 2]);
        }

        process.stdout.write(d[n].toString());
    }
});
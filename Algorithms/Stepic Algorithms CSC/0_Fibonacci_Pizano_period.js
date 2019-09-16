const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});


let n, m;

function find_period(_m){
    let k = +_m;
    let array = [0, 1];
    for(let i = 2; i < 6 * k; i++){
        array.push((array[i - 2] + array[i - 1]) % k);
        if(array[i] == 1 && array[i - 1] == 0)
            break;
    }
    //console.log(array.join(""));
    return array;
}

rl.once('line', (_n)=>{
    [n, m] = _n.split(" ");
}).on('close', ()=>{
    let ar = find_period(m);
    //console.log(ar.join(" "));
    let pl = ar.length - 2;
    const N = BigInt(n);
    const PL = BigInt(pl);
    //process.stdout.write(`N: ${N} PL: ${PL}` + " N % PL " + (N % PL));
    process.stdout.write("" + ar[parseInt(N % PL)]);
});

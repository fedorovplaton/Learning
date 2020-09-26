
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let answer = 0;

let lines = [];

function count(str, l){
    let counter = 0;
    let b = [];
    for(let i = 0; i < str.length; i++){
        if(str[i] === '0') b.push(i);
    }

    if(b.length === 0){
        return Math.max(0, str.length - l + 1);
    }

    for(let i = 0; i < b.length - 1; i++) {
        counter += Math.max(0, b[i + 1] - b[i] - l);
    }
    counter += Math.max(0, b[0] - l + 1);
    counter += Math.max(0, str.length - b[b.length - 1] - l);

    return counter;
}

rl.on('line', (t)=>{
    lines.push(t);
}).on('close', ()=>{
    let [m, n, k] = lines[0].split(" ").map(function (x) {
        return parseInt(x);
    });
    let a = lines[1].split(" ").join('');
    let b = lines[2].split(" ").join('');


    //console.log('a: ' + a);
    //console.log('b: ' + b);

    for(let i = 1; i <= k; i++){
        if(k % i === 0){

            //console.log('i: ' + i + ' k/i: ' + (k/i) + '      ' + count(a, i) + ' ' + count(b, k/i));

            answer += (count(a, i) *  count(b, k/i));
        }
    }

    console.log(answer);
});
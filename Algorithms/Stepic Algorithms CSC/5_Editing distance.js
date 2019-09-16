const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let answer = 0;
let lines = [];

rl.on('line', (input) => {
    lines.push(input);
}).on('close', ()=>{

    let a = lines[0];
    let b = lines[1];
    let A = new Array(a.length + 1);
    for(let i = 0; i < A.length; i++){
        A[i] = new Array(b.length + 1);
    }

    for(let i = 0; i < A.length; i++)
        A[i][0] = i;
    for(let i = 0; i <= b.length; i++){
        A[0][i] = i;
    }

    for(let i = 1; i <= b.length; i++){
        for(let j = 1; j <= a.length; j++){

            A[j][i] = Math.min(A[j - 1][i] + 1,
                A[j][i - 1] + 1,
                A[j - 1][i - 1] + ((a[j-1] == b[i-1])?0:1)
                );
        }
    }

/*
    c
*/
    /*
    console.log(A[0][0]);
    console.log(A[a.length][0]);
    console.log(A[0][b.length]);

    console.log();*/
    process.stdout.write(A[a.length][b.length].toString());
});
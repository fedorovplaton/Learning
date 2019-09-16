const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let answer = 0;
let lines = [];
let W;
let n;
let c = [];

rl.on('line', (input) => {
    lines.push(input);
}).on('close', ()=>{
    W = parseInt(lines[0].split(" ")[0]);
    n = parseInt(lines[0].split(" ")[1]);
    c = lines[1].split(" ");

    let D = new Array(n + 1);
    for(let i = 0; i < n + 1; i++){
        D[i] = new Array(W + 1);
    }
    for(let i = 0; i < n + 1; i++){
        D[i][0] = 0;
    }
    for(let i = 0; i < W + 1; i++){
        D[0][i] = 0;
    }

    for(let i = 1; i < n + 1; i++){
        for(let w = 1; w < W + 1; w++){
            D[i][w] = D[i - 1][w];
            if(parseInt(c[i-1]) <= w) {
                D[i][w] = Math.max(D[i][w],
                    D[i - 1][w - parseInt(c[i - 1])] + parseInt(c[i - 1]));
            }
        }
    }

    /*
    let str = "";
    for(let i = 0; i <= W; i++){
        for(let j = 0; j <= n; j++){
            str += D[j][i] + " ";
        }
        str += '\n';
    }
    console.log(str);*/

    process.stdout.write(D[n][W].toString());
});
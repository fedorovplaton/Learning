const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let A = [];
let answer = 0;




rl.once('line', (input) => {
    rl.on('line', (line)=>{A = line.split(" ");});
}).on('close', ()=>{

    let D = Array(A.length);

    for(let i = 0; i < A.length; i++){
        D[i] = 1;
        for(let j = 0; j < i; j++){
            if((parseInt(A[i]) % parseInt(A[j]) == 0)){
                if(D[j] + 1 > D[i]){
                    D[i] = D[i] + 1;
                }
            }
        }
    }

    answer = Math.max(...D);

    process.stdout.write(answer.toString());
});
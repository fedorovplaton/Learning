const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let n;
let lines = [];

rl.once('line', (_n) => {
    n = parseInt(_n);
    rl.on('line', (_line)=>{
        lines.push(_line);
    });
}).on('close', ()=>{
    let max = new Array(n);
    let min = new Array(n);
    for(let i = 0; i < n; i++) {
        max[i] = Infinity;
        min[i] = -Infinity;
    }

    let answerBool = true;

    for(let i = 0; i < n; i++){
        let current_value = parseInt(lines[i].split(" ")[0]);

        if(current_value < min[i] || current_value >= max[i]){
            answerBool = false;
            break;
        }

        let l = parseInt(lines[i].split(" ")[1]);
        let r = parseInt(lines[i].split(" ")[2]);

        if(l != -1) {
            min[l] = min[i];
            max[l] = current_value;
        }

        if(r != -1) {
            min[r] = current_value;
            max[r] = max[i];
        }
    }

    if(answerBool){
        process.stdout.write("CORRECT");
    }
    else
        process.stdout.write("INCORRECT");

});

/*
3
2 -1 1
2 -1 2
2 -1 -1
*/
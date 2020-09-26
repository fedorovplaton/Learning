const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let answer = "";

let lines = [];

rl.on('line', (t)=>{
    lines.push(t);
}).on('close', ()=>{
    let t = parseInt(lines[0]);

    for(let i = 0; i < t; i++){
        let n = parseInt(lines[i * 2 + 1]);
        let a = lines[i * 2 + 2].split(" ").map( function (x) {
            return parseInt(x);
        });
        if(a[0] % 2 === 0)
            answer += '1' + '\n' + '1' + '\n';
        else{
            if(n === 1) answer += '-1' + '\n';
            else {
                for(let j = 1; j < n; j++){
                    if(a[j] % 2 !== 0) {
                        answer += '2' + '\n' + '1 ' + (j + 1) + '\n';
                        break;
                    }
                    else{
                        answer += '1' + '\n' + (j + 1) + '\n';
                        break;
                    }
                }
            }
        }
    }

    console.log(answer);

});
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let n;

rl.once('line', (_input)=> {
    n = parseInt(_input);
}).on('close', ()=>{
    if(n == 1)
        process.stdout.write("1\n1");
    else {
        if(n == 2)
            process.stdout.write("1\n2");
        else {
            answer = [];
            let i = 1;
            do {
                answer.push(i);
                n -= i;
                i++;
            } while (n - (i + 1) >= i);
            answer.push(n);
            process.stdout.write(answer.length + '\n' + answer.join(" "));
        }
    }
});

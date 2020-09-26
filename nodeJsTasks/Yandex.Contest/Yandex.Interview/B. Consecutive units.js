const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

var array = new Array(0);
var answer = 0;
var current = 0;

rl.on('line', (line) => {
    array.push(parseInt(line));
}).on('close', () => {
    if(array[0] == '0')
        process.stdout.write("0");
    else{
        for(var i = 1; i < array.length;i++){
            if(parseInt(array[i]) == 1) {
                current++;
                answer = Math.max(current,answer);
            }
            else{
                current = 0;
            }
        }
        process.stdout.write(answer.toString());

    }
});
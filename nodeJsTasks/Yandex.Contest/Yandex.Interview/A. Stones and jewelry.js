/*
rl.question(
    'What do you think of Node.js? ',
    (answer) => {
        var g= 5;
        console.log(g+2 + " " + answer + '\n');
        rl.close();
    }
);*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let lines = [];
rl.on('line', (line) => {
    lines.push(line);
}).on('close', () => {
    const [jewels, stones] = lines;
    var answer = 0;
    for(var i = 0; i < stones.length; i++)
        if(jewels.lastIndexOf(stones.charAt(i))!= -1)
            answer++;
    process.stdout.write(answer.toString());
});

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});


let n;

let lines = [];

function Line(_line){
    this.l = parseInt(_line.split(" ")[0]);
    this.r = parseInt(_line.split(" ")[1]);
}

rl.once('line', (_n)=> {
    n = parseInt(_n);

    rl.on('line', (line) => {
        lines.push(new Line(line));
    });
}).on('close', ()=>{
    lines.sort((a,b)=>{return a.r - b.r});
    let answer = [];
    answer.push(lines[0].r);
    let last = lines[0].l;
    for(let i = 1; i < lines.length; i++){
        if(lines[i].l > answer[answer.length - 1])
            answer.push(lines[i].r);
    }
    process.stdout.write(answer.length + "\n" + answer.join(" "));
});

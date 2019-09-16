const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let a = [];
let n;
let b = [];

function height(i, h){
    //console.log(b.join(" "));
    //console.log("(" + i + ',' + h + ") и по нашим данным в вершине: " + i + " значение: " + b[i]);
    if(parseInt(a[i]) == -1) {
        //console.log("Вершина в вершине с номером: " + i);
        b[i] = 0;
        return h;
    }
    if(b[i] == -1){
        //console.log("Не знаем что в вершине: " + i);
        let d = height(parseInt(a[i]), 1);
        //console.log("В веришине: " + i + " значение: " + d);
        b[i] = d;
        return h + d;
    }
    else{
        //console.log("?");
        return h + b[i];
    }
}

rl.once('line', (input) => {
    n = parseInt(input);
    rl.on('line', (line) => {a = line.split(" ");});
}).on('close', ()=>{
    b = a.map((item)=>{return -1});
    for(let i = 0; i < a.length; i++){
        height(i,0);
    }
    //console.log(b.join(" "));
    process.stdout.write((Math.max(...a.map((item, index)=>{return height(index, 0)})) + 1).toString());
});
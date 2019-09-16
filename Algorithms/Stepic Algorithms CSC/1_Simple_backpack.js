const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let n, W;
let items = [];
let answer = 0;

function Item(_str) {
    this.price = Number(_str.split(" ")[0]);
    this.weigth = Number(_str.split(" ")[1]);
    this.value = this.price / this.weigth;
    return this;
}

rl.once('line', (_input)=> {
    n = parseInt(_input.split(" ")[0]);
    W = Number(_input.split(" ")[1]);
    rl.on('line', (_line) => {
       items.push(new Item(_line));
    });
}).on('close', ()=>{
    items.sort((a,b)=>{return b.value - a.value});
    for(let i = 0; i < items.length; i++){
        if(W > items[i].weigth){
            W -= items[i].weigth;
            answer += items[i].price;
        }
        else{
            answer += items[i].price * (W / items[i].weigth);
            break;
        }
        if(W <= 0)
            break;
    }
    process.stdout.write(answer.toString());
});

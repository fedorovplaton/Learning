const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});


let answer = "";
let sArray = [];
let kArray = [];

function binarySearchIndex(_key){
    let l = 0;
    let r = sArray.length - 1;
    while (l <= r){
        let m = parseInt((l + r) / 2);
        if(sArray[m] == _key){
            return m + 1;
        }
        if(_key > parseInt(sArray[m])){

            l = m + 1;
        }
        else{
            r = m - 1;
        }
    }
    return -1;
}

rl.once('line', (line1) => {
    sArray = line1.split(" ").splice(1);
    rl.once('line', (line2) => { kArray = line2.split(" ").slice(1)});
}).on('close', ()=>{
    for(let i = 0; i < kArray.length; i++){
        answer += binarySearchIndex(parseInt(kArray[i])) + " ";
    }
    process.stdout.write(answer);
});
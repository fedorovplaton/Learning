const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    terminal: false

});

let n;

function fo(str, l, r){
    if(r == n){
        fs.appendFileSync("output.txt", str + '\n');
    }
    if(l < n){
        fo(str + '(', l + 1, r);
    }
    if(r < n && r < l){
        fo(str + ')', l, r + 1);
    }
}

rl.once('line', (line)=>{
    n = parseInt(line);
}).on('close', () =>{
    fo('', 0,0 );
});



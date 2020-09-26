const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    terminal: false

});

var str = '', prev;

rl.once('line', () => {
rl.on('line', (next)=>{
    if(next != prev)
        str += `${prev = next}\n`;
    if(str.length > 100){
        fs.appendFileSync('output.txt', str);
        str = '';
    }
}).on('close', () => {
    fs.appendFileSync('output.txt', str);
});
});

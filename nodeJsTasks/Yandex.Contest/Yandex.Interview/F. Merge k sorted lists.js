const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    terminal: false

});

let n;
let array = new Array(101).fill(0);

rl.once('line', (a) => {
   //n = a;
   rl.on('line', (line) =>{
       let arr = line.split(" ");
       arr.shift();
       for(let i = 0; i < arr.length; i++){
           array[parseInt(arr[i])]++;
       }
       delete line;
   }).on('close', ()=>{
       let answer = "";
       for(let i = 0; i < array.length; i++){
           if(array[i] > 0){
               for(let j = 0; j < array[i]; j++){
                   answer += i + " ";
               }
               fs.appendFileSync("output.txt", answer);
               answer = "";
           }
       }
   });
});
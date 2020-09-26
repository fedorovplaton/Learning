const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin
});

let n;
let answer = 0;

rl.on('line', (line) => {
  n = parseInt(line)
}).on('close', () => {
  let array = [0,1,1,1,1,1,1,1,1,1];
  for(let i = 2; i <= n; i++) {
    let next = new Array(10);
    next[0] = array[0] + array[1];
    next[9] = array[8] + array[9];
    for (let j = 1; j < 9; j++) {
      next[j] = array[j - 1] + array[j] + array[j + 1];
    }
    array = next;
  }
  array.forEach(item => {answer += item});
  console.log(answer);
});
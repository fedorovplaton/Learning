//const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin
});

let n;
let array;

rl.on('line', (line) => {
  n = parseInt(line);
}).on('close', () => {
  array = new Array(n + 1);
  for (let i = 0; i <= n; i++) {
    array[i] = 0;
  }
  for (let i = 2; i <= n; i++) {
    array[i] = array[i - 1] + 1;
    if(i % 2 === 0) array[i] = Math.min(array[i/2] + 1, array[i]);
    if(i % 3 === 0) array[i] = Math.min(array[i/3] + 1, array[i]);
  }

  let cur = n;
  let ansArray = [];
  while (cur !== 1) {
    ansArray.push(cur);
    if (cur % 3 === 0 && array[cur / 3] + 1 === array[cur]) cur /= 3;
    else {
      if (cur % 2 === 0 && array[cur / 2] + 1 === array[cur]) cur /= 2;
      else {
        cur--;
      }
    }
  }
  ansArray.push(1);
  console.log(array[n]);
  console.log(ansArray.reverse().join(" "));
});
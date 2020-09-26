const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin
});

let lines = [];
let answer = 0;

rl.on('line', (line) => {
  lines.push(line);
}).on('close', () => {
});
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin
});

let lines = [];
rl.on('line', (line)=>{
  lines.push(line);
}).on('close', () => {
  console.log(lines[1].split(' ').map(item => parseInt(item)).sort((a,b) => a - b).join(' '));
});
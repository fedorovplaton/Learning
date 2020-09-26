const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin
});

let lines = [];
rl.on('line', (line)=>{
  lines.push(line);
}).on('close', () => {
  let [n, m, k] = lines.shift().split(" ").map(item => parseInt(item));
  for (let i = m; (i > m - k - 1) && (i >= 0); i--) {
    lines.sort((a, b) => {
      return a.charCodeAt(i) - b.charCodeAt(i);
    });
  }
  console.log(lines.join('\n'));
});
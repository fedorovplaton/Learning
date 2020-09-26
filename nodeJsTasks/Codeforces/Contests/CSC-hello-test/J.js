const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin
});

let c;

function f(x) {
  return (x * x + Math.sqrt(x) - c);
}

rl.on('line', (line) => {
  c = parseFloat(line)
}).on('close', () => {
  let l = 0;
  let r = c;
  while (r - l > 0.0000001) {
    if(f((r + l)/2) >= 0) {
      r = (r + l) / 2;
    }
    else {
      l = (r + l) / 2;
    }
  }
  console.log(r);
});
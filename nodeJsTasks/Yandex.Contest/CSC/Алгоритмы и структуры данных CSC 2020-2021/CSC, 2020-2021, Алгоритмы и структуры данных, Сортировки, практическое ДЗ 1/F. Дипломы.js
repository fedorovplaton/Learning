const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin
});
let w, h, n;

rl.on('line', (line) => {
  [w, h, n] = line.split(" ").map(item => parseInt(item));
}).on('close', () => {
  w = BigInt(w);
  h = BigInt(h);
  n = BigInt(n);
  let one = BigInt(1);
  let two = BigInt(2);
  let l = BigInt(0), r = (w + h) * (n + one);

  while (r - l > 1) {
    let m = (r + l) / two;
    if ((m / w) * (m / h) >= n)
      r = m;
    else
      l = m;
  }

  console.log(r.toString(10));
});
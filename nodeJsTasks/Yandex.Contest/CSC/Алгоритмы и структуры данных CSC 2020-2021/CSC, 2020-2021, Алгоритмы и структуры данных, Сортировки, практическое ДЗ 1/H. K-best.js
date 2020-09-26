const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin
});

let lines = [];
let n,k;

rl.on('line', (line)=>{
  lines.push(line);
}).on('close', () => {
  [n, k] = lines[0].split(" ").map(item => parseInt(item));

  let v = new Array(n);
  let w = new Array(n);
  let c = new Array(n);
  let indexes = new Array(n);

  for (let i = 0; i < n; i++) {
     [v[i], w[i]]= lines[1 + i].split(" ").map(item => parseInt(item));
     indexes[i] = i;
  }

  let s = 1;
  let m = -1;
  let l = 0;
  let r = 10e7;
  let eps = 1e-8

  while (l + eps < r) {
    m = (l + r) / 2;

    for (let i = 0; i < n; i++) {
      c[i] = [v[i] - m * w[i], i];
    }

    c.sort((a,b) => b[0] - a[0]);

    s = 0;
    for (let i = 0; i < k; i++) {
      s += c[i][0];
    }

    if (s > 0) {
      l = m;
    }
    else {
      r = m;
    }
  }

  c.slice(0, k).map(item => console.log(item[1] + 1));
});
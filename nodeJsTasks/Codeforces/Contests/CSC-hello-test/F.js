const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin
});

let lines = [];
let answer = 0;

rl.on('line', (line) => {
  lines.push(line);
}).on('close', () => {
  let [N, M] = lines[0].split(" ").map(item => parseInt(item));
  let m = lines[1].split(" ").map(item => parseInt(item));
  let c = lines[2].split(" ").map(item => parseInt(item));

  let A = new Array(N + 1);
  for (let i = 0; i <= N; i++) {
    A[i] = new Array(M + 1);
    for (let j = 0; j <= M; j++) {
      A[i][j] = 0;
    }
  }

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= M; j++) {
      A[i][j] = Math.max(A[i - 1][j], A[i][j - 1]);
      if (m[i - 1] <= j) {
        A[i][j] = Math.max(A[i - 1][j - m[i - 1]] + c[i - 1], A[i][j]);
      }
    }
  }

  let path = '', count = 0;
  let i = N, j = M;
  while (i > 0 && j > 0) {
    //console.log(i + ' ' + j);
    if (A[i][j] === A[i - 1][j - m[i - 1]] + c[i - 1]) {
      path = i + ' ' + path;
      count++;
      j -= m[i - 1];
      i--;
    }
    else {
      if (A[i][j - 1] === A[i][j]) {
        j--;
      }
      else {
        if (A[i - 1][j] === A[i][j]) {
          i--;
        }
      }
    }
  }

  for (let i = 0; i <= N; i++) {
    //console.log(A[i].join(' '));
  }
  console.log(count);
  console.log(path);
});
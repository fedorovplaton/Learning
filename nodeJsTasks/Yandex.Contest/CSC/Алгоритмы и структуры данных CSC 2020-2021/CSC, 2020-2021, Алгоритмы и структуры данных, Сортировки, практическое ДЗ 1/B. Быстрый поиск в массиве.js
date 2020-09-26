const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin
});

let lines = [];
let answer = '';

function bsL(key, array) {
  if (key > array[array.length - 1])
    return array.length;
  if (key <= array[0])
    return 0;

  let l = -1;
  let r = array.length;

  while (r > l + 1) {
    let m = (l + r) >> 1;
    if (array[m] < key)
      l = m;
    else {
      r = m;
    }
  }
  return r;
}

function bsR(key, array) {
  if (key >= array[array.length - 1])
    return array.length - 1;
  if (key < array[0])
    return -1;

  let l = -1;
  let r = array.length;

  while (r > l + 1) {
    let m = (l + r) >> 1;
    if (array[m] <= key)
      l = m;
    else {
      r = m;
    }
  }
  return l;
}

rl.on('line', (line) => {
  lines.push(line);
}).on('close', () => {
  let n = parseInt(lines[0]);
  let array = lines[1].split(" ").map(item => parseInt(item)).sort((a, b) => (a - b));
  let k = parseInt(lines[2]);

  for (let j = 0; j < k; j++) {
    let [l, r] = lines[3 + j].split(" ").map(item => parseInt(item));
    l = bsL(l, array);
    r = bsR(r, array)
    answer += Math.max(0, r - l + 1) + ' ';
  }
  console.log(answer)
});
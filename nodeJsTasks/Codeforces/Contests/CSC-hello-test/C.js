const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin
});

let lines = [];
let answer = '';

function bsL(key, array){
  if(key > array[array.length - 1])
    return array.length;
  if(key <= array[0])
    return 0;

  let l = -1;
  let r = array.length;

  while(r > l + 1){
    let m = (l + r) >> 1;
    if(array[m] < key)
      l = m;
    else{
      r = m;
    }
  }
  return r;
}

function bsR(key, array){
  if(key >= array[array.length - 1])
    return array.length - 1;
  if(key < array[0])
    return -1;

  let l = -1;
  let r = array.length;

  while(r > l + 1){
    let m = (l + r) >> 1;
    if(array[m] <= key)
      l = m;
    else{
      r = m;
    }
  }
  return l;
}

rl.on('line', (line) => {
  lines.push(line);
}).on('close', () => {
  let mapL = new Map();
  let mapR = new Map();
  n = parseInt(lines[0]);
  array = lines[1].split(" ").map(item => parseInt(item));
  array.sort((a,b) => (a - b));
  k = parseInt(lines[2]);

  for (let j = 0; j < k; j++) {
    let [l, r] = lines[3 + j].split(" ").map(item => parseInt(item));

    let _l, _r;

    if(mapL.has(l))
      _l = mapL.get(l);
    else {
      _l = bsL(l, array);
      mapL.set(l, _l);
    }

    if(mapR.has(r))
      _r = mapR.get(r);
    else {
      _r = bsR(r, array)
      mapR.set(r, _r);
    }

    answer += Math.max(0, _r - _l + 1) + ' ';
  }
  console.log(answer)
});
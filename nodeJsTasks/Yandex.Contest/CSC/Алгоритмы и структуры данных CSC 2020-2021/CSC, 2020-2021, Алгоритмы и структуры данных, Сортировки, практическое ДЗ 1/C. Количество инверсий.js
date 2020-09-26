const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin
});

let lines = []
let answer = 0;

function sort(array) {
  if (array.length <= 1) return array;
  if (array.length === 2) {
    if (array[0] > array[1]) {
      answer++;
      return [array[1], array[0]];
    }
    else
      return array;
  }
  let pivot = (array.length) / 2;
  return merge(sort(array.slice(0, pivot)), sort(array.slice(pivot, array.length)));
}

function merge(array1, array2) {
  //console.log('merge: ' + array1.join(' ') + ' with ' + array2.join(' '));
  if(array1.length === 0) return array2;
  if(array2.length === 0) return array1;
  let array = new Array(array1.length + array2.length);
  let i = 0, j = 0;
  while (i < array1.length && j < array2.length) {
    if(array1[i] < array2[j]) {
      array[i + j] = array1[i];
      i++;
    }
    else {
      array[i + j] = array2[j];
      answer += array1.length - i;
      j++;
    }
  }
  for (; i < array1.length; i++)
  {
    array[i + j] = array1[i];
  }
  for (; j < array2.length; j++)
  {
    array[i + j] = array2[j];
  }
  return array;
}

rl.on('line', (line) => {
  lines.push(line);
}).on('close', () => {
  let n = parseInt(lines[0]);
  let array = lines[1].split(" ").map(item => parseInt(item));
  (sort(array));
  console.log(answer);
});
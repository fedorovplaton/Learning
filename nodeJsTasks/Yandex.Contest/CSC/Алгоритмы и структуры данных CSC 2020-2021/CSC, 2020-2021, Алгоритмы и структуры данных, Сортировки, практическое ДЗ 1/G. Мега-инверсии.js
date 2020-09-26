const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin
});

let arr = [];
let moreThen = [];
let lessThen = [];

function sort(array) {
  if (array.length <= 1) return array;
  if (array.length === 2) {
    if (array[0] > array[1]) {
      moreThen[array[0]]++;
      lessThen[array[1]]++;
      return [array[1], array[0]];
    }
    else
      return array;
  }
  let pivot = Math.floor(array.length / 2);
  return merge(sort(array.slice(0, pivot)), sort(array.slice(pivot, array.length)));
}

function merge(array1, array2) {
  if(array1.length === 0) return array2;
  if(array2.length === 0) return array1;

  let array = new Array(array1.length + array2.length);
  let i = 0, j = 0;

  while (i < array1.length && j < array2.length) {
    if(array1[i] < array2[j]) {
      array[i + j] = array1[i];
      moreThen[array1[i]] += j;
      i++;
    }
    else {
      array[i + j] = array2[j];
      lessThen[array2[j]] += array1.length - i;
      j++;
    }
  }
  for (; i < array1.length; i++)
  {
    moreThen[array1[i]] += j;
    array[i + j] = array1[i];
  }
  for (; j < array2.length; j++)
  {
    array[i + j] = array2[j];
  }
  return array;
}

rl.on('line', (line)=>{
  arr.push(parseInt(line));
}).on('close', () => {
  let n = arr.shift();
  arr = arr.map(item => item - 1);

  moreThen = new Array(n);
  moreThen.fill(0);
  lessThen = new Array(n);
  lessThen.fill(0);

  let array = sort(arr);

  let answer = 0;
  for (let i = 0; i < n; i++) {
    answer += lessThen[i] * moreThen[i];
  }
  console.log(answer);
});
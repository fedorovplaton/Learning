function Elem(value, index) {
  this.value = value;
  this.index = index;
}

function partition(array, l, r) {
  let i = l;
  let j = l;

  let pivot = array[r - 1];
  while (j < r - 1) {
    if (array[j].value < array[r - 1].value || (array[j].value === array[r - 1].value && array[j].index < array[r - 1].index)) {
      [array[i], array[j]] = [array[j], array[i]];
      i++;
    }
    j++;
  }
  [array[i], array[j]] = [array[j], array[i]];
  return i;
}

function boo(arrayInstance, i, j, k) {
  let array = arrayInstance.slice();
  i--;
  j--;
  let pivotIndex = partition(array, i, j + 1);
  let pivotPosition = pivotIndex - i + 1;

  while (pivotPosition !== k) {
    if (pivotPosition < k) {
      k -= pivotPosition;
      i = pivotIndex + 1;
    } else {
      j = pivotIndex - 1;
    }
    pivotIndex = partition(array, i, j + 1);
    pivotPosition = pivotIndex - i + 1;
  }
  return array[pivotIndex].value;
}

function foo(arrayInstance, i, j, k) {
  let array = arrayInstance.slice(i - 1, j).sort((a,b) => {return a.value - b.value});
  return array[k - 1].value;
}


const MAX_ARRAY_SIZE = 10001;
const MAX_ELEMENT_VALUE = 1000000000;
const INPUT_SIZE = 1001;

function makeArray() {
  let n = Math.floor(1 + Math.random() * MAX_ARRAY_SIZE);
  let array = new Array(n);
  for (let i = 0; i < n; i++) {
    array[i] = new Elem(Math.floor(1 + Math.random() * MAX_ELEMENT_VALUE), i);
  }
  return array;
}

function makeInput(array) {
  let n = array.length;
  let input = new Array(INPUT_SIZE);

  for (let i = 0; i < INPUT_SIZE; i++) {
    let l = 1 + Math.floor(Math.random() * n);
    let r = l + Math.floor(Math.random() * (n - l + 1));
    let k = Math.floor(1 + Math.random() * (r - l + 1));
    input[i] = [l,r,k];
  }

  return input;
}

function testing() {
  let array = makeArray();
  let input = makeInput(array);

  console.log(array.map(item => item.value).join(' '));
  for (let i = 0; i < INPUT_SIZE; i++) {
    //console.log(`input: [${input[i].join(' ')}]`);
    let my = boo(array, input[i][0], input[i][1], input[i][2]);
    let truth = foo(array, input[i][0], input[i][1], input[i][2]);
    if (my === truth) console.log(`${i} - OK!`);
    else {
      console.log(`WRONG ANSWER!!!`);
      console.log(`array: [${array.map(item => item.value).join(',')}]\n input: [${input[i].join(' ')}]`);
      break;
    }
  }
}

function customTest(array, input) {
  array = array.map((item, index) => new Elem(item, index));
  let my = boo(array, input[0], input[1], input[2]);
  let truth = foo(array, input[0], input[1], input[2]);
  console.log(`my: ${my} vs truth: ${truth}`);
  console.log(`array: [${array.map(item => item.value).join(',')}]\n input: [${input.join(' ')}]`);
}

(() => {
  testing();
  //customTest([19, 14, 7, 2, 11], [3, 5, 1]);
})()

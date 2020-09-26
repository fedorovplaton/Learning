const MAX_ARRAY_SIZE = 9;
const MAX_ELEMENT_VALUE = MAX_ARRAY_SIZE - 1;
const INPUT_SIZE = 1001;
const TESTS_COUNT = 6;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function makeArray() {
  let n = Math.floor(Math.random() * (MAX_ARRAY_SIZE + 1));
  let array = new Array(n)
  for (let i = 0; i < n; i++) {
    array[i] = i + 1;
  }
  return shuffle(array);
}

function foo(array) {
  let ans = 0;

  for (let i = 0; i < array.length - 2; i++) {
    for (let j = i + 1; j < array.length - 1; j++) {
      for (let k = j + 1; k < array.length; k++) {
        if (array[i] > array[j] && array[j] > array[k]) {
          console.log(`[${array[i]},${array[j]},${array[k]}]`)
          ans++;
        }
      }
    }
  }

  return ans;
}
function boo(array) {
  let answer = 0;

  let visited = new Array(array.length);
  let lessThen = new Array(array.length);

  for (let i = 0; i < array.length; i++) {
    visited[i] = 0;
    lessThen[i] = 0;
  }

  for (let i = 0; i < array.length; i++) {
    // Считываем элемент
    let cur = array[i] - 1;

    // Говорим, что встретили элемент
    visited[cur] = 1;

    // Начинаем считать сколько элементов уже больше него
    for (let j = cur + 1; j < array.length; j++) {
      if (visited[j]) {
        lessThen[cur] = lessThen[j] + 1;
        break;
      }
    }

    // Если таких элементов >= 2, то считаем кол-во инверсий
    if (lessThen[cur] >= 2) {
      answer += (lessThen[cur] * (lessThen[cur] - 1)) / 2;
    }
  }

  return answer;
}

function testing() {

  for(let i = 0; i < TESTS_COUNT; i++) {
    console.log(`______________________`)
    let array = makeArray();

    let my = boo(array);
    let truth = foo(array);

    if (my === truth) console.log(`OK!`);
    else {
      console.log(`WRONG ANSWER!!!`);
      console.log(`array: [${array.join(',')}]`);
      console.log(`truth: ${truth} vs my result: ${my}`);
      break;
    }
    console.log(`______________________`)
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

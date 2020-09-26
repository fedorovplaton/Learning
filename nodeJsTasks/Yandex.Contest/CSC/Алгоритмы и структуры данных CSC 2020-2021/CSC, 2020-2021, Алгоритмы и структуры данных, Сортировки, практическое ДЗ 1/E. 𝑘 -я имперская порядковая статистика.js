const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin
});

function Elem(value, index) {
  this.value = value;
  this.index = index;
}

/**
 * Разделяет массива на 2 части, 1 часть меньше или равна array[r - 1], вторая больше
 * @param array
 * @param {Number} l - левая граница зоны разделения l >= 0;
 * @param {Number} r - правая граница зоны разделения r <= array.length
 * @return {Number} i - кол-во элементов меньше array[r - 1]
 */
function partition(array, l, r) {
  let i = l;
  let j = l;

  let pivot = array[r - 1];
  while (j < r - 1) {
    if (array[j].value < array[r - 1].value || (array[j].value === array[r-1].value && array[j].index < array[r-1].index)) {
      [array[i], array[j]] = [array[j], array[i]];
      i++;
    }
    j++;
  }
  [array[i], array[j]] = [array[j], array[i]];
  return i;
}

let lines = [];
rl.on('line', (line) => {
  lines.push(line);
}).on('close', () => {
  let n = parseInt(lines[0]);
  let arrayInstance = lines[1].split(" ").map((item,index) => new Elem(parseInt(item), index));
  let array = [];
  let m = parseInt(lines[2]);
  let answer = '';

  for (let l = 0; l < m; l++) {
    array = arrayInstance.slice();
    let [i, j, k] = lines[3 + l].split(" ").map(item => parseInt(item));
    i--;
    j--;

    //console.log(`Пытаемся найти ${k}-ый номер на участке [${i},${j}] в массиве [${array.map(item => item.value)}]`);
    //console.log(`То есть ${k}-ый элемент в [${array.slice(i, j + 1).map(item => item.value)}]`);

    let pivotIndex = partition(array, i, j + 1);
    // Получили индекс: все элементы от [l,pivotIndex] <= a[pivotIndex]
    // Это значит, что элемент с индексом pivotIndex занимает позицию
    let pivotPosition = pivotIndex - i + 1;

    while (pivotPosition !== k) {
      //console.log(`Следующее приближение: начинаем работу с массивом ${array.slice(i, j + 1).map(item => item.value)}`);
      //console.log(`Разделили массив ${array.map(item => item.value)} на 2 части [${array.slice(i,pivotIndex + 1).map(item => item.value)}] и [${array.slice(pivotIndex + 1, j + 1).map(item => item.value)}]`);
      //console.log(`Найденный элемент - последний в левой части: ${array[pivotIndex].value} c индексом ${pivotIndex}, и он ${pivotPosition}-ый по счёту, а надо найти ${k}-ый`);

      if (pivotPosition < k) {
        k -= pivotPosition;
        i = pivotIndex + 1;
      }
      else {
        j = pivotIndex - 1;
      }

      //console.log(`Вызываем разделение от ${array.slice(i, j + 1).map(item => item.value)}`);
      pivotIndex = partition(array, i, j + 1);
      pivotPosition = pivotIndex - i + 1;
      //console.log(`Получили следующий опорный элемент: индекс: ${pivotIndex}, а позиция его: ${pivotPosition}`);
    }

    answer += array[pivotIndex].value + '\n';
  }
  console.log(answer);
});
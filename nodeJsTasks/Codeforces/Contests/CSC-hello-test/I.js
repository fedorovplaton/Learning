const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin
});

const INF = Number.MAX_VALUE;
let lines = [];
let N, K;
let answer = 0;

let Edge = function (from, to, cost) {
  this.from = from;
  this.to = to;
  this.cost = cost;
}

// Что нужно?
// Взять дорогу наименьшей стоимости из доступных, если город уже был, то взять следующую.
//
// Выбрав новый город, удалить дороги из прошлых городов в него, и добавить дороги из нового города в будующие
// в список доступных дорог
//
// Нужна система в которой могут находиться объекты, сортируемые по цене, быстрый доступ к минимальному, и
// возможность повторных элементов.

let MinHeap = function (N) {
  this.heap = new Array(N);
  this.length = 0;

  this.insert = function (edge) {

    this.heap[this.length] = edge;
    this.length++;

    if (this.length > 1) {
      let i = this.length - 1;
      while (i !== 0 && this.heap[i].cost < this.heap[Math.floor((i - 1) / 2)].cost) {
        [this.heap[i], this.heap[Math.floor((i - 1) / 2)]] = [this.heap[Math.floor((i - 1) / 2)], this.heap[i]];
        i = Math.floor((i - 1) / 2);
      }
    }
  }

  this.remove = function () {
    if (this.length > 0) {
      [this.heap[0], this.heap[this.length - 1]] = [this.heap[this.length - 1], this.heap[0]];
      this.length--;
      this.down(0);
      return this.heap[this.length];
    }
  }

  this.down = function (i) {
    let l = i * 2 + 1;
    let r = i * 2 + 2;
    let smallest = i;

    if (l < this.length && this.heap[l].cost < this.heap[i].cost)
      smallest = l;
    if (r < this.length && this.heap[r].cost < this.heap[smallest].cost)
      smallest = r;
    if (smallest !== i) {
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      this.down(smallest);
    }
  }

  this.sort = function () {
    let array = new Array(this.length);
    let size = this.length
    for (let i = 0; i < size; i++) {
      array[i] = this.remove().cost;
    }
    return array;
  }
}

rl.on('line', (line) => {
  lines.push(line);
}).on('close', () => {
  /*
  let heap = new MinHeap(2);
  heap.insert(new Edge(1,1,5));
  heap.insert(new Edge(1,1,10));
  console.info(heap.remove());

   */

  [N, K] = lines[0].split(" ").map(item => parseInt(item));
  let visited = 0;
  let min = new MinHeap(K);
  let e = new Map();

  let used = new Array(N);
  for (let i = 0; i < N; i++) {
    used[i] = false;
  }

  for (let i = 0; i < K; i++) {
    let [from, to, cost] = lines[1 + i].split(" ").map(item => parseInt(item));
    from--;
    to--;
    if (e.has(from)) {
      e.get(from).push(new Edge(from, to, cost));
    }
    else {
      e.set(from, [new Edge(from, to, cost)]);
    }
    if (e.has(to)) {
      e.get(to).push(new Edge(to, from, cost));
    }
    else {
      e.set(to, [new Edge(to, from, cost)]);
    }
  }

  used[0] = true;
  for (let i = 0; i < e.get(0).length; i++) {
    min.insert(e.get(0)[i]);
  }
  visited++;

  while (visited < N && min.length !== 0) {
    let next = min.remove();
    if (used[next.from] === true && used[next.to] === false) {
      for (let i = 0; i < e.get(next.to).length; i++) {
        min.insert(e.get(next.to)[i]);
      }
      visited[next.to] = true;
      visited++;
      answer = Math.max(answer, next.cost);
    }
  }

  console.log(answer);
});
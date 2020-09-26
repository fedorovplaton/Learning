const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin
});

let input = '';
let answer = 0;

function Node(value) {
  this.next = null;
  this.prev = null;
  this.value = value;
}

function MyArray() {
  this.head = null;
  this.tail = null;
  this.add = function (value) {
    if (this.head === null) {
      this.head = new Node(value);
      this.tail = this.head;
    } else {
      let newNode = new Node(value);
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }
  this.deleteFromTo = function (from, to) {
    if (from.prev === null) {
      if (to.next === null) {
        this.tail = null;
        this.head = null;
        return null;
      } else {
        to.next.prev = null;
        this.head = to.next;
        return this.head;
      }
    } else {
      if (to.next === null) {
        from.prev.next = null
        this.tail = from.prev;
        return null;
      } else {
        from.prev.next = to.next;
        to.next.prev = from.prev;
        return from.prev;
      }
    }
  }
  this.print = function() {
    let item = this.head;
    let str = '';
    while (item !== null) {
      str += item.value + ' ';
      item = item.next;
    }
    console.log(str);
  }
}

rl.on('line', (line) => {
  input = line;
}).on('close', () => {
  let array = new MyArray();
  input.split(" ").forEach(value => array.add(parseInt(value)));
  let start = array.head;
  while (start.next !== null) {
    let end = start;
    let distance = 1;
    while (end.next !== null && end.next.value === start.value) {
      end = end.next;
      distance++;
    }
    if (distance >= 3) {
      answer += distance;
      start = array.deleteFromTo(start, end);
      if (start === null) {
        break;
      }
      if (start.prev !== null && start.prev.value === start.value) {
        start = start.prev;
      }
    }
    else {
      start = start.next;
    }
  }
  console.log(answer);
});
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin
});

let answer = '';
let lines = [];
const MAX = 9999999

class Node {
  constructor(data, additionalData = 0, left = null, right = null) {
    this.data = data;
    this.additionalData = additionalData;
    this.left = left;
    this.right = right;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  add(data, additionalData) {
    const node = this.root;
    if (node === null) {
      this.root = new Node(data, additionalData);
      return;
    } else {
      const searchTree = function (node) {
        if (data < node.data) {
          if (node.left === null) {
            node.left = new Node(data, additionalData);
            return;
          } else if (node.left !== null) {
            return searchTree(node.left);
          }
        } else if (data > node.data) {
          if (node.right === null) {
            node.right = new Node(data, additionalData);
            return;
          } else if (node.right !== null) {
            return searchTree(node.right);
          }
        } else {
          return null;
        }
      };
      return searchTree(node);
    }
  }
  findMin() {
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }
  findMinAdd() {
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.additionalData;
    s
  }
  findMax() {
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }
  find(data) {
    let current = this.root;
    while (current.data !== data) {
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      if (current === null) {
        return null;
      }
    }
    return current;
  }
  isPresent(data) {
    let current = this.root;
    while (current) {
      if (data === current.data) {
        return true;
      }
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }
  remove(data) {
    const removeNode = function (node, data) {
      if (node == null) {
        return null;
      }
      if (data == node.data) {
        // node has no children
        if (node.left == null && node.right == null) {
          return null;
        }
        // node has no left child
        if (node.left == null) {
          return node.right;
        }
        // node has no right child
        if (node.right == null) {
          return node.left;
        }
        // node has two children
        var tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    }
    this.root = removeNode(this.root, data);
  }
  isBalanced() {
    return (this.findMinHeight() >= this.findMaxHeight() - 1)
  }
  findMinHeight(node = this.root) {
    if (node == null) {
      return -1;
    }
    ;
    let left = this.findMinHeight(node.left);
    let right = this.findMinHeight(node.right);
    if (left < right) {
      return left + 1;
    } else {
      return right + 1;
    }
    ;
  }
  findMaxHeight(node = this.root) {
    if (node == null) {
      return -1;
    }
    ;
    let left = this.findMaxHeight(node.left);
    let right = this.findMaxHeight(node.right);
    if (left > right) {
      return left + 1;
    } else {
      return right + 1;
    }
    ;
  }
  inOrder() {
    if (this.root == null) {
      return null;
    } else {
      var result = new Array();

      function traverseInOrder(node) {
        node.left && traverseInOrder(node.left);
        result.push(node.data);
        node.right && traverseInOrder(node.right);
      }

      traverseInOrder(this.root);
      return result;
    }
    ;
  }
  preOrder() {
    if (this.root == null) {
      return null;
    } else {
      var result = new Array();

      function traversePreOrder(node) {
        result.push(node.data);
        node.left && traversePreOrder(node.left);
        node.right && traversePreOrder(node.right);
      };
      traversePreOrder(this.root);
      return result;
    }
    ;
  }
  postOrder() {
    if (this.root == null) {
      return null;
    } else {
      var result = new Array();

      function traversePostOrder(node) {
        node.left && traversePostOrder(node.left);
        node.right && traversePostOrder(node.right);
        result.push(node.data);
      };
      traversePostOrder(this.root);
      return result;
    }
  }

  levelOrder() {
    let result = [];
    let Q = [];
    if (this.root != null) {
      Q.push(this.root);
      while (Q.length > 0) {
        let node = Q.shift();
        result.push(node.data);
        if (node.left != null) {
          Q.push(node.left);
        }
        ;
        if (node.right != null) {
          Q.push(node.right);
        }
        ;
      }
      ;
      return result;
    } else {
      return null;
    }
    ;
  };
}

const bst = new BST();

rl.on('line', (line) => {
  lines.push(line);
}).on('close', () => {
  let [N, M] = lines[0].split(" ").map(item => parseInt(item));
  let flags = lines[1].split(" ").map(item => parseInt(item));
  let E = new Map();
  let D = new Array(N);
  let P = new Array(N);
  let S = [0];

  for (let i = 0; i < M; i++) {
    let [from, to] = lines[2 + i].split(" ").map(item => parseInt(item));
    from--;
    to--;
    E.has(from) ? E.get(from).push(to) : E.set(from, [to]);
    E.has(to) ? E.get(to).push(from) : E.set(to, [from]);
  }

  function cost(from, to) {
    let price = Math.abs(flags[to] - flags[from]);
    if (from % 2 === 0)
      return price;
    else
      return 2 * price;
  }

  function next() {
    let min = MAX;
    let _next;
    for (let i = 0; i < N; i++) {
      if (S.indexOf(i) === -1 && D[i] < min) {
        min = D[i];
        _next = i;
      }
    }
    return _next;
  }

  function nextBst() {
    return bst.findMinAdd();
  }

  if (!E.has(0)) {
    console.log('impossible');
    return;
  }

  for (let i = 0; i < N; i++) {
    D[i] = MAX;
    //P[i] = 0;
  }
  D[0] = 0;

  //priority_queue < pair < int, int > > q;
  // ^ bst
  //q.push(make_pair(0, s));
  bst.add(0, 0);
  /*
  while (!q.empty()) {
    int
    v = q.top().second, cur_d = -q.top().first;
    q.pop();
    if (cur_d > d[v]) continue;

    for (size_t j = 0; j < g[v].size(); ++j)
    {
      int to = g[v][j].first, len = g[v][j].second;
      if (d[v] + len < d[to]) {
        d[to] = d[v] + len;
        p[to] = v;
        q.push(make_pair(-d[to], to));
      }
    }
  }
   */
  /*
  E.get(0).forEach(v => {
    D[v] = cost(0, v);
  })
   */

  /*
  for(let i = 0; i < N; i++) {
    bst.add(D[i], i);
  }
   */

  /*
  while (S.length !== N) {
    //console.log(D.join(" "));
    let w = next();
    S.push(w);
    if (E.has(w)) {
      E.get(w).forEach(i => {
        if (D[w] + cost(w, i) < D[i]) {
          D[i] = D[w] + cost(w, i);
          P[i] = w;
        }
      })
    }
  }
   */

  if (D[N - 1] === MAX) {
    console.log('impossible');
    return;
  }

  let path = '', j = N - 1, distance = 1;
  while (j !== 0) {
    path = (j + 1) + ' ' + path;
    j = P[j];
    distance++;
  }
  path = 1 + ' ' + path;

  console.log(D[N - 1] + ' ' + distance);
  console.log(path);
});
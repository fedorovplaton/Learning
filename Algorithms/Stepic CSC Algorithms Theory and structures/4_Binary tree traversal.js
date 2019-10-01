const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let n;
let lines = [];
let nodes = [];

let Node = function(_value){
    this.value = _value;
    this.parent = null;
    this.right = null;
    this.left = null;
};

let Tree = function(rootNode){
    this.root = rootNode;

    this.dfsInOrder = function (node) {

        let l_str = '';
        let r_str = '';

        if(node.left === null && node.right === null){
            return "" + node.value;
        }

        if(node.left !== null){
            l_str += this.dfsInOrder(node.left);
        }
        if(node.right !== null){
            r_str += this.dfsInOrder(node.right);
        }
        return (l_str + " " +node.value + " " + r_str);
    };
    this.dfsPreOrder = function (node) {

        let l_str = '';
        let r_str = '';

        if(node.left === null && node.right === null){
            return "" + node.value;
        }

        if(node.left !== null){
            l_str += this.dfsPreOrder(node.left);
        }
        if(node.right !== null){
            r_str += this.dfsPreOrder(node.right);
        }
        return (node.value + " " + l_str + " " + r_str);
    };
    this.dfsPostOrder = function (node) {

        let l_str = '';
        let r_str = '';

        if(node.left === null && node.right === null){
            return "" + node.value;
        }

        if(node.left !== null){
            l_str += this.dfsPostOrder(node.left);
        }
        if(node.right !== null){
            r_str += this.dfsPostOrder(node.right);
        }
        return (l_str + " " + r_str + " " + node.value);
    };

};

rl.once('line', (_n) => {
    n = parseInt(_n);
    rl.on('line', (_line)=>{
        lines.push(_line);
        nodes.push(new Node(parseInt(_line.split(" ")[0])));
    });
}).on('close', ()=>{

    for(let i = 0; i < n; i++){
        let l = parseInt(lines[i].split(" ")[1]);
        let r = parseInt(lines[i].split(" ")[2]);
        if(l != -1){
            nodes[i].left = nodes[l];
            nodes[l].parent = nodes[i];
        }
        if(r != -1){
            nodes[i].right = nodes[r];
            nodes[r].parent = nodes[i];
        }
    } // Making Tree
    let tree = new Tree(nodes[0]);  //

    let answerIn = tree.dfsInOrder(tree.root);
    let answerPre = tree.dfsPreOrder(tree.root);
    let answerPost = tree.dfsPostOrder(tree.root);

    process.stdout.write(answerIn + '\n' + answerPre + '\n' + answerPost);
});
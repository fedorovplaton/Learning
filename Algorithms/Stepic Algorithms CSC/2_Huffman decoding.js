const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let inputStr, n, l, decoStr;
let map = new Map();

function Node(_char){
    this.leftChild = null;
    this.rightChild = null;
    this.char = _char;
}

let root = new Node('');

function createNewNode(_char, _charStr){
    currentNode = root;
    for(let i = 0; i < _charStr.length; i++){
        if(_charStr[i] == '0'){
            if(currentNode.leftChild !== null){
                currentNode = currentNode.leftChild;
            }
            else{
                currentNode.leftChild = new Node('');
                currentNode = currentNode.leftChild;
            }
        }
        else{
            if(currentNode.rightChild !== null){
                currentNode = currentNode.rightChild;
            }
            else{
                currentNode.rightChild = new Node('');
                currentNode = currentNode.rightChild;
            }
        }
    }
    currentNode.char = _char;
}


rl.once('line', (_input)=> {
    [_n, _l] = _input.split(" ");
    n = parseInt(_n);
    l = parseInt(_l);
    let i = 0;
    rl.on('line', (line)=>{
        if(i < n){
            map.set(line.split(" ")[0][0], line.split(" ")[1]);
            i++;
        }
        else{
            decoStr = line;
        }
    });
}).on('close', ()=>{

    //Create tree
    for(let entry of map){
        [_a, _b] = entry;
        createNewNode(_a, _b);
    }
    //Decoding
    let answer = "";
    let node = root;

    for(let i = 0; i < decoStr.length; i++){
        if (decoStr[i] == '0') {
            node = node.leftChild;
        } else {
            node = node.rightChild;
        }
        if(node.char != ''){
            answer += node.char;
            node = root;
        }
    }
    process.stdout.write(answer);
});

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let inputStr;

function f(str) {
    var ob = {};
    for(var i = 0; i < str.length; i++){
        if(ob.hasOwnProperty(str[i]))
            ob[str[i]]++;
        else
            ob[str[i]] = 1;
    }
    return ob;
}

function PQUEUE() {
    this.pQ = [];

    this.add = function (new_elem) {
        this.pQ.push(new_elem);
    };

    this.print = function () {
        for(let i = 0; i < this.pQ.length; i++){
            console.log(this.pQ[i]);
        }
    };

    this.printValue = function () {
        let _ret = "";
        for(let i = 0; i < this.pQ.length; i++){
            _ret += this.pQ[i].value + " ";
        }
        console.log(_ret);
    };

    this.getLP = function () {
        if(this.pQ.length != 0){
            let ret = this.pQ[0].value;
            let j = 0;
            for(let i = 1; i < this.pQ.length; i++){
                if(this.pQ[i].value < ret) {
                    ret = this.pQ[i].value;
                    j = i;
                }
            }
            return this.pQ.splice(j, 1)[0];
        }
        else
            console.log("Error 1");
    };

    this.getLength = function () {
        return this.pQ.length;
    };
}

function Node(_value, _char){
    this.leftChild = null;
    this.rightChild = null;
    this.parent = null;
    this.value = _value;
    this.char = _char;
}

let map = new Map();

function dfsCoding(root, str){
    if(root.leftChild !== null){
        dfsCoding(root.leftChild, str + "0");
    }
    if(root.rightChild !== null){
        dfsCoding(root.rightChild, str + "1");
    }
    if(root.leftChild === null && root.rightChild === null){
        map.set(root.char.toString(), str);
    }
    return;
}

rl.once('line', (_input)=> {
    inputStr = _input;
}).on('close', ()=>{
    //console.log(inputStr);
    let symbolCounter = f(inputStr);
    let pQueue = new PQUEUE();

    for(char in symbolCounter){
        pQueue.add(new Node(symbolCounter[char],char));
    }


    if(pQueue.getLength() != 1) {
        do {
            let a = pQueue.getLP();
            let b = pQueue.getLP();
            let c = new Node(a.value + b.value, "");
            a.parent = c;
            b.parent = c;
            c.leftChild = a;
            c.rightChild = b;
            pQueue.add(c);
            //pQueue.print();
            //console.log("________________________________________")
        } while (pQueue.getLength() != 1);

        dfsCoding(pQueue.getLP(), "");

    }
    else{
        map.set(inputStr[0], "0");
    }
    //__________________________________________

    let codeStr = "";
    for(let i = 0; i < inputStr.length; i++){
        codeStr += map.get(inputStr[i]);
    }

    let ans_str = "";

    ans_str += map.size + " " + codeStr.length + '\n';

    for (let entry of map) {
        [_a, _b] = entry;
        ans_str += _a + ": " + _b +'\n';
    }

    ans_str += codeStr;

    process.stdout.write(ans_str);
});

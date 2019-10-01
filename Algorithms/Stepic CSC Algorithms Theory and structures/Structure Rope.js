const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let commands = [];
let str;



let Node = function(leftChild, rightChild, w, s){
    this.w = w;
    this.h = Math.max((leftChild === null)?(-1):(leftChild.h),(rightChild === null)?(-1):(rightChild.h)) + 1;
    this.s = s;
    this.left = leftChild;
    this.right = rightChild;

};

function printing(node) {
    if(node === null){
        return "Tree is empty";
    }

    let l_str = '';
    let r_str = '';

    if(node.left === null && node.right === null){
        return node.s;
    }

    if(node.left !== null){
        l_str += printing(node.left);
    }
    if(node.right !== null){
        r_str += printing(node.right);
    }
    return l_str + r_str;
}

function print(node) {
    console.log(printing(node));
};

function dfsprint(node) {
    if(node === null){
        return "Tree is empty";
    }

    let l_str = '';
    let r_str = '';

    if(node.left === null && node.right === null){
        return (node.s + ":" + node.h + ":"+ node.w);
    }

    if(node.left !== null){
        l_str += dfsprint(node.left);
    }
    if(node.right !== null){
        r_str += dfsprint(node.right);
    }
    return (l_str + " " +  "_:" + node.h + ':' + node.w + " " + r_str);
}

function getByIndex(node, i){
    if(node.left !== null){
        if(node.left.w >= i) {
            return getByIndex(node.left, i);
        }
        else{
            return getByIndex(node.right, i - node.left.w);
        }
    }
    else {
        return node.s[i];
    }
};

function smallBalance(node) {
    if(node === null)
        return;
    if(node.left === null && node.right === null){
        return;
    }
    else {


        if (node.right !== null) {
            if (node.right.left !== null && node.right.right === null) {
                node.right = node.right.right;
                smallBalance(node.right);
            }
            if (node.right.left === null && node.right.right !== null) {
                node.right = node.right.left;
                smallBalance(node.right);
            }
        }

        if (node.left !== null) {
            if (node.left.left !== null && node.left.right === null) {
                node.left = node.left.left;
                smallBalance(node.left);
            }
            if (node.left.left === null && node.left.right !== null) {
                node.left = node.left.right;
                smallBalance(node.left);
            }
        }
    }
}

function merge(n, m){
    return new Node(n, m, n.w + m.w, '');
};

function AVLmerge(n, m) {
    if(n === null)
        return m;
    if(m === null)
        return n;
    if(Math.abs(n.h - m.h) <= 1){
        let ans = merge(n, m);
        ans.h = Math.max((ans.left === null)?(-1):(ans.left.h),(ans.right === null)?(-1):(ans.right.h)) + 1;
        return ans;
    }
    if(n.h > m.h){
        let rightMerged = AVLmerge(n.right, m);
        n.right = rightMerged;
        n.w = 0;
        if(n.left !== null) n.w += n.left.w;
        if(n.right !== null) n.w += n.right.w;
        //n.w = n.left.w + n.right.w;
        n.h = Math.max((n.left === null)?(-1):(n.left.h),(n.right === null)?(-1):(n.right.h)) + 1;
        //console.log(dfsprint(n));
        return balance(n);
        //return n;
    }
    else{
        let leftMerged = AVLmerge(n, m.left);
        m.left = leftMerged;
        m.w = 0;
        if(m.left !== null) m.w += m.left.w;
        if(m.right !== null) m.w += m.right.w;
        m.h = Math.max((m.left === null)?(-1):(m.left.h),(m.right === null)?(-1):(m.right.h)) + 1;
        //console.log(dfsprint(m));
        return balance(m);
    }
}

function balance(node) {
    if(Math.abs(node.left.h - node.right.h) <= 1){
        return node;
    }
    else{
        //console.log('balancing');
        //console.log(dfsprint(node) + printing(node));
        if(node.left.h < node.right.h){
            //console.log('left.h < right.h');
            if(node.right.left === null || node.right.right.h >= node.right.left.h){
                //console.log('do_small');
                return smallLeftRotate(node);
            }
            else{
                //console.log('do_big');
                let a = node;
                let b = node.right;
                let g = b.left;

                a.right = g.left;
                b.left = g.right;

                g.left = a;
                g.right = b;

                updateHeight(a);
                updateHeight(b);
                updateHeight(g);

                return g;
            }
        }
        else{
            //console.log('left.h > right.h');
            if(node.left.right === null || node.left.left.h >= node.left.right.h){
                //console.log('do_small');
                return smallRightRotate(node);
            }
            else{
                //console.log('do_bid');
                 /*
                node.left = smallRightRotate(node);
                return smallLeftRotate(node);
                 */
                let a = node;
                let b = a.left;
                let g = b.right;

                b.right = g.left;
                a.left = g.right;

                g.left = b;
                g.right = a;

                updateHeight(a);
                updateHeight(b);
                updateHeight(g)

                return g;
            }
        }
    }
}

function smallLeftRotate(node){
    //console.log('3');
    let b = node.right;
    node.right = b.left;
    b.left = node;
    //console.log('1');
    updateHeight(node);
    //console.log('2');
    updateHeight(b);
    return b;
};

function smallRightRotate(node){
    //console.log('4');
    let b = node.left;
    node.left = b.right;
    b.right = node;
    //console.log('1');
    updateHeight(node);
    //console.log('2');
    updateHeight(b);
    return b;
};

function updateHeight(node){
    //console.log(node.w);
    //console.log(node);
    node.h = Math.max((node.left === null)?(-1):(node.left.h),(node.right === null)?(-1):(node.right.h)) + 1;
    //console.log(node.left.w + "_________" + node.right.w + " " + (node.left!== null) + " " + (node.right !== null));

    //node.w = (node.left !== null)?(node.left.w):(0) + (node.right !== null)?(node.right.w):(0);


    node.w = 0;
    if(node.left !== null) node.w += node.left.w;
    if(node.right !== null) node.w += node.right.w;


    //console.log(node.w);
}; // ?

function split(node, i){
    if(i == 0)
        return {first: null, second: node};
    if(node == null)
        return {first:null, second:null};
    //console.log('Запускаем split от ' + printing(node) + ' по индексу ' + i);
    let tree1 = new Node(null, null, 0, '');
    let tree2 = new Node(null, null, 0, '');

    if(node.left != null){
        if(node.left.w >= i){
            let res = split(node.left, i);
            tree1 = res.first;

            //console.log('Запускаю слияние л ' + printing(res.second) +" "+ dfsprint(res.second)  + " " + printing(node.right) + " " + dfsprint(node.right));
            tree2 = AVLmerge(res.second, node.right);
            //console.log('По завершению слияния получилось: ' + printing(tree2) + " " + dfsprint(tree2));

            //tree2.w = (tree2.left !== null)?(tree2.left.w):(0) + (tree2.right !== null)?(tree2.right.w):(0);
            //tree2.w = tree2.left.w + tree2.right.w;

            updateHeight(tree2);
        }
        else{
            let res = split(node.right, i - node.left.w);
            tree2 = res.second;

            //console.log('Запускаю слияние п ' + printing(node.left)+ " " + dfsprint(node.left) + " " + printing(res.first) + " " +dfsprint(res.first));
            tree1 = AVLmerge(node.left, res.first);
            //console.log('По завершению слияния получилось: ' + printing(tree1));

            //tree1.w = (tree1.left !== null)?(tree1.left.w):(0) + (tree1.right !== null)?(tree1.right.w):(0);
            //tree1.w = tree1.left.w + tree1.right.w;
            //smallBalance(tree1);

            updateHeight(tree1); //?
        }
    }
    else{
        tree1.s = node.s.slice(0, i);
        tree2.s = node.s.slice(i, node.s.length);

        tree1.w = i;
        tree2.w = node.s.length - i;

        return {first: tree1, second: tree2};
    }
    if(tree1 !== null && tree1.h === 0 && tree1.s === '') tree1 = null;
    if(tree2 !== null && tree2.h === 0 && tree2.s === '') tree2 = null;
    //console.log('В результате split по индексу ' + i + ' Получилось ' + printing(tree1) + " " + dfsprint(tree1) + ' ' + printing(tree2) + " " + dfsprint(tree2));
    return {first: tree1, second: tree2};
}


function one(string, a, b, c){
    let root = new Node(null, null, string.length, string);

    let firstSplit = split(root, a);
    let forK = split(firstSplit.second, (b - a) + 1);

    let toPush = AVLmerge(firstSplit.first, forK.second);

    //console.log(printing(forK.first) + " push to " + printing(toPush) + " on the place after: " + c + " place");

    let LR = split(toPush, c);

    //console.log(printing(LR.first) + " " + printing(forK.first) + " " +printing(LR.second));

    root = AVLmerge(LR.first, AVLmerge(forK.first, LR.second));

    return printing(root);
}

function two(string, a, b, c){
    str = string;

    let push = str.slice(a, b + 1);

    let forK = str.slice(0, a).concat(str.slice(b + 1, str.length));

    //console.log(push + "  " + forK);

    if (c == 0) {
        str = push.concat(forK);
    } else {
        let l = forK.slice(0, c);
        let r = forK.slice(c, forK.length);

        str = l.concat(push, r);
    }

    //console.log(l + " " + r);

    //str = l.concat(push, r);
    return str;
}



rl.once('line', (_str) => {
    str = _str;
    rl.once('line', (_q)=>{
        rl.on('line', (command)=>{
            commands.push(command);
        });
    });
}).on('close', ()=>{

    let N = 1;
    for(let M = 1; M < 300000; M++) {
        //console.log('M = ' + M);

        let errors = [];

        for (let i = 0; i < N; i++) {
            let a = [];
            for (let j = 0; j < M; j++) {
                a.push(97 + parseInt(Math.random() * 25));
            }
            let STR = a.map((a) => {
                return String.fromCharCode(a)
            }).join("");

            let $a = parseInt(Math.random() * STR.length - 1);
            let $b = $a + parseInt(Math.random() * (STR.length - 1 - $a));
            let $c = parseInt(Math.random() * (STR.length - ($b - $a + 1)));

            if (one(STR, $a, $b, $c) != two(STR, $a, $b, $c)) {
                errors.push(STR + " " + $a + " " + $b + " " + $c);
            }
            //console.log(STR + " " + $a + " " + $b + " " + $c + " " + one(STR, $a, $b, $c) + " " + two(STR, $a, $b, $c) + " " + (one(STR, $a, $b, $c) == two(STR, $a, $b, $c)));

        }

        if(errors.length != 0) {
            console.log('ERROR\'S');
            for (let i = 0; i < errors.length; i++) {
                console.log(errors[i]);
            }
        }
    }
});

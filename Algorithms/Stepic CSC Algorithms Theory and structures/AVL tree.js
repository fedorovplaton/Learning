const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let n;
let s = 0;
let p = 1000000001;
let answer = "";

let Node = function(_value){
    this.value = parseInt(_value);
    this.height = 0;
    this.sum = parseInt(_value);
    this.left = null;
    this.right = null;
    this.parent = null;
};

let AVLtree = function(){
    this.root = null;

    this.sum = function () {
        if(this.root === null)
            return "0, tree is empty";
        else{
            return this.root.sum;
        }
    };

    this.height = function () {
        return root.height;
    };

    this.reSum = function (resumedNode) {
        if(resumedNode === null)
            return;
        resumedNode.sum = resumedNode.value;
        if(resumedNode.left !== null)
            resumedNode.sum += resumedNode.left.sum;
        if(resumedNode.right !== null)
            resumedNode.sum += resumedNode.right.sum;
    };

    this.reHeight = function (currentNode) {
        if(currentNode === null)
            return;
        let lHeight = (currentNode.left === null)?(-1):(currentNode.left.height);
        let rHeight = (currentNode.right === null)?(-1):(currentNode.right.height);

        this.reSum(currentNode);

        if(lHeight == -Infinity && rHeight == -Infinity) {
            currentNode.height = 0;
            this.reHeight(currentNode.parent);
        }
        else{
            currentNode.height = Math.max(lHeight, rHeight) + 1;
            if (Math.abs(lHeight - rHeight) > 1) {
                this.balance(currentNode);
            }
            this.reHeight(currentNode.parent);
        }

        return;
    };

    this.dfsInOrderBetween = function(node, min, max){
        let ans = 0;
        if(node === null){
            return ans;
        }

        if(node.left === null && node.right === null){
            if(node.value >= min && node.value <= max) {
                return ans + node.value;
            }
            else
                return ans;
        }

        if(node.left !== null){
            ans += this.dfsInOrderBetween(node.left, min, max);
        }
        if(node.right !== null){
            ans += this.dfsInOrderBetween(node.right, min, max);
        }
        if(node.value >= min && node.value <= max)
            return ans + node.value;
        else
            return ans;
    };

    this.dfsInOrder = function (node) {
        if(node === null){
            return "Tree is empty";
        }

        let l_str = '';
        let r_str = '';

        if(node.left === null && node.right === null){
            return "" + node.value + ":" + node.height + ":" + node.sum;
        }

        if(node.left !== null){
            l_str += this.dfsInOrder(node.left);
        }
        if(node.right !== null){
            r_str += this.dfsInOrder(node.right);
        }
        return (l_str + " " +node.value + ":" + node.height + ":" + node.sum + " " + r_str);
    };

    this.dfsInOrderSum = function(node){
        let ans = 0;
        if(node === null){
            return ans;
        }

        if(node.left === null && node.right === null){
            return ans + node.value;
        }

        if(node.left !== null){
            ans += this.dfsInOrderSum(node.left);
        }
        if(node.right !== null){
            ans += this.dfsInOrderSum(node.right);
        }
        return ans + node.value;

    };

    this.add = function (newNodeValue) {
        if(this.root === null) {
            this.root = new Node(newNodeValue)
        }
        else{
            this.adding(this.root, newNodeValue);
        }

    };

    this.adding = function (currentNode, newNodeValue) {
        if(currentNode.value == newNodeValue){
            return;
        }
        if(currentNode.value < newNodeValue){
            if(currentNode.right !== null) {
                this.adding(currentNode.right, newNodeValue);
            }
            else{
                currentNode.right = new Node(newNodeValue);
                currentNode.right.parent = currentNode;
                this.reHeight(currentNode);
            }
            return;
        }
        if(currentNode.value > newNodeValue){
            if(currentNode.left !== null){
                this.adding(currentNode.left, newNodeValue);
            }
            else{
                currentNode.left = new Node(newNodeValue);
                currentNode.left.parent = currentNode;
                this.reHeight(currentNode);
            }
        }
    };

    this.find = function (nodeValue) {
        if(this.root === null)
            return false;
        else
            return this.finding(this.root, nodeValue)
    };

    this.finding = function (currentNode, nodeValue) {
        if(currentNode.value == nodeValue){
            return true;
        }
        else{
            if(nodeValue > currentNode.value){
                if(currentNode.right === null)
                    return false;
                else
                    return this.finding(currentNode.right, nodeValue);
            }
            if(nodeValue < currentNode.value){
                if(currentNode.left === null)
                    return false;
                else
                    return this.finding(currentNode.left, nodeValue);
            }
        }
    };

    this.delete = function (deleteNodeValue) {
        if(this.root === null){
            return;
        }else {
            this.deleting(this.root, deleteNodeValue);
        }
    };

    this.deleting = function (currentNode, deleteNodeValue) {
        if(currentNode.value == deleteNodeValue && currentNode.left === null && currentNode.right === null){
            if(currentNode.parent === null) {
                currentNode = null;
                this.root = null;
                return;
            }
            else{
                let leftChild = (currentNode.parent.left == currentNode)?(true):(false);
                let reHeightNodeStart = currentNode.parent;
                if(leftChild){
                    currentNode.parent.left = null;
                }
                else{
                    currentNode.parent.right = null;
                }
                this.reHeight(reHeightNodeStart);
                return;
            }
        }
        if(currentNode.value == deleteNodeValue && (currentNode.left === null || currentNode.right === null)){
            let swapWithCurrentNode = (currentNode.left === null)?(currentNode.right):(currentNode.left);
            swapWithCurrentNode.parent = currentNode.parent;

            if(swapWithCurrentNode.parent === null){
                this.root = swapWithCurrentNode;
                return;
            }
            let leftChild = (currentNode.parent.left == currentNode)?(true):(false);
            if(leftChild){
                currentNode.parent.left = swapWithCurrentNode;
            }
            else{
                currentNode.parent.right = swapWithCurrentNode;
            }
            this.reHeight(swapWithCurrentNode.parent);
            return;
        }
        if(currentNode.value == deleteNodeValue){
            let maxLeft = currentNode.left;
            while(maxLeft.right !== null){
                maxLeft = maxLeft.right;
            }

            let c = maxLeft.value;
            maxLeft.value = currentNode.value;
            currentNode.value = c;
            let maxLeftParent = maxLeft.parent;
            this.deleting(maxLeft, deleteNodeValue);
            this.reHeight(maxLeftParent);
            return;
        }
        if((deleteNodeValue < currentNode.value && currentNode.left === null) || (deleteNodeValue > currentNode.value && currentNode.right === null))
            return;
        if(deleteNodeValue < currentNode.value){
            this.deleting(currentNode.left, deleteNodeValue);
        }else{
            this.deleting(currentNode.right, deleteNodeValue);
        }
    };

    this.balance = function (balanceNode) {
            if(balanceNode.right !== null && ( balanceNode.left === null || balanceNode.right.height > balanceNode.left.height)){
                let smallRightReBalance = (balanceNode.right.left === null || (balanceNode.right.right !== null && balanceNode.right.right.height > balanceNode.right.left.height))?(true):(false);
                if(smallRightReBalance){

                    let notRoot = (balanceNode.parent !== null)?(true):(false);

                    if(notRoot){
                        if(balanceNode.parent.left == balanceNode) {
                            balanceNode.parent.left = balanceNode.right;
                        }
                        else
                            balanceNode.parent.right = balanceNode.right;
                    }
                    else{
                        this.root = balanceNode.right;
                    }
                    balanceNode.right.parent = balanceNode.parent;

                    balanceNode.parent = balanceNode.right;

                    balanceNode.right = balanceNode.right.left;

                    if(balanceNode.parent.left !== null) {
                        balanceNode.parent.left.parent = balanceNode;
                    }

                    balanceNode.parent.left = balanceNode;

                    let lHeight = (balanceNode.left === null)?(-1):(balanceNode.left.height);
                    let rHeight = (balanceNode.right === null)?(-1):(balanceNode.right.height);
                    balanceNode.height = Math.max(lHeight, rHeight) + 1;

                    this.reSum(balanceNode);
                }
                else{
                    let notRoot = (balanceNode.parent !== null)?(true):(false);

                    if(notRoot) {
                        if (balanceNode.parent.right == balanceNode) {
                            balanceNode.parent.right = balanceNode.right.left;
                        } else {
                            balanceNode.parent.left = balanceNode.right.left;
                        }
                    }
                    else{
                        this.root = balanceNode.right.left;
                    }
                    balanceNode.right.left.parent = balanceNode.parent;

                    let savedG = balanceNode.right.left;
                    let savedA = balanceNode;
                    let savedB = balanceNode.right;

                    savedA.right = savedG.left;
                    savedB.left = savedG.right;

                    if(savedA.right !== null) {
                        savedA.right.parent = savedA;
                    }
                    if(savedB.left !== null) {
                        savedB.left.parent = savedB;
                    }

                    savedA.parent = savedG;
                    savedB.parent = savedG;

                    savedG.left = savedA;
                    savedG.right = savedB;

                    let lHeight = (savedA.left === null)?(-1):(savedA.left.height);
                    let rHeight = (savedA.right === null)?(-1):(savedA.right.height);
                    savedA.height = Math.max(lHeight, rHeight) + 1;

                    lHeight = (savedB.left === null)?(-1):(savedB.left.height);
                    rHeight = (savedB.right === null)?(-1):(savedB.right.height);
                    savedB.height = Math.max(lHeight, rHeight) + 1;

                    lHeight = (savedG.left === null)?(-1):(savedG.left.height);
                    rHeight = (savedG.right === null)?(-1):(savedG.right.height);
                    savedG.height = Math.max(lHeight, rHeight) + 1;

                    this.reSum(savedA);
                    this.reSum(savedB);
                }
            }
            else{
                let smallLeftReBalance = (balanceNode.left.right === null || ( balanceNode.left.left !== null && balanceNode.left.left.height > balanceNode.left.right.height))?(true):(false);
                if(smallLeftReBalance){

                    let notRoot = (balanceNode.parent !== null)?(true):(false);

                    if(notRoot){
                        if(balanceNode.parent.left == balanceNode) {
                            balanceNode.parent.left = balanceNode.left;
                        }
                        else
                            balanceNode.parent.right = balanceNode.left;
                    }
                    else{
                        this.root = balanceNode.left;
                    }
                    balanceNode.left.parent = balanceNode.parent;

                    balanceNode.parent = balanceNode.left;

                    balanceNode.left = balanceNode.left.right;

                    if(balanceNode.parent.right !== null) {
                        balanceNode.parent.right.parent = balanceNode;
                    }

                    balanceNode.parent.right = balanceNode;

                    let lHeight = (balanceNode.left === null)?(-1):(balanceNode.left.height);
                    let rHeight = (balanceNode.right === null)?(-1):(balanceNode.right.height);
                    balanceNode.height = Math.max(lHeight, rHeight) + 1;

                    this.reSum(balanceNode);

                }
                else{
                    let notRoot = (balanceNode.parent !== null)?(true):(false);

                    if(notRoot) {
                        if (balanceNode.parent.right == balanceNode) {
                            balanceNode.parent.right = balanceNode.left.right;
                        } else {
                            balanceNode.parent.left = balanceNode.left.right;
                        }
                    }
                    else{
                        this.root = balanceNode.left.right;
                    }
                    balanceNode.left.right.parent = balanceNode.parent;

                    let savedG = balanceNode.left.right;
                    let savedA = balanceNode;
                    let savedB = balanceNode.left;

                    savedA.left = savedG.right;
                    savedB.right = savedG.left;

                    if(savedA.left !== null) {
                        savedA.left.parent = savedA;
                    }
                    if(savedB.right !== null) {
                        savedB.right.parent = savedB;
                    }

                    savedA.parent = savedG;
                    savedB.parent = savedG;

                    savedG.right = savedA;
                    savedG.left = savedB;

                    let lHeight = (savedA.left === null)?(-1):(savedA.left.height);
                    let rHeight = (savedA.right === null)?(-1):(savedA.right.height);
                    savedA.height = Math.max(lHeight, rHeight) + 1;

                    lHeight = (savedB.left === null)?(-1):(savedB.left.height);
                    rHeight = (savedB.right === null)?(-1):(savedB.right.height);
                    savedB.height = Math.max(lHeight, rHeight) + 1;

                    lHeight = (savedG.left === null)?(-1):(savedG.left.height);
                    rHeight = (savedG.right === null)?(-1):(savedG.right.height);
                    savedG.height = Math.max(lHeight, rHeight) + 1;

                    this.reSum(savedB);
                    this.reSum(savedA);
                }
            }
    };

    this.getMaxWithDeleting = function (startNode) {
        let max = startNode;
        while (max.right !== null){
            max = max.right;
        }
        this.deleting(max, max.value);
        max.parent = null;
        return max;
    };

    this.getMinWithDeleting = function (startNode) {
        let min = startNode;
        while(min.left !== null){
            min = min.left;
        }
        this.deleting(min, min.value);
        min.parent = null;
        return min;
    };

    this.saveGetMinWithDeleting = function (startNode) {
        let min = startNode;
        while(min.left !== null){
            min = min.left;
        }
        if(startNode == min)
            return startNode;
        else {
            this.deleting(min, min.value);
            min.parent = null;
            return min;
        }
    };
};

let mergeWithRoot = function(tree1Node, tree2Node, newRootNode){
    newRootNode.left = tree1Node;
    newRootNode.right = tree2Node;
    if(tree1Node !== null) {
        tree1Node.parent = newRootNode;
    }
    tree2Node.parent = newRootNode;
    newRootNode.parent = null;
    return newRootNode;
};

let AVLmergeWithRoot = function(tree1, tree2){
    let n1 = tree1.root;
    let n2 = tree2.root;
    if(n1 === null)
        return tree2;
    if(n2 === null)
        return tree1;
    if(Math.abs(n1.height - n2.height) <= 1){
        //console.log("ok");
        let leftMax = tree1.getMaxWithDeleting(tree1.root);
        //console.log("leftMax: " + leftMax.value);
        //console.log(tree1.root);
        let newRoot = mergeWithRoot(tree1.root, tree2.root, leftMax);
        //console.log(newRoot);
        let returnTree = new AVLtree();
        returnTree.root = newRoot;
        returnTree.reHeight(returnTree.root);
        return returnTree;
    }

    if(n1.height > n2.height) {
        while (Math.abs(n1.height - n2.height) > 1) {
            n1 = n1.right;
        }

        let n1parent = n1.parent;
        let leftMax = tree1.getMaxWithDeleting(n1);
        if(n1.value == leftMax.value){
            n1.right = n2;
            n2.parent = n1;
            tree1.reHeight(n1);
            return tree1;
        }
        else {
            let newRoot = mergeWithRoot(n1, n2, leftMax);
            n1parent.right = newRoot;
            newRoot.parent = n1parent;
            tree1.reHeight(newRoot);
            return tree1;
        }
    }
    else{
        while (Math.abs(n1.height - n2.height) > 1) {
            n2 = n2.left;
        }

        let n2parent = n2.parent;
        let rightMin = tree2.saveGetMinWithDeleting(n2);
        if(n2.value == rightMin.value){
            n2.left = n1;
            n1.parent = n2;
            tree2.reHeight(n2);
            return tree2;
        }
        else {
            let newRoot = mergeWithRoot(n1, n2, rightMin);
            n2parent.left = newRoot;
            newRoot.parent = n2parent;
            tree2.reHeight(newRoot);
            return tree2;
        }
    }
};

let getSumLessThen = function(tree, lessValue){
    let sum = 0;
    let currentNode = tree.root;
    while(currentNode !== null){
        if(currentNode.value > lessValue){
            currentNode = currentNode.left;
            continue;
        }
        if(currentNode.value < lessValue){
            sum += currentNode.value ;
            if(currentNode.left !== null) {
                sum += currentNode.left.sum;
            }
            currentNode = currentNode.right;
            continue;
        }
        if(currentNode.value == lessValue){
            if(currentNode.left !== null) {
                sum += currentNode.left.sum;
            }
            break;
        }
    }
    return sum;
};

let getSumMoreThen = function(tree, moreValue){
    let sum = 0;
    let currentNode = tree.root;
    while(currentNode !== null){
        if(currentNode.value < moreValue){
            currentNode = currentNode.right;
            continue;
        }
        if(currentNode.value > moreValue){
            sum += currentNode.value;
            if(currentNode.right !== null)
                sum += currentNode.right.sum;
            currentNode = currentNode.left;
            continue;
        }
        if(currentNode.value == moreValue){
            if(currentNode.right !== null){
                sum += currentNode.right.sum;
            }
            break;
        }
    }
    return sum;
};

let getSumBetween = function(tree, min, max){
    if(tree.root !== null) {
        let sum = tree.root.sum;
        sum -= (getSumLessThen(tree, min) + getSumMoreThen(tree, max));
        return sum;
    }
    else{
        return 0;
    }
};

let f = function(value){
    return (value + (s%p))%p
};

rl.once('line', (_n) => {
    let tree = new AVLtree();
    n = parseInt(_n);
    rl.on('line', (command)=>{
        if(command[0] == '+'){
            tree.add(f(parseInt(command.split(" ")[1])));
        }
        if(command[0] == '-'){
            tree.delete(f(parseInt(command.split(" ")[1])));
        }
        if(command[0] == '?'){
            answer += (tree.find(f(parseInt(command.split(" ")[1]))))?("Found\n"):("Not found\n");
        }
        if(command[0] == 's'){
            let l = f(parseInt(command.split(" ")[1]));
            let r = f(parseInt(command.split(" ")[2]));
            let anssum = getSumBetween(tree, l, r);
            s = (anssum) % p;
            answer += anssum + '\n';
        }
        //console.log(answer);
    });
}).on('close', ()=>{
    console.log(answer);


    /*
    let tree = new AVLtree();

    let checker_arr = [];
    let N = 100000;
    for(let i = 0; i < N; i++){
        checker_arr.push(parseInt(Math.random() * N * 10));
    }

    console.log(checker_arr.join(" "));

    for(let i = 0; i < N; i++){
        tree.add(checker_arr[i]);
    }

    console.log("added: " + tree.dfsInOrder(tree.root));

    console.log("Sum" + tree.sum());
    console.log("Real sum: " + tree.dfsInOrderSum(tree.root));
     // ADDING CHECKER

    console.log("sum between: [" + 20 + " and " + 60 + "]: " + getSumBetween(tree, 20, 60));
    console.log("real sum between: " + tree.dfsInOrderBetween(tree.root, 20, 60)); */

    /*
    let L = 1;
    let tree1 = new AVLtree();

    for(let i = 0; i < L; i++){
        tree1.add(parseInt(Math.random() * 100));
    }
    let R = 6;
    let tree2 = new AVLtree();

    for(let i = 0; i < R; i++){
        tree2.add(parseInt(101 + Math.random() * 100));
    }

    console.log(tree1.dfsInOrder(tree1.root));
    console.log();
    console.log(tree2.dfsInOrder(tree2.root));
    console.log();

    let answerTree = AVLmergeWithRoot(tree1, tree2);

    console.log(answerTree.dfsInOrder(answerTree.root));  */// MERGE CHECKER


    //console.log(answerTree.root);
    //console.log(answerTree.dfsInOrder(answerTree.root));

/*
    tree.add(2);
    tree.add(1);
    tree.add(5);
    tree.add(3);
    tree.add(6);
    console.log("1: " + tree.dfsInOrder(tree.root));
    tree.add(4);
    console.log("2: " + tree.dfsInOrder(tree.root));
    tree.add(7);
    console.log("3: " + tree.dfsInOrder(tree.root));
    tree.add(8);
    console.log("4: " + tree.dfsInOrder(tree.root));
    console.log(tree.root);
    tree.add(0);
    console.log("5: " + tree.dfsInOrder(tree.root));
    tree.add(-1);
    console.log("6: " + tree.dfsInOrder(tree.root));
    tree.add(-2);
    console.log("7: " + tree.dfsInOrder(tree.root));
    tree.add(9);
    console.log("8: " + tree.dfsInOrder(tree.root));
    console.log(tree.root);
*/
    //console.log(checker_arr.join(" "));
});
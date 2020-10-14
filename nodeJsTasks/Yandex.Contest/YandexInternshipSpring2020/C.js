module.exports = function (inputData, inputDictionary) {
  //sortByCoordinates(inputData);
  inputData.sort(function (a,b) {
    return a.geometry[0] - b.geometry[0];
  })

  const textMessages = inputData.map(item => item.text);

  if (!textMessages) return "Unreadable message";
  if (!inputDictionary) return "Unreadable message";

  /*
  for (let i = 0; i < textMessages.length; i++) {
    if (!inputDictionary.includes(textMessages[i]))
      return "Unreadable message";
  }*/

  // Заполнение AVL

  let tree = new AVLtree();
  inputDictionary.forEach(item => {
    if (!tree.find(item))
      tree.add(item);
  });

  for (let i = 0; i < textMessages.length; i++) {
    if (!tree.find(textMessages[i]))
      return "Unreadable message";
  }

  //return textMessages.join(' ');
  return "Unreadable message";
}

let Node = function(_value){
  this.value = _value;
  this.height = 0;
  this.left = null;
  this.right = null;
  this.parent = null;
};

let AVLtree = function(){
  this.root = null;

  this.height = function () {
    return root.height;
  };

  this.reHeight = function (currentNode) {
    if(currentNode === null)
      return;
    let lHeight = (currentNode.left === null)?(-1):(currentNode.left.height);
    let rHeight = (currentNode.right === null)?(-1):(currentNode.right.height);

    if(lHeight === -Infinity && rHeight === -Infinity) {
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


  this.add = function (newNodeValue) {
    if(this.root === null) {
      this.root = new Node(newNodeValue)
    }
    else{
      this.adding(this.root, newNodeValue);
    }

  };

  this.adding = function (currentNode, newNodeValue) {
    if(currentNode.value === newNodeValue){
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
    if(currentNode.value === nodeValue){
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
    if(currentNode.value === deleteNodeValue && currentNode.left === null && currentNode.right === null){
      if(currentNode.parent === null) {
        currentNode = null;
        this.root = null;
        return;
      }
      else{
        let leftChild = (currentNode.parent.left === currentNode)?(true):(false);
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
    if(currentNode.value === deleteNodeValue && (currentNode.left === null || currentNode.right === null)){
      let swapWithCurrentNode = (currentNode.left === null)?(currentNode.right):(currentNode.left);
      swapWithCurrentNode.parent = currentNode.parent;

      if(swapWithCurrentNode.parent === null){
        this.root = swapWithCurrentNode;
        return;
      }
      let leftChild = (currentNode.parent.left === currentNode)?(true):(false);
      if(leftChild){
        currentNode.parent.left = swapWithCurrentNode;
      }
      else{
        currentNode.parent.right = swapWithCurrentNode;
      }
      this.reHeight(swapWithCurrentNode.parent);
      return;
    }
    if(currentNode.value === deleteNodeValue){
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
          if(balanceNode.parent.left === balanceNode) {
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
          if (balanceNode.parent.right === balanceNode) {
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
      let smallLeftReBalance = (balanceNode.left.right === null || ( balanceNode.left.left !== null && balanceNode.left.left.height > balanceNode.left.right.height))?true:false;
      if(smallLeftReBalance){

        let notRoot = (balanceNode.parent !== null)?(true):(false);

        if(notRoot){
          if(balanceNode.parent.left === balanceNode) {
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
        let notRoot = balanceNode.parent !== null;

        if(notRoot) {
          if (balanceNode.parent.right === balanceNode) {
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
};
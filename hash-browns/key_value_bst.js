class kvStore{
  constructor(){
    this.root;
  }
  createBinaryTree(key) {//consider making this a separate class
    let newNode = {};
    newNode.key = key;
    newNode.data = undefined;
    newNode.left = null;
    newNode.right = null;
    return newNode;
  }
  insertPair(key, value) {
    //let unicodeKey;
    // if (typeof key != "number") {
      let unicodeKey = this.convertToUnicode(key);
    // } else {
    //   unicodeKey = key;
    // }
    if (this.root == undefined) {
      this.root = this.createBinaryTree(unicodeKey);
      this.root.data = value;
      return value;
    }
    if (this.isPresent(unicodeKey)) {
      throw `key already present: ${key}`;
    }
    let newNode = this.searchAndInsert(unicodeKey, true);
    newNode.data = value;
    return value;
  }
  deletePair(key) {
    // let unicodeKey;
    // if (typeof key != "number") {
      let unicodeKey = this.convertToUnicode(key);
    // } else {
    //   unicodeKey = key;
    // }
    if (this.isPresent(unicodeKey)) {
      let targetNode = this.searchAndInsert(unicodeKey, false);
      let deletedValue = targetNode.data;
      let parentNode = this.findParent(unicodeKey);
      //If targetNode has one or no children,
      //to delete it, the pointer of its parent needs to be changed
  
      if (targetNode.left == null || targetNode.right == null) {
        //When the target node is the root node, having one or no children
        if (targetNode.key === this.root.key) {
          if (targetNode.left == null && targetNode.right == null) {
            this.root = undefined;
            return deletedValue;
          }
          if (targetNode.left != null) {
            this.root = this.root.left;
            return deletedValue;
            
          }
          this.root = this.root.right;
          return deletedValue;
        }
        //if the target node has a parent node, and has one or no children:
  
        //First, finding whether the target node is a left child or a right child
        let parentDirection;
        if (parentNode.left == null) {
          // if (parentNode.left.key === unicodeKey) {
            parentDirection = "right";
          // }
        } else {
          // if (parentNode.right !== null) {
          //   if (parentNode.right.key === unicodeKey) {
              parentDirection = "left";
            // }
          // }
        }
        //Then, replacing the relevant pointer of the parent node to the child of the target node or to null
        if (targetNode.left == null && targetNode.right == null) {
          parentNode[parentDirection] = null;
          return deletedValue;
        }
        if (targetNode.left == null) {
          parentNode[parentDirection].key = targetNode.right;
          return deletedValue;
        }
        parentNode[parentDirection] = targetNode.left;
        return deletedValue;
      }
  
      //If the target node has both children, its immediate successor should replace it
      //Immediate successor = left most child of the right child of the target node
      let successorNode = this.findLeftMost(targetNode.right);
      this.deletePair(successorNode.key);
      targetNode.key = successorNode.key;
      targetNode.data = successorNode.data;
      return deletedValue;
    }
    throw `key not present: ${key}`;
  }

  update(key, newValue) {
    // let unicodeKey;
    // if (typeof key != "number") {
      let unicodeKey = this.convertToUnicode(key);
    // } else {
    //   unicodeKey = key;
    // }
    if (this.isPresent(unicodeKey)) {
      let targetNode = this.searchAndInsert(unicodeKey, false);
      targetNode.data = newValue;
      return newValue;
    }
    throw `key not present: ${key}`;
  }
  lookUp(key) {
    let unicodeKey = this.convertToUnicode(key);
    if (this.isPresent(unicodeKey)) {
      let targetNode = this.searchAndInsert(unicodeKey, false);
      return targetNode.data;
    }
    throw `key not present: ${key}`;
  }
  convertToUnicode(key) {
    if(typeof key === "number"){
      return key;
    }
    let unicodeValue = 0;
    for (let i = 0; i < key.length; i++) {
      unicodeValue = unicodeValue + key.charCodeAt(i);
    }
    return unicodeValue;
  }
  isPresent(key) {
    let node = this.root;
    while (node !== undefined && node !== null) {
      if (node.key === key) {
        return true;
      }
      if (key < node.key) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return false;
  }
  searchAndInsert(key, insert, node = this.root) {
    if (node.key === key) {
      return node;
    }
    if (key < node.key) {
      if (node.left == null) {
        if (insert) {
          let newNode = this.createBinaryTree(key);
          node.left = newNode;
          return newNode;
        } else {
          throw `key not present: ${key}`;
        }
      }
      return this.searchAndInsert(key, insert, node.left);
    }
    if (node.right == null) {
      if (insert) {
        let newNode = this.createBinaryTree(key);
        node.right = newNode;
        return newNode;
      } else {
        throw `key not present: ${key}`;
      }
    }
    return this.searchAndInsert(key, insert, node.right);
  }
  findParent(key) {
    let node = this.root;
    if (node.key == key) {
      return node;
    }
    while (node.left != null || node.right != null) {
      if (node.left != null && node.right != null) {
        if (node.left.key == key || node.right.key == key) {
          return node;
        }
        if (key < node.key) {
          node = node.left;
        } else {
          node = node.right;
        }
      } else {
        if (node.left == null) {
          node = node.right;
        } else {
          node = node.left;
        }
      }
    }
    throw `key not present: ${key}`;
  }
  
  findLeftMost(node) {
    if (node.left == null) {
      return node;
    }
    return this.findLeftMost(node.left);
  }
}




















let phoneBook = new kvStore();

// phoneBook = insertPair("Bella", "2441139", phoneBook);

// phoneBook = insertPair("Emergency", "100", phoneBook);

// let BellaPhone = lookUp("Bella", phoneBook);
// console.log(`BellaPhone (after insertion): ${BellaPhone}`);

// update("Bella", "+91 2441139", phoneBook);
// BellaPhone = lookUp("Bella", phoneBook);
// console.log(`BellaPhone (after updation): ${BellaPhone}`);

// phoneBook = deletePair("Bella", phoneBook);

// console.log(`lookUp: Emergency ${lookUp("Emergency", phoneBook)}`);
// //console.log(`lookUp Bella (after deletion): ${lookUp("Bella", phoneBook)}`);
// console.log(phoneBook);

phoneBook.insertPair("Akbar", "+91 12345");
phoneBook.insertPair("Amar", "+91 45678");
phoneBook.insertPair("Antony", "+91 98765");
phoneBook.insertPair("Abir", "+91 11111");
phoneBook.insertPair("Hospitals", "+91 101");
phoneBook.insertPair("Sammer", "+91 99999");

phoneBook.deletePair("Akbar", phoneBook);
console.log(phoneBook.root);
console.log(phoneBook.lookUp("Abir"));
phoneBook.update("Abir", "+91 22222");
console.log(phoneBook.lookUp("Abir"));



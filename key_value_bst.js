class BinaryTree {
  constructor(key) {
    this.key = key;
    this.data = undefined;
    this.left = null;
    this.right = null;
  }
  insert(key, value) {
    let node = this;
    while (node != null && node !== undefined) {
      if (key < node.key) {
        if (node.left == null) {
          let newNode = new BinaryTree(key, value);
          node.left = newNode;
          return newNode;
        }
        node = node.left;
      } else {

        if (node.right == null) {
          let newNode = new BinaryTree(key, value);
          node.right = newNode;
          return newNode;
        }
        node = node.right;
      }
    }
    return this;
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

  isPresent(key) {
    return Boolean(this.findNode(key));
  }

  findNode(key) {
    let node = this;
    while (node !== undefined && node !== null) {
      if (node.key === key) {
        return node;
      }
      if (key < node.key) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return null;
  }

  update(key, newValue) {
    if (this.isPresent(key)) {
      let targetNode = this.findNode(key);
      targetNode.data = newValue;
      return newValue;
    }
    throw `key not present: ${key}`;
  }

  lookUp(key) {
    if (this.isPresent(key)) {
      let targetNode = this.findNode(key);
      return targetNode.data;
    }
    throw `key not present: ${key}`;
  }

  findParent(key) {
    let node = this;
    if (node.key == key) {
      return node;
    }
    while (node.left != null || node.right != null) {
      if (node.left != null && node.right != null) {
        if (node.left.key == key || node.right.key == key) {
          return node;
        }
        if (key < node.key) {
          if (node.left.key == key) {
            return node;
          }
          node = node.left;
        } else {
          if (node.right.key == key) {
            return node;
          }
          node = node.right;
        }
      } else {
        if (node.left == null) {
          if (node.right.key == key) {
            return node;
          }
          node = node.right;
        } else {
          if (node.left.key == key) {
            return node;
          }
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

  delete(key) {
    if (!this.isPresent(key)) {
      throw `key not present: ${key}`;
    }

    let targetNode = this.findNode(key);
    let parentNode = this.findParent(key);
    //If targetNode has one or no children,
    //to delete it, the pointer of its parent needs to be changed

    if (targetNode.left == null || targetNode.right == null) {
      //When the target node is the root node, having one or no children
      if (targetNode.key === this.key) {
        if (targetNode.left == null && targetNode.right == null) {
          return null;
        }
        if (targetNode.left != null) {
          return this.left;
        }
        return this.right;
      }
      //if the target node has a parent node, and has one or no children:

      //First, finding whether the target node is a left child or a right child
      let parentDirection;
      if (parentNode.left == null) {
        parentDirection = "right";
      } else {
        parentDirection = "left";
      }
      //Then, replacing the relevant pointer of the parent node to the child of the target node or to null
      if (targetNode.left == null && targetNode.right == null) {
        parentNode[parentDirection] = null;
        return this;
      }
      if (targetNode.left == null) {
        parentNode[parentDirection] = targetNode.right;
        return this;
      }
      parentNode[parentDirection] = targetNode.left;
      return this;
    }

    //If the target node has both children, its immediate successor should replace it
    //Immediate successor = left most child of the right child of the target node
    let successorNode = this.findLeftMost(targetNode.right);
    let newRoot = this.delete(successorNode.key);
    targetNode.key = successorNode.key;
    targetNode.data = successorNode.data;
    return newRoot;
  }
}

class KVStore {
  constructor() {
    this.root;
  }

  insertPair(key, value) {
    let unicodeKey = this.convertToUnicode(key);
    if (this.root == undefined) {
      this.root = new BinaryTree(unicodeKey, value);
      return value;
    }
    if (this.root.isPresent(unicodeKey)) {
      throw `key already present: ${key}`;
    }
    this.root.insert(unicodeKey, value);
    return value;
  }

  deletePair(key) {
    let unicodeKey = this.convertToUnicode(key);
    this.root = this.root.delete(unicodeKey);
  }

  lookUp(key) {
    return this.root.lookUp(this.convertToUnicode(key));
  }

  update(key, value) {
    return this.root.update(this.convertToUnicode(key), value);
  }

  convertToUnicode(key) {
    if (typeof key === "number") {
      return key;
    }
    let unicodeValue = 0;
    for (let i = 0; i < key.length; i++) {
      unicodeValue = unicodeValue + key.charCodeAt(i);
    }
    return unicodeValue;
  }
}

let phoneBook = new KVStore();

phoneBook.insertPair("Akbar", "+91 12345");
phoneBook.insertPair("Amar", "+91 45678");
phoneBook.insertPair("Antony", "+91 98765");
phoneBook.insertPair("Abir", "+91 11111");
phoneBook.insertPair("Hospitals", "+91 101");
phoneBook.insertPair("Sammer", "+91 99999");
phoneBook.deletePair("Akbar", phoneBook);
console.log(phoneBook.lookUp("Abir") === "+91 11111");
phoneBook.update("Abir", "+91 22222");
console.log(phoneBook.lookUp("Abir") === "+91 22222");
console.log(phoneBook.insertPair("Abir", "1234"));

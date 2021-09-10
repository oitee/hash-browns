function BinaryTree(key) {
  this.key = key;
  this.data = undefined;
  this.left = null;
  this.right = null;
}

function insertPair(key, value, store) {
  let unicodeKey;
  if (typeof key != "number") {
    unicodeKey = convertToUnicode(key);
  } else {
    unicodeKey = key;
  }
  if (store == undefined) {
    store = new BinaryTree(unicodeKey);
    store.data = value;
    return store;
  }
  if (isPresent(unicodeKey, store)) {
    throw `key already present: ${key}`;
  }
  let newNode = searchAndInsert(unicodeKey, store, true);
  newNode.data = value;
  return store;
}

function deletePair(key, store) {
  let unicodeKey;
  if (typeof key != "number") {
    unicodeKey = convertToUnicode(key);
  } else {
    unicodeKey = key;
  }
  if (isPresent(unicodeKey, store)) {
    let targetNode = searchAndInsert(unicodeKey, store, false);
    let parentNode = findParent(unicodeKey, store);
    //If targetNode has one or no children,
    //to delete it, the pointer of its parent needs to be changed

    if (targetNode.left == null || targetNode.right == null) {
      //When the target node is the root node, having one or no children
      if (targetNode.key === store.key) {
        if (targetNode.left == null && targetNode.right == null) {
          return;
        }
        if (targetNode.left != null) {
          return store.left;
        }
        return store.right;
      }
      //if the target node has a parent node, and has one or no children:

      //First, finding whether the target node is a left child or a right child
      let parentDirection;
      if (parentNode.left !== null) {
        if (parentNode.left.key === unicodeKey) {
          parentDirection = "left";
        }
      } else {
        if (parentNode.right !== null) {
          if (parentNode.right.key === unicodeKey) {
            parentDirection = "right";
          }
        }
      }
      //Then, replacing the relevant pointer of the parent node to the child of the target node or to null
      if (targetNode.left == null && targetNode.right == null) {
        parentNode[parentDirection] = null;
        return store;
      }
      if (targetNode.left == null) {
        parentNode[parentDirection].key = targetNode.right;
        return store;
      }
      parentNode[parentDirection] = targetNode.left;
      return store;
    }

    //If the target node has both children, its immediate successor should replace it
    //Immediate successor = left most child of the right child of the target node
    let successorNode = findLeftMost(targetNode.right, store);
    deletePair(successorNode.key, store);
    targetNode.key = successorNode.key;
    targetNode.data = successorNode.data;
    return store;
  }
  throw `key not present: ${key}`;
}

function update(key, newValue, store) {
  let unicodeKey;
  if (typeof key != "number") {
    unicodeKey = convertToUnicode(key);
  } else {
    unicodeKey = key;
  }
  if (isPresent(unicodeKey, store)) {
    let targetNode = searchAndInsert(unicodeKey, store, false);
    targetNode.data = newValue;
    return newValue;
  }
  throw `key not present: ${key}`;
}

function lookUp(key, store) {
  let unicodeKey = convertToUnicode(key);
  if (isPresent(unicodeKey, store)) {
    let targetNode = searchAndInsert(unicodeKey, store, false);
    return targetNode.data;
  }
  throw `key not present: ${key}`;
}

function convertToUnicode(key) {
  let unicodeValue = 0;
  for (let i = 0; i < key.length; i++) {
    unicodeValue = unicodeValue + key.charCodeAt(i);
  }
  return unicodeValue;
}

function isPresent(key, store) {
  while (store !== undefined && store !== null) {
    if (store.key === key) {
      return true;
    }
    if (key < store.key) {
      store = store.left;
    } else {
      store = store.right;
    }
  }
  return false;
}

function searchAndInsert(key, store, insert) {
  if (store.key === key) {
    return store;
  }
  if (key < store.key) {
    if (store.left == null) {
      if (insert) {
        let newNode = new BinaryTree(key);
        store.left = newNode;
        return newNode;
      } else {
        throw `key not present: ${key}`;
      }
    }
    return searchAndInsert(key, store.left, insert);
  }
  if (store.right == null) {
    if (insert) {
      let newNode = new BinaryTree(key);
      store.right = newNode;
      return newNode;
    } else {
      throw `key not present: ${key}`;
    }
  }
  return searchAndInsert(key, store.right, insert);
}

function findParent(key, store) {
  if (store.key == key) {
    return store;
  }
  while (store.left != null || store.right != null) {
    if (store.left != null && store.right != null) {
      if (store.left.key == key || store.right.key == key) {
        return store;
      }
      if (key < store.key) {
        store = store.left;
      } else {
        store = store.right;
      }
    } else {
      if (store.left == null) {
        store = store.right;
      } else {
        store = store.left;
      }
    }
  }
  throw `key not present: ${key}`;
}

function findLeftMost(node, store) {
  if (node.left == null) {
    return node;
  }
  return findLeftMost(node.left, store);
}

let phoneBook;

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

phoneBook = insertPair("Akbar", "+91 12345", phoneBook);
phoneBook = insertPair("Amar", "+91 45678", phoneBook);
phoneBook = insertPair("Antony", "+91 98765", phoneBook);
phoneBook = insertPair("Abir", "+91 11111", phoneBook);
phoneBook = insertPair("Hospitals", "+91 101", phoneBook);
phoneBook = insertPair("Sammer", "+91 99999", phoneBook);

phoneBook = deletePair("Akbar", phoneBook);
console.log(phoneBook);

// console.log("Akbar:");
// console.log(convertToUnicode("Akbar"));
// console.log("Amar:");
// console.log(convertToUnicode("Amar"));
// console.log("Antony:");
// console.log(convertToUnicode("Antony"));
// console.log("Abir:");
// console.log(convertToUnicode("Abir"));

// console.log("Hospitals:");
// console.log(convertToUnicode("Hospitals"));
// console.log("Sammer:");
// console.log(convertToUnicode("Sammer"));

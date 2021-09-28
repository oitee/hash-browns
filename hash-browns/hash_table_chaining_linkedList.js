// function Node(key, value = undefined) {
//   this.key = key;
//   this.value = value;
//   this.next = null;
// }

// class LinkedList {
//   constructor(node) {
//     this.head = node;
//   }
//   insertNode(node) {
//     let oldHead = this.head;
//     this.head = node;
//     this.head.next = oldHead;
//   }
//   deleteNode(targetNode, currentNode = this.head) {
//     if (this.head == null) {
//       throw `List is empty`;
//     }
//     if (targetNode.key == this.head.key) {
//       if (this.head.next !== null) {
//         this.head = this.head.next;
//         return;
//       }
//       this.head = null;
//       return;
//     }
//     if (currentNode.next == null) {
//       throw `Unable to delete node, as it is not present: ${targetNode.key}`;
//     }
//     if (currentNode.next.key == targetNode.key) {
//       currentNode.next = currentNode.next.next;
//       return;
//     }
//     this.deleteNode(targetNode, currentNode.next);

//     if (targetNode.key == currentNode.key) {
//       if (currentNode.next) {
//       }
//     }
//     this.deleteNode(targetNode, currentNode.next);
//   }
//   findNode(key, currentNode = this.head) {
//     if (this.head == null) {
//       throw `list is empty`;
//     }
//     if (currentNode.key === key) {
//       return currentNode;
//     }
//     if (currentNode.next == null) {
//       return false;
//     }
//     return this.findNode(key, currentNode.next);
//   }
// }

// class HashTable {
//   constructor(m) {
//     this.arr = [];
//     this.size = m;
//   }
//   hashFn(key) {
//     return key % this.size;
//   }
//   insertPair(key, value) {
//     if (this.isNumber(key)) {
//       let hashValue = this.hashFn(key);
//       let newNode = new Node(key, value);
//       if (this.arr[hashValue] === undefined) {
//         this.arr[hashValue] = new LinkedList(newNode);
//         return value;
//       }
//       let hashBucket = this.arr[hashValue];
//       if (hashBucket.findNode(key) === false) {
//         hashBucket.insertNode(newNode);
//         return value;
//       }
//       throw `Key is already present in the hash bucket: ${key}`;
//     }
//     throw `Key is not a positive natural number: ${key}`;
//   }
//   deletePair(key) {
//     if (this.isNumber(key)) {
//       let hashVal = this.hashFn(key);
//       if (this.arr[hashVal] === undefined) {
//         return `Key not present as the hash bucket is empty`;
//       }
//       let hashBucket = this.arr[hashVal];
//       let targetNode = hashBucket.findNode(key);
//       if (targetNode === false) {
//         throw `Key is not present in the hash bucket: ${key}`;
//       }
//       let deletedVal = targetNode.value;
//       hashBucket.deleteNode(targetNode);
//       return deletedVal;
//     }
//     throw `Key is not a positive natural number: {key}`;
//   }
//   update(key, newVal) {
//     if (this.isNumber(key)) {
//       let hashVal = this.hashFn(key);
//       if (this.arr[hashVal] === undefined) {
//         throw `Key is not present as the hash bucket is empty: ${key}`;
//       }
//       let hashBucket = this.arr[hashVal];
//       let targetNode = hashBucket.findNode(key);
//       if (targetNode === false) {
//         throw `Key is not present in the hash bucket: ${key}`;
//       }
//       let oldVal = targetNode.value;
//       targetNode.value = newVal;
//       return oldVal;
//     }
//     throw `Key is not a positive natural number: ${key}`;
//   }
//   lookUp(key) {
//     if (this.isNumber(key)) {
//       let hashVal = this.hashFn(key);
//       if (this.arr[hashVal] === undefined) {
//         throw `Key is not present as the hash bucket is empty: ${key}`;
//       }
//       let hashBucket = this.arr[hashVal];
//       let targetNode = hashBucket.findNode(key);
//       if (targetNode === false) {
//         throw `Key is not present in the hash bucket: ${key}`;
//       }
//       return targetNode.value;
//     }
//     throw `Key is not a positive natural number: ${key}`;
//   }
//   isNumber(key) {
//     return typeof key == "number" && key > 0;
//   }
// }

// function testHashTable() {
//   let newStore = new HashTable(10);
//   newStore.insertPair(1, "One");
//   try {
//     newStore.insertPair(1, "One");
//     console.log(false);
//   } catch (e) {
//     console.log(true);
//   }

//   newStore.insertPair(202, "Two");
//   newStore.insertPair(303, "Three");
//   newStore.insertPair(404, "Four");
//   console.log(newStore.lookUp(404) === "Four");
//   newStore.deletePair(303);
//   try {
//     console.log(newStore.lookUp(303));
//     console.log(false);
//   } catch (e) {
//     console.log(true);
//   }
//   try {
//     newStore.deletePair(303);
//     console.log(false);
//   } catch (e) {
//     console.log(true);
//   }
//   newStore.update(404, "Four O Four");
//   console.log(newStore.lookUp(404) === "Four O Four");
//   newStore.insertPair(504, "Five O Four");
//   console.log(newStore.lookUp(504) === "Five O Four");
//   newStore.insertPair(604, "Six O Four");
//   newStore.deletePair(504);
//   console.log(newStore.lookUp(604) === "Six O Four");
//   console.log(newStore.lookUp(404) === "Four O Four");
//   try {
//     newStore.lookUp(504);
//     console.log(false);
//   } catch (e) {
//     console.log(true);
//   }
// }

// function testLinkedList() {
//   let nodeA = new Node(3, "three");
//   let hashB = new LinkedList(nodeA);
//   let nodeB = new Node(4, "four");
//   console.log(hashB.findNode(nodeA.key).key == nodeA.key);
//   console.log(hashB.findNode(3).key === 3);
//   console.log(hashB.findNode(nodeB.key) === false);
//   console.log(hashB.findNode(4) === false);
//   hashB.insertNode(nodeB);
//   console.log(hashB.findNode(nodeB.key).key === nodeB.key);
//   console.log(hashB.findNode(4).key === 4);

//   hashB.deleteNode(nodeA);
//   console.log(hashB.findNode(nodeA.key) === false);
//   console.log(hashB.findNode(3) === false);
//   console.log(hashB.findNode(nodeB.key).key === nodeB.key);
// }

// testLinkedList();
// testHashTable();
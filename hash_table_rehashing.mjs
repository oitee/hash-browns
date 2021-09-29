import * as hashT from "./hash_table_chaining_linkedList.mjs";

class HashTable {
  constructor(m, loadFactor = 0.75) {
    this.arr = [];
    this.size = m;
    if (typeof loadFactor !== "number" || loadFactor <= 0 || loadFactor >= 1) {
      this.load = 0.75;
    } else {
      this.load = loadFactor;
    }
  }
  hashFn(key) {
    return key % this.size;
  }
  exceedLoadFactor() {
    let total = 0;
    for (let i = 0; i < this.arr.length; i++) {
      let bucket = this.arr[i];
      if (bucket !== undefined) {
        let node = bucket.head;
        while (node !== undefined && node !== null) {
          total++;
          //console.log(total);
          node = node.next;
        }
      }
      //console.log(total);
    }
    if(total == 0){
      return false;
    }
    let load = total / this.size;
    return load >= this.load;
  }
  rehash() {
    //console.log("rehash");
    let newSize = this.size * 2;
    this.size = newSize;
    // let newTable = new HashTable(this.size * 2);
    let newTable = [];
    for (let i = 0; i < this.arr.length; i++) {
      let bucket = this.arr[i];
      if (bucket !== undefined) {
        let node = bucket.head;
        while (node !== null && node !== undefined) {
          let currentKey = node.key;
          let currentVal = node.value;
          let currentHashVal = this.hashFn(currentKey);
          let newNode = new hashT.Node(currentKey, currentVal);
          if (newTable[currentHashVal] == undefined) {
            newTable[currentHashVal] = new hashT.LinkedList(newNode);
          } else {
            newTable[currentHashVal].insertNode(newNode);
          }
          node = node.next;
        }
      }
    }
    this.arr = newTable;
  }
  insertPair(key, value) {
    if (this.isNumber(key)) {
      //check if the size exceeds load factor
      //if yes, call the method to resize
      if (this.exceedLoadFactor()) {
        this.rehash();
      }

      let hashValue = this.hashFn(key);
      let newNode = new hashT.Node(key, value);
      if (this.arr[hashValue] === undefined) {
        this.arr[hashValue] = new hashT.LinkedList(newNode);
        return value;
      }
      let hashBucket = this.arr[hashValue];
      if (hashBucket.findNode(key) === false) {
        hashBucket.insertNode(newNode);
        return value;
      }
      throw `Key is already present in the hash bucket: ${key}`;
    }
    throw `Key is not a positive natural number: ${key}`;
  }
  deletePair(key) {
    if (this.isNumber(key)) {
      let hashVal = this.hashFn(key);
      if (this.arr[hashVal] === undefined) {
        throw `[DELETE] Key not present as the hash bucket is empty : ${key}`;
      }
      let hashBucket = this.arr[hashVal];
      let targetNode = hashBucket.findNode(key);
      if (targetNode === false) {
        throw `Key is not present in the hash bucket: ${key}`;
      }
      let deletedVal = targetNode.value;
      let deletedHead =  hashBucket.deleteNode(targetNode);
      if(deletedHead == null){
        this.arr[hashVal] = undefined;
      }
      return deletedVal;
    }
    throw `Key is not a positive natural number: {key}`;
  }
  update(key, newVal) {
    if (this.isNumber(key)) {
      let hashVal = this.hashFn(key);
      if (this.arr[hashVal] === undefined) {
        throw `[UPDATE] Key is not present as the hash bucket is empty: ${key}`;
      }
      let hashBucket = this.arr[hashVal];
      let targetNode = hashBucket.findNode(key);
      if (targetNode === false) {
        throw `Key is not present in the hash bucket: ${key}`;
      }
      let oldVal = targetNode.value;
      targetNode.value = newVal;
      return oldVal;
    }
    throw `Key is not a positive natural number: ${key}`;
  }
  lookUp(key) {
    if (this.isNumber(key)) {
      let hashVal = this.hashFn(key);
      if (this.arr[hashVal] === undefined) {
        throw `[lookUp] Key is not present as the hash bucket is empty: ${key}`;
      }
      let hashBucket = this.arr[hashVal];
      let targetNode = hashBucket.findNode(key);
      if (targetNode === false) {
        throw `Key is not present in the hash bucket: ${key}`;
      }
      return targetNode.value;
    }
    throw `Key is not a positive natural number: ${key}`;
  }
  isNumber(key) {
    return typeof key == "number" && key > 0;
  }
}

function testHashTable() {
  let newStore = new HashTable(10);
  newStore.insertPair(1, "One");
  try {
    newStore.insertPair(1, "One");
    console.log(false);
  } catch (e) {
    console.log(true);
  }

  newStore.insertPair(202, "Two");
  newStore.insertPair(303, "Three");
  newStore.insertPair(404, "Four");
  console.log(newStore.lookUp(404) === "Four");
  newStore.deletePair(303);
  try {
    console.log(newStore.lookUp(303));
    console.log(false);
  } catch (e) {
    console.log(true);
  }
  try {
    
    newStore.deletePair(303);
    console.log(false);
  } catch (e) {
    console.log(true);
  }
  newStore.update(404, "Four O Four");
  console.log(newStore.lookUp(404) === "Four O Four");
  newStore.insertPair(504, "Five O Four");
  console.log(newStore.lookUp(504) === "Five O Four");
  newStore.insertPair(604, "Six O Four");
  newStore.deletePair(504);
  console.log(newStore.lookUp(604) === "Six O Four");
  console.log(newStore.lookUp(404) === "Four O Four");
  try {
    newStore.lookUp(504);
    console.log(false);
  } catch (e) {
    console.log(true);
  }
  let i = 0;
  let counter = 999;
  let HASH = new HashTable(10);
  while (i < 20) {
    // try {
      HASH.insertPair(counter, "STRING");
      counter++;
    // } catch (e) {
    //  console.log("Error in inserting a new pair: " + e);
    //  console.log(counter);
     // break;
    // }
    i++;
  }
  console.log(HASH.arr);
  console.log(HASH.size);
  HASH.insertPair(111, "111");
  HASH.update(111, "!23");
  HASH.insertPair(222, "2222");
  HASH.deletePair(222);
  console.log(HASH.lookUp(111) === "!23");
  console.log(HASH.lookUp(222));
}

testHashTable();

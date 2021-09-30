import * as hashT from "./hash_table_chaining_linkedList.mjs";

class HashTable {
  constructor(m, loadFactor = 0.75) {
    this.arr = [];
    this.size = m;
    if (typeof loadFactor !== "number") {
      this.load = 0.75;
    } else {
      this.load = loadFactor;
    }
    this.keys = 0;
    this.addDefaultValues();
  }
  addDefaultValues() {
    for (let i = 0; i < this.size; i++) {
      this.arr[i] = null;
    }
  }
  hashFn(key) {
    return key % this.size;
  }
  exceedLoadFactor() {
    let loadFactor = this.keys / this.size;
    return loadFactor > this.load;
  }
  rehash() {
    let newSize = this.size * 2;
    let newTable = new HashTable(newSize, this.load);
    for (let i = 0; i < this.size; i++) {
      let hashBucket = this.arr[i];
      if (hashBucket !== null) {
        let node = hashBucket;
        while (node !== null) {
          newTable.insert(node.key, node.value);
          node = node.next;
        }
      }
    }
    this.size = newSize;
    this.arr = newTable.arr;
  }
  insert(key, value) {
    if (this.isNumber(key)) {
      //check if the size exceeds load factor
      //if yes, call the method to resize
      if (this.exceedLoadFactor()) {
        this.rehash();
      }

      let hashValue = this.hashFn(key);
      if (this.arr[hashValue] === null) {
        this.arr[hashValue] = new hashT.Node(key, value);
        this.keys++;
        return value;
      }
      let hashBucket = this.arr[hashValue];
      if (hashBucket.find(key) === null) {
        this.arr[hashValue] = hashBucket.insert(key, value);
        this.keys++;
        return value;
      }
      throw `Key is already present in the hash bucket: ${key}`;
    }
    throw `Key is not a positive natural number: ${key}`;
  }
  delete(key) {
    if (this.isNumber(key)) {
      let hashVal = this.hashFn(key);
      if (this.arr[hashVal] === null) {
        throw `Key not present as the hash bucket is empty: ${key}`;
      }
      let hashBucket = this.arr[hashVal];
      let targetNode = hashBucket.find(key);
      if (targetNode === null) {
        throw `Key is not present in the hash bucket: ${key}`;
      }
      let deletedVal = targetNode.value;
      this.arr[hashVal] = hashBucket.delete(key);
      this.keys--;
      return deletedVal;
    }
    throw `Key is not a positive natural number: {key}`;
  }
  update(key, newVal) {
    if (this.isNumber(key)) {
      let hashVal = this.hashFn(key);
      if (this.arr[hashVal] === null) {
        throw `Key is not present as the hash bucket is empty: ${key}`;
      }
      let hashBucket = this.arr[hashVal];
      let targetNode = hashBucket.find(key);
      if (targetNode === null) {
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
      if (this.arr[hashVal] === null) {
        throw `Key is not present as the hash bucket is empty: ${key}`;
      }
      let hashBucket = this.arr[hashVal];
      let targetNode = hashBucket.find(key);
      if (targetNode === null) {
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
  newStore.insert(1, "One");
  try {
    newStore.insert(1, "One");
    console.log(false);
  } catch (e) {
    console.log(true);
  }

  newStore.insert(202, "Two");
  newStore.insert(303, "Three");
  newStore.insert(404, "Four");
  console.log(newStore.lookUp(404) === "Four");
  newStore.delete(303);
  try {
    console.log(newStore.lookUp(303));
    console.log(false);
  } catch (e) {
    console.log(true);
  }
  try {
    newStore.delete(303);
    console.log(false);
  } catch (e) {
    console.log(true);
  }
  newStore.update(404, "Four O Four");
  console.log(newStore.lookUp(404) === "Four O Four");
  newStore.insert(504, "Five O Four");
  console.log(newStore.lookUp(504) === "Five O Four");
  newStore.insert(604, "Six O Four");
  newStore.delete(504);
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
    HASH.insert(counter, "STRING");
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
  HASH.insert(111, "111");
  HASH.update(111, "!23");
  HASH.insert(222, "2222");
  HASH.delete(222);
  console.log(HASH.lookUp(111) === "!23");
  console.log(HASH.lookUp(222));
}

testHashTable();

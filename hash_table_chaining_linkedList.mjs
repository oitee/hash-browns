export class Node {
  constructor(key, value = undefined) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
  insert(key, value) {
    let newNode = new Node(key, value);
    newNode.next = this;
    return newNode;
  }
  delete(key) {
    if (this.key === key) {
      return this.next;
    }
    if (this.next !== null) {
      this.next = this.next.delete(key);
    }
    return this;
  }
  find(key) {
    if (this.key === key) {
      return this;
    }
    if (this.next !== null) {
      return this.next.find(key);
    }
    return false; //!To do: convert to null
  }
}


class HashTable {
  constructor(m) {
    this.arr = [];
    this.size = m;
  }
  hashFn(key) {
    return key % this.size;
  }
  insertPair(key, value) {
    if (this.isNumber(key)) {
      let hashValue = this.hashFn(key);
      if (this.arr[hashValue] === undefined) {
        this.arr[hashValue] = new Node(key, value);
        return value;
      }
      let hashBucket = this.arr[hashValue];
      if (hashBucket.find(key) === false) {
        this.arr[hashValue] = hashBucket.insert(key, value);
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
        throw `Key not present as the hash bucket is empty`;
      }
      let hashBucket = this.arr[hashVal];
      let targetNode = hashBucket.find(key);
      if (targetNode === false) {
        throw `Key is not present in the hash bucket: ${key}`;
      }
      let deletedVal = targetNode.value;
      let deletedHead = hashBucket.delete(key);
      if(deletedHead === null){
        this.arr[hashVal] = undefined;
      }
      else{
        this.arr[hashVal] = deletedHead;
      }
      return deletedVal;
    }
    throw `Key is not a positive natural number: {key}`;
  }
  update(key, newVal) {
    if (this.isNumber(key)) {
      let hashVal = this.hashFn(key);
      if (this.arr[hashVal] === undefined) {
        throw `Key is not present as the hash bucket is empty: ${key}`;
      }
      let hashBucket = this.arr[hashVal];
      let targetNode = hashBucket.find(key);
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
        throw `Key is not present as the hash bucket is empty: ${key}`;
      }
      let hashBucket = this.arr[hashVal];
      let targetNode = hashBucket.find(key);
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
    newStore.lookUp(303);
    console.log(false);
  } catch (e) {
    console.log(true);
  }
  try {
    console.log(newStore.deletePair(303));
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
}




testHashTable();

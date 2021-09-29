//This implementation does NOT handle collisions.
//As a primitive implementation of hash tables, it expects the user to not use keys that can cause collision
class HashTable {
  constructor(m) {
    this.arr = [];
    this.size = m;
  }
  hashFn(k) {
    return k % this.size;
  }
  insertPair(key, value) {
    // if (typeof key !== "number" || key < 0) {
    //   throw `key is not a positive natural number ${key}`;
    // }
    if (this.isNumber(key)) {
      let hashValue = this.hashFn(key);
      if (this.isPresent(key)) {
        throw `key is already present: ${key}`;
      }
      this.arr[hashValue] = value;
      return value;
    }
    throw `key is not a positive natural number ${key}`;
  }
  deletePair(key) {
    // if (typeof key !== "number" || key < 0) {
    //   throw `key is not a positive natural number ${key}`;
    // }
    if (this.isNumber(key)) {
      let hashValue = this.hashFn(key);
      if (!this.isPresent(key)) {
        thorw`key is not present: ${key}`;
      }
      let deletedValue = this.arr[hashValue];
      this.arr[hashValue] = undefined;
      return deletedValue;
    }
    throw `key is not a positive natural number ${key}`;
  }
  lookUp(key) {
    // if (typeof key !== "number" || key < 0) {
    //   throw `key is not a positive natural number ${key}`;
    // }
    if (this.isNumber(key)) {
      let hashValue = this.hashFn(key);
      if (this.isPresent(key)) {
        return this.arr[hashValue];
      }
      throw `key is not present: ${key}`;
    }
    throw `key is not a positive natural number ${key}`;
  }
  update(key, newVal) {
    if (this.isNumber(key)) {
      let hashValue = this.hashFn(key);
      if (this.isPresent(key)) {
        let oldVal = this.arr[hashValue];
        this.arr[hashValue] = newVal;
        return oldVal;
      }
      throw `key is not present: ${key}`;
    }
    throw `key is not a positive natural number ${key}`;
  }
  isPresent(key) {
    let hashValue = this.hashFn(key);
    return this.arr[hashValue] != undefined;
  }
  isNumber(key) {
    return typeof key == "number" && key > 0;
  }
}

let newStore = new HashTable(10);
newStore.insertPair(100, "first");
newStore.insertPair(201, "second");
newStore.insertPair(303, "third");
console.log(newStore.lookUp(303));
newStore.deletePair(201);
newStore.update(303, "3rd");
console.log(newStore.lookUp(303));
console.log(newStore.arr);

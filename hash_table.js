//This implementation does NOT handle collisions.
//As a primitive implementation of hash tables, it expects the user to not use keys that can cause collision
class HashTable {
  constructor(m) {
    this.arr = [];
    this.size = m;
    this.addDefaultValue();
  }
  addDefaultValue(){
    for(let i = 0; i < this.size; i++){
      this.arr[i] = null;
    }
  }
  hashFn(k) {
    return k % this.size;
  }
  insert(key, value) {
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
  delete(key) {
    if (this.isNumber(key)) {
      let hashValue = this.hashFn(key);
      if (!this.isPresent(key)) {
        thorw`key is not present: ${key}`;
      }
      let deletedValue = this.arr[hashValue];
      this.arr[hashValue] = null;
      return deletedValue;
    }
    throw `key is not a positive natural number ${key}`;
  }
  lookUp(key) {
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
    return this.arr[hashValue] != null;
  }
  isNumber(key) {
    return typeof key == "number" && key > 0;
  }
}

let newStore = new HashTable(10);
newStore.insert(100, "first");
newStore.insert(201, "second");
newStore.insert(303, "third");
console.log(newStore.lookUp(303));
newStore.delete(201);
newStore.update(303, "3rd");
console.log(newStore.lookUp(303));
console.log(newStore.arr);

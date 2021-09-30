class HashTable {
  constructor(m) {
    this.arr = [];
    this.size = m;
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
  insert(key, value) {
    if (this.isNumber(key)) {
      if (this.findIndex(key) === null) {
        let hashVal = this.hashFn(key);
        for (let i = hashVal; i < this.size; i++) {
          if (this.arr[i] === null || Number.isNaN(this.arr[i])) {
            this.arr[i] = { key: key, value: value };
            return value;
          }
        }
        for (let i = 0; i < hashVal; i++) {
          if (this.arr[i] === null || Number.isNaN(this.arr[i])) {
            this.arr[i] = { key: key, value: value };
            return value;
          }
        }
        throw `Hash table is full: no empty slot to add a new key-value pair. Key: ${key}`;
      }
      throw `Key is already present: ${key}`;
    }
    throw `Key is not a positive natural number: ${key}`;
  }
  delete(key) {
    if (this.isNumber(key)) {
      let targetIndex = this.findIndex(key);
      if (targetIndex === null) {
        throw `Key is not present in the hash table: ${key}`;
      }
      let oldVal = this.arr[targetIndex].value;
      this.arr[targetIndex] = NaN;
      return oldVal;
    }
    throw `Key is not a positive natural number: ${key}`;
  }
  update(key, newVal) {
    if (this.isNumber(key)) {
      let targetIndex = this.findIndex(key);
      if (targetIndex === null) {
        throw `Key is not present in the hash table: ${key}`;
      }
      let oldVal = this.arr[targetIndex].value;
      this.arr[targetIndex].value = newVal;
      return oldVal;
    }
    throw `Key is not a positive natural number: ${key}`;
  }
  lookUp(key) {
    if (this.isNumber(key)) {
      let targetIndex = this.findIndex(key);
      if (targetIndex === null) {
        throw `Key is not present in the hash table: ${key}`;
      }
      return this.arr[targetIndex].value;
    }
    throw `Key is not a positive natural number: ${key}`;
  }
  findIndex(key) {
    let hashVal = this.hashFn(key);
    for (let i = hashVal; i < this.size; i++) {
      if (this.arr[i] === null) {
        return null;
      }
      if (typeof this.arr[i] === "object" && this.arr[i].key === key) {
        return i;
      }
    }
    for (let i = 0; i < hashVal; i++) {
      if (this.arr[i] === null) {
        return null;
      }
      if (typeof this.arr[i] === "object" && this.arr[i].key === key) {
        return i;
      }
    }
    return null;
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
  while (i < newStore.size) {
    try {
      newStore.insert(counter++, "STRING");
    } catch (e) {
      console.log("Error in inserting a new pair: " + e);
      break;
    }
    i++;
  }
  console.log(newStore.arr);
}
testHashTable();

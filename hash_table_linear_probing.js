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
      if (this.findIndex(key) === false) {
        let hashVal = this.hashFn(key);
        for (let i = hashVal; i < this.size; i++) {
          if (this.arr[i] === undefined || Number.isNaN(this.arr[i])) {
            this.arr[i] = { key: key, value: value };
            return value;
          }
        }
        for (let i = 0; i < hashVal; i++) {
          if (this.arr[i] === undefined || Number.isNaN(this.arr[i])) {
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
  deletePair(key) {
    if (this.isNumber(key)) {
      let targetIndex = this.findIndex(key);
      if (targetIndex === false) {
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
      if (targetIndex === false) {
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
      if (targetIndex === false) {
        throw `Key is not present in the hash table: ${key}`;
      }
      return this.arr[targetIndex].value;
    }
    throw `Key is not a positive natural number: ${key}`;
  }
  findIndex(key) {
    let hashVal = this.hashFn(key);
    for (let i = hashVal; i < this.size; i++) {
      if (this.arr[i] === undefined) {
        return false;
      }
      if (typeof this.arr[i] === "object" && this.arr[i].key === key) {
        return i;
      }
    }
    for (let i = 0; i < hashVal; i++) {
      if (this.arr[i] === undefined) {
        return false;
      }
      if (typeof this.arr[i] === "object" && this.arr[i].key === key) {
        return i;
      }
    }
    return false;
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
  while (i < newStore.size) {
    try {
      newStore.insertPair(counter++, "STRING");
    } catch (e) {
      console.log("Error in inserting a new pair: " + e);
      break;
    }
    i++;
  }
  console.log(newStore.arr);
}
testHashTable();

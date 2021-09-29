//direct addressing

class kvStore {
  constructor() {
    this.arr = [];
  }
  insertPair(key, value) {
    let unicodeKey = this.convertToUnicode(key);
    if (this.arr[unicodeKey] === undefined) {
      this.arr[unicodeKey] = value;
      return value;
    }
    throw "key already exists";
  }

  deletePair(key) {
    let unicodeKey = this.convertToUnicode(key);
    if (this.arr[unicodeKey] !== undefined) {
      let value = this.arr[unicodeKey];
      this.arr[unicodeKey] = undefined;
      return value;
    }
    throw "key does not exist";
  }

  lookUp(key) {
    let unicodeKey = this.convertToUnicode(key);
    if (this.arr[unicodeKey] !== undefined) {
      return this.arr[unicodeKey];
    }
    throw "key does not exist";
  }

  update(key, newValue) {
    let unicodeKey = this.convertToUnicode(key);
    if (this.arr[unicodeKey] !== undefined) {
      let oldValue = this.arr[unicodeKey];
      this.arr[unicodeKey] = newValue;
      return newValue;//Need not return anything
    }
    throw "key does not exist";
  }

  convertToUnicode(key) {
    if (typeof key == "number") {
      return key;
    }
    let unicodeValue = 0;
    for (let i = 0; i < key.length; i++) {
      unicodeValue = unicodeValue + key.charCodeAt(i);
    }
    return unicodeValue;
  }
}

let firstName = "Bella";
let phoneBook = new kvStore();

phoneBook.insertPair("Akbar", "+91 12345");
phoneBook.insertPair("Amar", "+91 45678");
phoneBook.insertPair("Antony", "+91 98765");
phoneBook.insertPair("Abir", "+91 11111");
phoneBook.insertPair("Hospitals", "+91 101");
phoneBook.insertPair("Sammer", "+91 99999");

phoneBook.deletePair("Akbar");
console.log(phoneBook.arr);
console.log(phoneBook.lookUp("Abir") === "+91 11111");
console.log(phoneBook.update("Abir", "+91 22222") === "+91 22222");
console.log(phoneBook.lookUp("Abir") === "+91 22222");

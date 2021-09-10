//direct addressing

function insertPair(key, value, store){
  let unicodeKey = convertToUnicode(key);
  if(store[unicodeKey] === undefined){
  store[unicodeKey] = value;
  return value;
  }
  throw "key already exists";
}

function deletePair(key, store){
  let unicodeKey = convertToUnicode(key);
  if(store[unicodeKey] !== undefined){
    let value = store[unicodeKey];
    store[unicodeKey] = undefined;
    return value;  
  }
  throw "key does not exist";
}

function lookUp(key, store){
  let unicodeKey = convertToUnicode(key);
  if(store[unicodeKey] !== undefined){
    return store[unicodeKey];
  }
  throw "key does not exist";
}

function update(key, newValue, store){
  let unicodeKey = convertToUnicode(key);
  if(store[unicodeKey] !== undefined){
    let oldValue = store[unicodeKey];
    store[unicodeKey] = newValue;
    return oldValue;
  }
  throw "key does not exist";
}

function convertToUnicode(key){
  let unicodeValue = 0;
  for (let i = 0; i < key.length; i++) {
    unicodeValue = unicodeValue + key.charCodeAt(i);
  }
  return unicodeValue;
}







let firstName = "Bella";
let phoneBook = [];

console.log(insertPair("Bella", "2441123", phoneBook));//2441123
console.log(insertPair("Emergency", "100", phoneBook))//100

console.log(update("Bella", "+91 2441139", phoneBook));//2441123
console.log(lookUp("Bella", phoneBook));//+91 2441139
// console.log(lookUp("Emergency", phoneBook));//100
// console.log(update("Bella", "+91 2441129", phoneBook));//+91 2441139
console.log(deletePair("Emergency",phoneBook));//100

console.log(phoneBook);
console.log((phoneBook.length));

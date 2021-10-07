function h1(k){
    return k % 1000;
}
let hashvalues = [];
for (let i = 1; i <= 10000; i++){
     
    let hashVal = h2(i);
    if(hashvalues[hashVal] !== undefined){
        hashvalues[hashVal]++;
    }
    else{
        hashvalues[hashVal] = 1;
    }
}

for(let j = 0; j < hashvalues.length; j++){
    if(hashvalues[j] == undefined){
        hashvalues[j] = 0;
    }
}
for(let o = 0; o < hashvalues.length; o++){
    console.log(`${o}, ${hashvalues[o]}`);
}


function h2(k){
    return Math.floor(1000 * (k * 0.67 % 1));
}

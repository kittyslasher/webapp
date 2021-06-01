let poke_db = require('./poke-db.json');
let poke_caps = require('./poke-caps.json');
let types = require('./type.json');
const fs = require('fs');

console.log('******** merge json **************');
const poke_bd_caps_path = './poke-db-caps.json'

// console.log('Poke Bds ',poke_caps );
console.log('Total length ',poke_db.length, ' = ', poke_caps.length)
let mergedArrays = [];

//  Merge two array caps and poke dex json
for (let index = 0; index < poke_db.length; index++) {
    const element = poke_db[index];
    let type = types[ poke_db[index].id ];
    let merged = Object.assign({}, poke_db[index], poke_caps[index], { type : type  });
    if(!type){
      console.log('Type undifened ', poke_db[index].id);
    }
    mergedArrays.push(merged);
}

const storeData = (data, path) => {
    try 
    {
      fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
      console.error(err)
    }
  }


storeData( mergedArrays, poke_bd_caps_path );

console.log('-> Store merged PokeDex with Caps <- ', mergedArrays  );
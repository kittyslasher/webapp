const poke_db = require('./poke-db.json');
const types = require('./type.json');
let poke_caps = require('./poke-caps.json');
const fs = require('fs');


let type_skill = 
{
    "grass" : ["fire"	,"water"],
    "fire" : ["water"],
    "water" : ["thunder"],
    "earth" : ["psy",	"thunder"],
    "thunder" : ["earth"],
    "psy" : ["psy", "earth"],
    "normal" : ["earth"	, "normal"]
}

const imgPath = 'https://raw.githubusercontent.com/pokeswapper/pokeswap-metadata/master/static/img/'

/**
 *  
 *  134, 135 e 136. são todos evoluções do 133
 * 
 */
function processDeckBD()
{
    let mergedArrays = [];
    let item = {};

    for (let index = 0; index < poke_db.length; index++) {
        const element = poke_db[index];
        let type = types[ poke_db[index].id ];
        let merged = Object.assign({}, poke_db[index], poke_caps[index], { type : type  });
        item = {
            id : merged.id,
            name : poke_caps[index].name,
            image_name : poke_db[index].img_colored,
            image_path : imgPath + poke_db[index].img_colored,
            type : merged.type,
            isEvolution : merged.isEvolution,
            weakness :  type_skill[type][0] ,
            desc : poke_db[index].desc || '',
            resistance : type_skill[type].length > 1 ? type_skill[type][1] : ''
        }
        if(item.isEvolution)
        {
            if(index == 134 || index == 135 || index == 136)
            {
                item.basePoke = 
                {
                    id : 133,
                    name : 'Eevee'
                }
            }else
            {
                item.basePoke = 
                {
                    id : poke_db[index -1 ].id,
                    name : poke_db[index -1 ].name
                }    
            }
        }   
        if(!type){
          console.log('Type undifened ', poke_db[index].id);
        }
        // console.log('Show item ', item );
        mergedArrays.push(item);
    }
    return mergedArrays;
}

function generateAttr(pokeItem)
{
    let newObj = [
        {
            "trait_type": "HP", 
            "value": 5,
            "max_value" : 15
        },
        {
            "trait_type": "Attack", 
            "value": 5,
            "max_value" : 15
        },
        {
            "trait_type": "Defense", 
            "value": 5,
            "max_value" : 15
        },
        {
            "trait_type": "Special Attack", 
            "value": 5,
            "max_value" : 15
        },
        {
            "trait_type": "Special Defense", 
            "value": 5,
            "max_value" : 15
        },
        {
            "trait_type": "Speed", 
            "value": 5,
            "max_value" : 15
        },
        {
            "display_type": "boost_number", 
            "trait_type": "XP", 
            "value": 1,
            "max_value" : 15
        }, 
        {
            "trait_type": "Type", 
            "value": pokeItem.type
        },
        {
            "trait_type": "Weakness", 
            "value": pokeItem.weakness
        },
        {
            "trait_type": "Resistance", 
            "value": pokeItem.resistance
        },
        {
            "trait_type": "ID", 
            "value": pokeItem.id
        },

    ]

    if(pokeItem.isEvolution)
    {

        newObj.push(
            {
                "trait_type": "Is evolution of", 
                "value": pokeItem.basePoke.name
            }
        )
    }


    return newObj;
}

function transformToOpensea()
{
    let pokeList = processDeckBD();
    let bd =  {};
    for (let index = 0; index < pokeList.length; index++) 
    {
        const element = pokeList[index];
        bd[element.id] = 
        {
            name : element.name,
            image : element.image_path,
            description : element.desc,
            external_url : 'https://pokeswap.org/pokedex?id='+ element.id,
            attributes : generateAttr(element)
        };  
    }
    return bd;
}

const poke_opensea = './poke-opensea.json' 
const storeData = (data, path) => {
    try 
    {
      fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
      console.error(err)
    }
  }




let pokes_opensea = transformToOpensea();
storeData( pokes_opensea, poke_opensea );



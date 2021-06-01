const Pokes = require('./poke_supply.json');
const Crowdsales = require('./crowdsales.json');
const { isAddress } = require('web3-utils');

const maxSupply = Pokes.map(p => p.maxSupply);
var evolutions = (new Array(Pokes.length)).fill(0);

for(let [i, poke] of Pokes.entries()) {
    if(poke.isEvolution) {
        evolutions[i] = Pokes[i-1].id
    }
}

const active_ids = []
const caps_per_crowdsale = []
for(let [i, poke] of Crowdsales.entries()) {
    if(poke.days.find(d => d <= 15)) {
        const num = poke.days.filter(d => d <= 15)
        active_ids.push(poke.id)
        const maxSupply = Pokes.find(p => p.id == poke.id).maxSupply
        caps_per_crowdsale.push(Math.floor(maxSupply/poke.num_of_crowdsales)*num.length)
    }
}

const evolution_ids = evolutions.map((evo, i) => evo != 0? i+1:undefined).filter(id => id != undefined);
evolutions = evolutions.filter(evo => evo != 0)

console.log('ACtive IDs', JSON.stringify(active_ids.length))
console.log('Cap per Crowdsale', JSON.stringify(caps_per_crowdsale.length))
//console.log(JSON.stringify(maxSupply))
//console.log(maxSupply.reduce((acc, cum) => acc + cum))
//console.log(Pokes.reduce((acc, curr) => acc + curr.pkb_cost))
//console.log(JSON.stringify(evolution_ids))
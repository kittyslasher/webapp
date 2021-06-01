
const target = parseFloat(process.argv[2])
const upper_limit = parseFloat(process.argv[4])
const lower_limit = parseFloat(process.argv[3])
const increment = parseFloat(process.argv[5])

console.log(`Searching [${lower_limit}, ${upper_limit}] for target ${target} with inc=${increment}`)

for(let i = lower_limit; i < upper_limit; i+= increment) {
    const _i = Math.round(i*100)/100
    if(target % _i == 0) console.log('FOUND', _i, target/_i)
    else if((target % _i)/_i <= 0.001) console.log('FOUND APPROXIMATE', _i, target/_i)
}
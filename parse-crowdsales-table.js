const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');

// File path.
const path = '/home//Downloads/salematic1.xlsx';
const crowdsale_start_time_gmt = parseInt(process.argv[2]) || 1619539200;

function parseCrowdsaleRows(rows) {
    const crowdsales = []

    for(let _r = 1; _r < rows.length-1; _r++) {        
        const _crowdsale = {
            id: parseInt(rows[_r][0].substring(3)),
            num_of_crowdsales: parseInt(rows[_r][3]),
            duration: parseInt(rows[_r][4].substring(0, 2)),
            crowdsale_cap: parseInt(rows[_r][2]),
            cap: [],
            days: []
        }

        for(let i = 5; i < 96; i++) {
            if(rows[_r][i] != null) {
                _crowdsale.cap.push(rows[_r][i])
                _crowdsale.days.push(i-5+1)
            }
        }

        crowdsales.push(_crowdsale);
    }

    return crowdsales;
}

function convertToTimestamps(crowdsales) {
    for(let i = 0; i < crowdsales.length; i++) {
        crowdsales[i].time_windows = crowdsales[i].days.map(d => {
            return {
                start: crowdsale_start_time_gmt + (d-1) * 86400,
                end: crowdsale_start_time_gmt + (d-1+crowdsales[i].duration) * 86400
            }
        })
    }

    return crowdsales;
}

function parseSupplyRows(rows) {
    const pokes = []

    for(let _r = 1; _r < 152; _r++) {   
        const _poke = {
            id: parseInt(rows[_r][0].substring(3)),
            name: rows[_r][2],
            pkb_cost: rows[_r][5],
            isEvolution: rows[_r][3] != null,
            maxSupply: rows[_r][4],
        }

        if(_poke.isEvolution)
            _poke.evolution_threshold = parseInt(rows[_r][3])

        pokes.push(_poke);
    }

    return pokes;
}

readXlsxFile(path, { sheet: 'Sheet1' })
.then(rows => parseCrowdsaleRows(rows))
.then(crowdsales => convertToTimestamps(crowdsales))
.then(crowdsales => {
    const data = JSON.stringify(crowdsales)
    fs.writeFileSync('./crowdsales.json', data)
})

//readXlsxFile(path, { sheet: 'Base_data' })
//    .then(rows => parseSupplyRows(rows))
//.then(pokes => {
//    const data = JSON.stringify(pokes)
//    fs.writeFileSync('./poke_supply.json', data)
//})
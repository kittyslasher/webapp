import Crowdsales from '../bd/crowdsales.json'

const _new_date =new Date();
// _new_date.setHours(21, 0, 0);

const Now = Math.floor(_new_date/1000);
const NextDay = Now + 86400;

function mapCrowdsales(crwd, _now) {
    const tw = crwd.time_windows.find(_tw => _now >= _tw.start && _now <= _tw.end);
    const tw_index = crwd.time_windows.findIndex(_tw => _now >= _tw.start && _now <= _tw.end);

    if(tw != undefined) {
        return {
            id: crwd.id,
            end_date: tw.end,
            cumulative_cap: crwd.cap.slice(0, tw_index+1).reduce((acc, curr) => acc + curr, 0),
        };
    }
    else return undefined;
}

const crowdsales = Crowdsales.map(crwd => mapCrowdsales(crwd, Now)).filter(crwd => crwd != undefined).sort(function(a, b) {return a.end_date - b.end_date;});
const nextCrowdsales = Crowdsales.map(crwd => mapCrowdsales(crwd, NextDay)).filter(crwd => crwd != undefined).sort(function(a, b) {return a.end_date - b.end_date;});

console.log('Crowdsales List # ', crowdsales)
console.log('NEXT Crowdsales List # ', nextCrowdsales)

export const state = () => ({
    active: crowdsales,
    nextDay: nextCrowdsales
})
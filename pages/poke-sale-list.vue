<template>

    <v-container style="padding:0px;" >
       
        
        <div style="padding:0px;height:80vh;overflow-y:scroll;overflow-x:hidden" >
             <PokeCard  v-for="item in crowdsales" :key="item.id" v-bind:poke="item"  />
        </div>
    </v-container>

</template>

<script>
import PokeCard from './poke-card.vue'
import Crowdsales from '../bd/crowdsales.json'
import PokeList from '../bd/poke-dex.json' 


export default {
    data() {
        const crowdsales = Crowdsales.map(crwd => {
            const _now = Math.floor(Date.now()/1000);
            const tw = crwd.time_windows.find(_tw => _now >= _tw.start && _now <= _tw.end);
            const tw_index = crwd.time_windows.findIndex(_tw => _now >= _tw.start && _now <= _tw.end);

            if(tw != undefined) {
                return {
                    id: crwd.id,
                    end_date: tw.end,
                    cumulative_cap: crwd.cap.slice(0, tw_index+1).reduce((acc, curr) => acc + curr, 0),
                };
            }
            else
                return undefined;
        }).filter(crwd => crwd != undefined)

        return {
            crowdsales: crowdsales
        }
    },
    name: 'poke-sale-list',
    components: { PokeCard },
}
</script>

<style>

.poke-race{
    font-size:35px;
    font-family: PokemonHollow  !important;
    color:#4d4d4d;
}

/* Hide scrollbar for Chrome, Safari and Opera */
:-webkit-scrollbar {
  display: none;
}
</style>


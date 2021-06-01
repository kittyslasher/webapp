<template>
    <v-container style="padding:0px;margin:0 !important;" >
        <div style="padding:0px;height:81vh;overflow-y:scroll;overflow-x:hidden;" >
             <PokeCard v-for="item in crowdsales" :key="item.id" v-bind:poke="item" v-on:self-destruct="deletePokeCard(item.id)"/>
        </div>
    </v-container>

</template>

<script>
import PokeCard from './poke-card.vue'
import Crowdsales from '../bd/crowdsales.json'

export default {
    data() {
        return {
            crowdsales: this.$store.state.crowdsales.active
        }
    },
    methods: {
        deletePokeCard: function(id) {
            console.log('DELETE Crowdsale:', id);
            const index = this.crowdsales.findIndex(crwd => id == crwd.id);
            this.crowdsales.splice(index, 1)
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


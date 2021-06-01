<template>

<v-container cols="12"  >
  <v-row cols="12" style="margin-top:0.2em;">
    
    <v-col cols="7" class="md-3">
       <v-row v-if="day > 1 && day < 90" align="center"  justify="center" style="padding:0pxmargin-bottom:0px;">
            <v-col md="12" align="center" style="padding:0px;" >
                <h3 class="poke-race" style="padding:0px;">
                  Pokémon Race : day {{day}} / 90
              </h3>
            </v-col>
        </v-row>
         <v-row align="center"  justify="center" style="padding:0px;" >
            <v-col md="12" align="center" >
              <PokeSaleList />      
            </v-col>
        </v-row>
    </v-col>
    <v-col cols="5" class="md-3">
       <TransferActivityTable /> 
    </v-col>
  </v-row>

</v-container>
</template>

<script>
import AppAbout from './rules.vue';
import PokeSaleList from './poke-sale-list.vue';
import TransferActivityTable from './transfer-activity-table.vue';

export default {
	name: 'app-market',
	components: { AppAbout, PokeSaleList, TransferActivityTable },
	data() {
		return {
      initalDate : new Date('04-05-2021'),
      day : 91,
      catch : this.$store.state.account.totalBuy
    }
	},
  mounted()
  {
      console.log("RACE DAY ", this.raceDay())

      this.day = this.raceDay();
  },
  methods : {
    raceDay : function()
    {
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const firstDate = new Date(this.initalDate);
      const secondDate = new Date();
      console.log("Inital Date ", firstDate  )

      return  Math.round(Math.abs((firstDate - secondDate) / oneDay));
    }
  }
}
</script>

<style>

.poke-race{
    font-size:30px;
    font-family: PokemonHollow  !important;
    color:#4d4d4d;
}

.flex-container-noborder {
  /* We first create a flex layout context */
  display: flex;
  flex-flow: row wrap;
  /* Then we define how is distributed the remaining space */
  justify-content: space-around;
  
  padding: 0;
  margin-top:1%;
  margin-bottom:1%;
  margin-left:2%;
  margin-right:2%;
}


 .header {
     color: rgb(172, 46, 46);
 }

</style>

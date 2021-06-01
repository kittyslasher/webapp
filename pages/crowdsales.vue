<template>
<div>
<div class="bg-image blur-image"></div>
<v-container cols="12" class="over-bkg mt-5">
  <v-row cols="12">
    <v-col cols="7" class="md-3">
        <v-row v-if="day >= 1 && day < 90" align="center" justify="center" style="padding:0px;margin:0px;">
          <v-col cols="12" md="12" align="center" style="padding:0px;height:6vh;" >
            <h3 class="crwd-item-pokename" style="padding:0px;font-size:30px;">
              PokéSwap Race : day {{day}} / 180
            </h3>
          </v-col>
        </v-row>
        <v-row align="center"  justify="center" style="padding:0px;margin-top:1vh !important;">
          <v-col cols="12" md="12" align="center" style="padding-top:0px;">
            <PokeSaleList />      
          </v-col>
        </v-row>
    </v-col>
    <v-col cols="5" class="md-3">
       <TransferActivityTable /> 
    </v-col>
  </v-row>
</v-container>
</div>
</template>

<script>
import PokeSaleList from './poke-sale-list.vue';
import TransferActivityTable from './transfer-activity-table.vue';

export default {
	name: 'app-market',
	components: { PokeSaleList, TransferActivityTable },
	data() {
		return {
      initalDate : new Date(2021, 3, 26, 16),
      day : 91,
      catch : this.$store.state.account.totalBuy
    }
	},
  mounted()
  {
      console.log("RACE DAY ", this.raceDay())
      this.day = this.raceDay();
		
  },
  beforeDestroy() {
      clearInterval(this._interval)
	},
  methods : {
    raceDay : function()
    {
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const firstDate = new Date(this.initalDate);
      const secondDate = new Date();
     
      console.log("Inital Date ", firstDate  )
      return Math.round(Math.abs((firstDate - secondDate) / oneDay));
    }
  }
}
</script>

<style>
.over-bkg {
	z-index: 1;
	position: relative;
	height: 100%;
	margin: 0;
	padding: 0;
	background-color: transparent;
}

.poke-race{
    font-size:30px;
    font-family: PokemonSolidx  !important;
    color:#4d4d4d;
    padding:0;
    margin:0;
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

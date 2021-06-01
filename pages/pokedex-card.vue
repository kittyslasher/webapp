<template>

  <v-container >

     <v-row no-gutters class="pa-0 ma-0 " >
          <v-col
            cols="2"
            sm="2"
          >
            <div>
              <span>
                  <img class="top_icon" :src="icon(1)"/>
              </span>
            </div>
          </v-col>
         
      </v-row>
    
      <v-row style="padding:0px;margin-top:-5%;" >
        <v-col md="12" style="padding:0px;" class="card_img">
          <img class="card_img_poke" :src="poke_img(3)" />
        </v-col>
      </v-row>

      <v-row style="padding:0px;" class="mt-5 text-left">
      </v-row>
    
      <v-row style="padding:0px;margin-top:2%;" class="text-center">
        <v-col md="12" style="padding:0px;" class="">
          <div style="font-family: Robotobold !important;font-size:22px;" > {{ poke.id }}. {{ poke.name }}</div>
        </v-col>
      </v-row>

      <v-row style="padding:0px;" class="ma-1" justify="center">
        <v-col md="3" class="pa-0 mt-1 text-center" ></v-col>
        <v-col md="6" class="pa-0 mt-1 text-center" >
          <v-row align="center">
             <v-col md="3" class="text-rigth ma-0 skills ma-0 pa-0" align="right" >
               Lv 1. &nbsp
             </v-col>
             <v-col md="6" class="text-center ma-0 pa-0"  >
               <v-progress-linear
                  height="12"
                  color="grey darken-2"
                  rounded
                  buffer-value="100"
                  value="15" />
             </v-col>
             <v-col md="1" class="text-left skills ml-1 pl-0" justify="left" align="left">
              XP
             </v-col>
          </v-row>
        </v-col>
        <v-col md="3" class="pa-0 mt-1 text-center" ></v-col>
      </v-row>

      <v-row style="padding:0px;" class="mt-5 text-left">
      </v-row>

      <!-- divider line  -->
      <v-row style="padding:0px;border-bottom:1px solid#919191;" class="ma-1">
      </v-row>

      <!-- skills attackers  -->
       <v-row style="padding:0px;margin-top:4%;">
        <v-col md="6" class="pa-0 ml-0 text-center " >
           <v-row style="padding:0px;" v-for="item in stats" :key="item.id" >
            <v-col md="12" class="pa-0 mt-1" align="start" >
               <div class="wrapper_left">
                <div class="skills"> {{ item.type }} </div>
                <div class="progress" style="margin-top:1px;" >
                  <v-progress-linear
                    :color="item.color"
                    rounded
                    buffer-value=100
                    :value="item.val" /> 
                </div>
                <div class="progress-xp skills" ></div>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col md="6" >
          <v-row style="" >
            <v-col md="6" style="margin-left:-10%;padding-top:0;margin-top:0%;"> 
              <div class="text-center text-energy">
                Weakness
              </div>
              <div class="text-center">
                 <span>
                  <img alt="Weakness" class="icon_energy " :src="getWeakness(1)"/>
                </span>
              </div>
            </v-col>
            <v-col md="6" style="padding-top:0;" > 
              <div class="text-center text-energy">
                Resistance
              </div>
              <div v-if="getResistence().haveResistence" class="text-center">
                 <span>
                  <img alt="Resistence" class="icon_energy " :src="getResistence(1).img"/>
                </span>
              </div>
             </v-col>
          </v-row>

          <v-row align="center" justify="start">
            <v-col v-if="!finalStage(poke.id)" md="2" class="text-rigth ma-0 skills ma-0 pa-0" align="start" >
              <span style="font-weight:500;font-size:14px" class="skills">Tokens: </span>
            </v-col>
            <v-col v-if="finalStage(poke.id)" md="3" class="text-rigth ma-0 skills ma-0 pa-0" align="start" >
              <span style="font-weight:500;font-size:14px" class="skills">Tokens: </span>
            </v-col>
            <v-col v-if="finalStage(poke.id)" md="6" class="text-left ma-0 pa-0" align="left"> 
              <span class="skills ml-1" style="font-size:14px">{{poke.tokens}}</span>
            </v-col>
            <v-col v-if="!finalStage(poke.id)" md="5" class="text-left ma-0 pa-0 ml-0 pl-2 pr-2" align="center" >
              <v-progress-linear
                width="90%"
                height="7"
                :color="poke.tokens < poke.evolution_threshold ? 'red darken-2' : 'green darken-2;' "
                rounded
                :buffer-value="poke.evolution_threshold"
                :value="(poke.tokens/poke.evolution_threshold*100)"
                style="position:relative;width:100%"
                /> 
            </v-col>
            <v-col v-if="!finalStage(poke.id)" md="4" class="text-left ma-0 skills ma-0 pa-0" align="end" >
              {{poke.tokens}}/{{poke.evolution_threshold}}
            </v-col>
          </v-row>

          <v-row style="padding:0px;" class="mt-6" >
            <v-col cols="1" md="1" class="ma-0 skills ma-0 pa-0 " justify="center" align="start">
              <div style="padding-right:5%;">
                <img style="display:inline-block;" class="icon_pkbl" :src="pkbl_icon(1)"/>
              </div>
            </v-col>
            <v-col cols="5" md="5" class="ma-0 skills ma-0 pa-0 " justify="center" align="center">
              <span style="font-weight:500;font-size:14px;padding-left:0px;" class="skills">PKBL Staked:</span>
            </v-col>
            <v-col cols="4" md="4" style="padding-right:5%;" class="ma-0 skills ma-0 pa-0 text-start" justify="center" align="start">
              <span style="padding-left:0;font-size:14px;" class="skills">{{staked_pkbl}}</span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row style="padding:0px;" class="mt-11 text-left">
      </v-row>

      <v-row v-if="poke.tokens < poke.evolution_threshold" no-gutters justify="center" align="center" style="margin-top:6%;">
        <v-col cols="12" sm="12" class="text-center">
          <v-btn v-on:click="buyEvolution" style="" disabled rounded width="75%"  style="opacity:0.2;color:white !important;background-color: #424242 !important;" >Evolve</v-btn> 
        </v-col>
      </v-row>
      <v-row v-if="!(poke.tokens < poke.evolution_threshold) && poke.evolution_threshold != 0" no-gutters justify="center" align="center" style="margin-top:6%;">
        <v-col cols="5" sm="5" class="text-start">
          <v-btn v-if="poke.evolution_threshold > 0" v-on:click="buyEvolution" rounded width="100%" style="opacity:1;color:white !important;background-color: #424242 !important;" :style="evolve_amount > max_evolve ? 'opacity:0.2;' : 'opacity:1;' " >Evolve</v-btn> 
        </v-col>
        <v-col cols="1" offset="1" style="padding:0">
          <input type="button" v-on:click="evolve_amount == 0? 0 : evolve_amount= parseInt(evolve_amount)-1" value="-" class="minus btn">
        </v-col>
        <v-col cols="2" style="padding:0">
          <input style="text-align:center;width:100%;position:relative;" type="number" step="1" min="1" max="" name="quantity" v-model="evolve_amount" title="Quantity" size="4" pattern="" inputmode="">
        </v-col>
        <v-col cols="1" style="padding:0" class="text-right">
          <input type="button" v-on:click="evolve_amount < max_evolve ? evolve_amount = parseInt(evolve_amount)+1 : evolve_amount=evolve_amount " value="+" class="plus btn" :style="evolve_amount > max_evolve ? 'opacity:0.2;' : 'opacity:1;' " >
        </v-col>
      </v-row>
   
  </v-container>   
</template>
 


<script>

  import Contract from 'web3-eth-contract';
  import Web3Utils from 'web3-utils';
  import PokeList from '../bd/poke-dex.json'
  import SkillByType from '../bd/type_skills.json'

  export default {
    name: 'app-pokedex-card',
    props : ["show", "poke"],
    computed: {
        barColor() {
            return {
                "background-image": "url(" + ")" ,
                // height: `${this.height}px`
            };
        },
        staked_pkbl: function() {
          var _pkbl = new String(this.poke.tokens * this.poke.pkb_cost);
			    _pkbl = _pkbl.slice(0, 11);
          _pkbl = _pkbl.slice(0, _pkbl.indexOf('.')+7);
          var trimmed = _pkbl.match(/0{1,}$/);

          return  trimmed && _pkbl.indexOf('.') != -1 ? _pkbl.slice(0, trimmed.index) : _pkbl
        },
        _evolve_amount: function() {
          return Math.floor(this.poke.tokens/this.poke.evolution_threshold)
        },
        max_evolve: function() {
          return Math.floor(this.poke.tokens/this.poke.evolution_threshold)
        }
    },
    watch: {
      show: function() {
        this.evolve_amount = 0;
      }
    },
    data() {
      return {
        isModalVisible: true,
        evolve_amount: 0,
        stats : [
          {
            id : 1,
            type : 'HP',
            max : 100,
            val : 100,
            final : '',
            color : 'green'
          },
          {
            id : 2,
            type : 'Attack',
            max : 100,
            val : 1,
            final : '',
            color : 'grey'
          },
          {
            id : 3,
            type : 'Defense',
            max : 100,
            val : 1,
            final : '',
            color : 'grey'
          },
           {
            id : 4,
            type : 'Speed',
            max : 100,
            val : 1,
            final : '',
            color : 'grey'
          },
          {
            id : 5,
            type : 'Sp. Attack',
            max : 100,
            val : 1,
            final : '',
            color : 'grey'
          },
        ]
      };
    },
    mounted: function () 
    {
        console.log(" ***** POKEDEX  CARD MOUNTED **** ");
        this.fStage = this.finalStage(this.poke.id);
        console.log(" ***** DEL  **** ",this.fStage );
        console.log(" MAx evolve  ",  this.max_evolve , ' trashold ', this.poke.evolution_threshold);
    },
    methods: {
      buyEvolution() {
        if (window.ethereum && this.evolve_amount >= 1 )
        {
          
          if(this.evolve_amount > this.max_evolve)
          {
            console.error("Max evolve amount is ", this.max_evolve , " you try to evolve ", this.evolve_amount);
            return;
          }

          console.log('Poke ', this.poke, ' next id ', this.poke.nextId, ' evo amount ', this.evolve_amount );
          const ERC1155Crowdsale = new Contract(
              this.$store.state.contracts.erc1155.abi,
              this.$store.state.contracts.erc1155.address
          )
          ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
              from: this.$store.state.account.address,
              to: this.$store.state.contracts.erc1155.address,
              data: ERC1155Crowdsale.methods.mintEvolution(this.poke.nextId, this.evolve_amount).encodeABI()
            }]
          })
        }
      },
       getImageByType (type)
       {
          if(type == 'grass'){
            return require('@/assets/img/grass-energy.png');
          }else if(type == 'fire'){
            return require('@/assets/img/fire-energy.png');
          }
          else if(type == 'water'){
            return require('@/assets/img/water-energy.png');
          }
          else if(type == 'earth'){
            return require('@/assets/img/earth-energy.png');
          }
          else if(type == 'thunder'){
            return require('@/assets/img/thunder-energy.png');
          }
          else if(type == 'psy'){
            return require('@/assets/img/psy-energy.png');
          }
          else if(type == 'normal'){
            return require('@/assets/img/normal-energy.png');
          }
       },
       icon (id)
       {
          return this.getImageByType(this.poke.type);
       },
       getWeakness(t)
       {
          let type = SkillByType[this.poke.type][0]
          return this.getImageByType(type);
       },
       getResistence(t)
       {
          let type = SkillByType[this.poke.type]
          // console.log('...... have resistence ......' , this.poke.tokens);
          if(type.length > 1){
             this.haveResistence = true;
            return  { img : this.getImageByType(type[1]), haveResistence : true }
            
          }else{
            return { haveResistence : false };
          }
        
       },
       poke_img(id)
       {
            console.log('img iid ', this.poke.id);
            let p = this.poke.img_colored || '';
            return require('@/assets/img/moved_colored_icons/'+p);
      },
      finalStage(id){
        let final = [ 3, 6, 9, 12, 15, 18, 20, 22, 24, 26, 28, 31, 34, 36, 38, 40, 42, 45, 47, 49, 51, 53, 55, 59, 62, 65, 68, 71, 73, 76, 78, 80, 82, 83, 85, 87, 89, 91, 84, 95, 97, 99, 101, 103, 105, 106, 107, 108, 110, 112, 113, 114, 115, 117, 119, 121, 122, 123, 124, 125, 126, 127, 128, 130, 131, 132, 134, 135, 136, 137, 139, 141, 142, 143, 144, 145, 146, 149, 150, 151];
        let exist = final.find(x => x == id);
        return exist != 'undefined' && exist == id;
      },
      pkbl_icon(){
         return require('@/assets/img/webiste_imgs/pokeball.png');
      }
    }
  };
</script>


<style scoped >

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

.disable_button {
  background-color:  yellow  !important;
  opacity: 0.4;
}

.icon_energy:hover {
   
    transition: transform .4s;
    transform: scale(1.7);
}

.card-grass {
    background-image: linear-gradient(to left top, #418027, #4c8d31, #579b3c, #62a846, #6db651, #7ec05b, #8fcb65, #a0d56f, #b8de7c, #cfe88a, #e5f19a, #f9fbab);
}

.icon_pkbl{
  width: 20px;
}

.text-energy{
  font-family: Roboto;
  font-size:15px;
}

.poke_name{
   font-family: Robotobold !important;
   font-size:18px;
}

.skills{
    font-family: Robotolight !important;
    font-size:12px;
} 

.wrapper_left{
  /* clear:both; */
  margin-left: 30%;
  width: 43%;

}

.wrapper
{
  clear:both;
  margin-left: 33%;;
  margin-right: auto;
  width: 100%;
}
.in-level {
  /* background-color:red; */
  /* width:100px;  */
  float:left;
}
.progress {
  width:100px;
  float:left;
}
.progress-xp {
  /* background-color:#bada55; */
  float:left;
}

.main {
  display: flex;
  align-items: flex-start;
  background-color: gray;
  padding: 10px;
  width: 300px;
  height: 300px;
}


.card_img
{
  /* background: green;  */
  border-radius: 25%;
  height: 100%;
  width: 100%;
}

.card_img_poke
{
    height:270px;
    /* width:80%; */
    margin-left: 20%;;
    background-size: 90% 90%;
    /* background: green; */
    /* border-radius: 100%; */

}

.icon_energy
{
   width: 35px;
    border-radius: 5px;
}
.top_icon {
    /* background-color: white; */
    /* height: 45px; */
    width: 50px;
    border-radius: 5px;
}
 
 .container_row {
   /* border-radius: 15%; */
   /* border : 5px solid #424242; */
 }


</style>
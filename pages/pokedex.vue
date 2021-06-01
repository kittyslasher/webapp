<template>
<v-container cols="12" fill-height fluid > 
   
        <v-row class="">
             <v-col  cols="6">
                <h3>Pokédex Holdings: {{this.totalNfts}} Pokémon </h3>

                <div v-if="false">
                    <p style="font-size:13px;">View on 
                    <a target="_blank"  :href="getOpensea()" >
                        
                        <img style="vertical-align:middle" alt="View Deck on Opensea" src="~/assets/img/opensea.png" width="25" height="25" >
                    </a>
                    </p>
                </div>

            </v-col>
             <v-col cols="6" >
                <!-- <h3>  {{this.totalNfts}} </h3> -->

                 <v-row>
                    <!-- <button
                        type="button"
                        class="btn"
                        @click="showModal"
                    >
                        Open Modal!
                    </button> -->

                    <!-- <div v-if="dialog" >
                         <p> Show... </p>
                        <PokedexCard v-bind:show="dialog" />
                    </div> -->

                    <v-dialog hide-overlay max-width="500" content-class="v-dialog--custom"
                        v-model="dialog"
                        transition="dialog-bottom-transition"
                    >
                      <PokedexCard v-bind:show="dialog" v-bind:poke="selectedPoke"  />
                    </v-dialog>

                </v-row>


            </v-col>
        </v-row>
       
        <br>

         <div v-if="isMounted"  style="margin-top:5%;">

            <v-row  align="center" cols="10" style="margin-bottom:5px;"  v-for="i in 14" :key="i" >

                    <v-col class="dex-main-td"  v-for="(item, index) in getColumnsByRow(i)" :key="index"  v-on:click="clickCard(item)" cols="1" sm="1" md="1" style="margin-left:0px;" >
                        <div style="heigth: 100%;">
                            <v-row class="img_frame">
                                <img  class="poke_img" :class="{ no_border_img: item.tokens > 0}"  :src="getImage(item)" />
                            </v-row>
                            <div style="margin-top:0%;heigth:100%;padding-bottom:30%;" >
                                <v-row justify="center" align="center" class="poke_name_robo">
                                     <p style="" class="poke_name_robo_bold">{{item.id}}. {{item.name}} </p>
                                </v-row>
                               
                                <div class="poke_qyt text-center">
                                    <span style="width: 50%; text-align: left;margin-left:2%; ">Caught : </span>
                                    <span style="width: 35%;text-align:left;margin-left:5%; ">{{item.tokens || 0}}</span>
                                </div>
                            </div>
                        </div>
                    </v-col>
                    <v-col v-if="i==13"  v-for="t in 5" :key="i+7777+t" cols="1" sm="1" md="1" style="margin-left:0px;"  >    
                    </v-col>
                    
            </v-row>

         </div>
       
        <br>

        <!-- <div>
            <img src="~/assets/img/colored_icons/1_bulbasaur.png" />
        </div> -->
        

</v-container>
  
</template>

<script>
import PokeCard from './poke-card.vue'
import PokeList from '../bd/poke-dex.json'
import Web3Utils from "web3-utils";
import Contract from 'web3-eth-contract';
import Web3ABI from 'web3-eth-abi';
import PokedexCard from './pokedex-card.vue';



function readUserBalances(wa)
{
    return [ 
         { id : 1, amount : 10 } ,
        // { id : 14, amount : 20 }, 
        // { id : 15, amount : 30 }, 
        // { id : 34, amount : 312 },
        // { id : 47, amount : 356 },
        // { id : 21, amount : 987 },
        // { id : 53, amount : 368 },
        // { id : 65, amount : 987 },
        // { id : 25, amount : 987 },
        // { id : 89, amount : 572 },
        // { id : 10, amount : 134 },
        // { id : 111, amount : 987 },
        // { id : 140, amount : 750 }           
    ];
}

export default {
    props : [
            "owned_ids",
            "number"
    ],
    components: 
    {
      PokedexCard,
    },
    async fetch() {
        console.log("[DECK] fetch data");
        this.initPokeList();
    },
    data () {
    
        return {
            selectedPoke : 1,
            dialog: false,
            columns : 6,
            pokeList : [] ,  
            user_deck : this.$store.state.deck_balance.balances,
            totalNfts : 0,
            isMounted : false,
            isBalanceLoad : false,
            rowsIds : [],
            address : this.$store.state.account.address
        }
    },
    mounted: async function () 
    {
            console.log(" ***** {MOUNTED}[DECK]  POKEDEX MOUNTED **** ");
            
            this.$store.commit('deck_balance/setTotalTypes',   this.user_deck.length )
            this.isMounted = true;
            this.genRowIDs()
            this.getDeckBalance()
            this._interval = setInterval(this.getDeckBalance, 1000 * 5) 
    },
    beforeDestroy() {
        clearInterval(this._interval)
	},
    created: function()
    {
        // console.log('Created Method [DECK] <-> ');
        this.getDeckBalance()
    },
    watch : 
    {
        totalNfts : function(oldValue, newValue){
            console.log('Change TOTAL NFT old ', oldValue, ' new Value ', newValue);
        },
        user_deck : function(oldValue, newValue){
            console.log('Change user DEck ', newValue);
        },
        superBalance: function (oldValue, newValue) {
            console.log('[pokedex] Balance id was changed ', newValue );
        }
    },

    methods: {
        getOpensea(){
            return  "https://opensea.io/accounts/" + this.address
        },
        initPokeList ()
        {
            console.log('toke list ' , PokeList );
            this.pokeList = PokeList.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)); 
        },
        getImage(poke)
        {
            if(poke.tokens > 0){
                return require('@/assets/img/moved_colored_icons/' + poke.img_colored);
            }
            else{
                return require('@/assets/img/moved_shadow_icons/' + poke.img_shahow);
            }
        },
        clickCard (item)
        {
            console.log('tokens ', item.tokens)
            console.log('window.ethereum ', window.ethereum)
            console.log('Test ', item.tokens == 0 || !window.ethereum);

            if(!item.tokens || item.tokens == 0 || !window.ethereum) return
            // console.log('Click Card ', item);
            item.evolution_threshold = this.pokeList[item.id].isEvolution? this.pokeList[item.id].evolution_threshold : 0;
            item.nextId =  this.pokeList[item.id].isEvolution? this.pokeList[item.id].id : undefined;
            this.selectedPoke = item;
            this.dialog = !this.dialog;
        },
        showModal() {
            this.dialog = !this.dialog;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        genRowIDs : function()
        {
            let startNumber = Math.floor(Math.random() * 999) + 155;
            for(let i = 1 ; i < 14 ; i++)
            {
                this.rowsIds.push(startNumber++);
            }
            console.log('Gen row ids ', this.rowsIds)
            this.joinBalanceWithBd()
        },
        getDeckBalance : async function()
        {

            console.log('*****  get deck balance ******  ');
            const totalIds = 151;
            let addr_list = [];
            let pokes_id = []
            const self = this;
            const currentAccount = this.$store.state.account.address;
            this.address = this.$store.state.account.address;

            for(var i=1; i < (totalIds + 1) ; i++)
            {
                pokes_id.push(i);
                addr_list.push(currentAccount);
            }

            // PokeList.forEach(element => {
            //     this.pokes_id.push(element.id.toString());
            //     addr_list.push(this.currentAccount);
            // });

            if(!this.$store.state.account.address) return;

            const ERC1155Crowdsale = new Contract(
                    this.$store.state.contracts.erc1155.abi,
                    this.$store.state.contracts.erc1155.address
            )

            // console.log("poke id ", [...this.pokes_id] );
            ethereum.request({
                    method: 'eth_call',
                    params: [{
                        to: this.$store.state.contracts.erc1155.address,
                        data: ERC1155Crowdsale.methods.balanceOfBatch( addr_list,  pokes_id ).encodeABI()
                    }]
            })
            .then(result => 
            { 
                // console.log('1. result of balance Batch ' , result, '  end.' );
                if(result != '0x') {
                    let arr_deck = Web3ABI.decodeParameter('uint256[]', result );
                    self.$store.commit('deck_balance/setDeckBalance', arr_deck );
                    self.user_deck = arr_deck;
                    //count how many type of tokens user have
                    this.$store.commit('deck_balance/setTotalTypes',  arr_deck.filter(x => parseInt(x) > 0 ).length  );
                    self.genRowIDs();
                    // console.log("Convert array : ",  arr_deck  );
                }
            });

        },
        getImgUrl(id) {

            var images = require.context('../assets/img/moved_shadow_icons', false, /\.png$/)
            let imgPath = '@/assets/img/moved_colored_icons/' + id
            console.log('images , ', imgPath);
            return require('@/assets/img/moved_colored_icons/' + id);
            
        },
        greet: function (event) {
        // `this` inside methods point to the Vue instance
        alert('Hello ' + this.name + '!')
        // `event` is the native DOM event
        alert(event.target.tagName)
        },
        pathForImage : function(item)
        {
            return "_nuxt/assets/img/colored_icons/" + item.img;
        },
        joinBalanceWithBd : function()
        {
            console.log(' *** joinBalanceWithBd **** ');
            let _totalAmount = 0;
            let types = 0;
            //iterate over balance

            for (let index = 0; index < this.user_deck.length; index++) 
            {
                let amount = parseInt( this.user_deck[index] );
                //get the position of bd id using the ID
                let userOwned = this.pokeList[index];
                
                userOwned.tokens = amount;
                if(amount > 0)
                {
                    userOwned.img = require('@/assets/img/moved_colored_icons/' + userOwned.img_colored);
                    _totalAmount +=  amount;
                    types ++;
                }
                console.log('total amout ',_totalAmount );
            }
            this.$store.commit('deck_balance/setTotalTypes',  types );
            this.totalNfts = _totalAmount;
        },
        loadBalance : function()
        {
            // console.log('# Load Balance :  ', this.$store.state.deck_balance.balances );
            if(this.isBalanceLoad)
            {
                return;
            }

            //set user_deck with data from bc from store
            this.user_deck = this.$store.state.deck_balance.balances;
            this.joinBalanceWithBd();
            this.isBalanceLoad = true;

        },      
        //check balance of each poke
        applyUserBalance: function(poke_dex_itens)
        {
            console.log("Apply balance #",  );
            poke_dex_itens.forEach(poke => 
            {
                let userOwned = this.user_poke.filter((uBalance) => 
                {
                    return uBalance.id == poke.id;
                });

                //user owen poke on deck        
                if(userOwned && userOwned.length > 0)
                {
                    console.log('User Owen ' , userOwned[0] );
                    poke.img = require('@/assets/img/moved_colored_icons/' + poke.img_colored);
                    this.totalNfts += parseInt( userOwned[0].amount) * 1
                    console.log('Total NFT ', this.totalNfts);
                    poke.tokens = userOwned[0].amount;
                }
                //user wont have this poke on deck
                else
                {
                    poke.img = require('@/assets/img/moved_shadow_icons/' + poke.img_shahow);
                    poke.tokens = 0;
                }

            });
            console.log('Deck itens ', poke_dex_itens);
        },
        //transform idx in poke bd interval according the number of columns showed!
        getColumnsByRow : function(row)
        {

            //this.loadBalance();

            let itensPerRow = 12;
            let startIdx = (row -1) * itensPerRow ;
            let endIdx = (startIdx + (itensPerRow )) > this.pokeList.length  ?  this.pokeList.length  : (startIdx + (itensPerRow ));

            // console.log('row  ', row , ' start idx ', startIdx , ' end idx ', endIdx);
            // console.log('Getting cols by row ', row);
            let rowOfPokemon = this.pokeList.slice( startIdx  , endIdx );
            
            // console.log("PokeList  #", this.pokeList.length);
            
            // this.applyUserBalance(rowOfPokemon)
            // console.log('Row of Pokemons ', ...rowOfPokemon );
            // console.log('Row of Pokemons # ', rowOfPokemon.length );
            return rowOfPokemon;
        }

    },
    name: 'poke-dex',
    components: { PokeCard,
        PokedexCard },
}


</script>

<style>

.opensea_img{
	background-image:url(~/assets/img/webiste_imgs/mat-logo.png); 
	background-size: 50px 50px;
	background-color:#E9EBEE;
	background-repeat: no-repeat;
}

.no_border_img {
    border-radius: 0 !important;
}

.v-dialog--custom {
  /* border-radius: 10%; */
  background-color: white;
  height: auto;
  /* overflow-x: hidden; */
  border : 7px solid #FAE159  
  /*overflow-y: hidden;*/
}
.poke_name_robo_bold
{
    font-size:12px;
    font-family: Robotobold !important
}

.poke_name_robo
{
    font-size:12px;
    font-family: Robotolight !important
}
.poke_qyt {
    font-size:11px;
    font-family: Robotolight !important;
   
    
}
.poke_nfts {
    font-size:11px;
    font-family: Robotolight !important
}


.dex-main-td:hover{
    margin-bottom: 20%;
    cursor:pointer;
    /* border : 2px solid #424242; */
    border : 2px solid #FAE159  ;
    /* background: linear-gradient(119.9472198772661deg, rgba(247, 247, 104,1) 34.781394675925924%,rgba(242, 231, 27,1) 52.48133680555556%,rgba(247, 247, 104,1) 79.9558738425926%); */
    transition: transform .4s;
    background-color: white;
    transform: scale(1.5);
    /* border-radius: 0px; */
    margin: 0 auto;
}

.poke_img{
    /* background: white; */
    margin:0;
    min-height: 90px;
    max-height: 95px;
    height:50%;
    width:90%;
    background-size: 50%;
    border-radius: 100%;
    background-repeat: no-repeat;
}
.dex-main-td:hover .poke_img{
     border-radius: 0;
} 

.img_frame{
    display: flex;
    align-items: center;
    margin-left:2%;
    justify-content: center;
    margin-top: 20%;
    margin-bottom:20%;
    height: 100%;
    width: 99%;
    padding-top: 5%;
    /* background-image: url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6a466c46-7fdb-4916-ab6b-fd59bfa64d55/d4nn7fc-943dbad3-12e4-4735-ab9a-31924b0b0b9c.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNmE0NjZjNDYtN2ZkYi00OTE2LWFiNmItZmQ1OWJmYTY0ZDU1XC9kNG5uN2ZjLTk0M2RiYWQzLTEyZTQtNDczNS1hYjlhLTMxOTI0YjBiMGI5Yy5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.5FF9xCYmIClo3li8BOszxdivnvApSrjUEoK-2e_83JA);  */
    background-size: 102% 105% ;
    border-radius: 90%;
       
}



.flex-container {
  /* We first create a flex layout context */
  display: flex;
  flex-flow: row wrap;
  /* Then we define how is distributed the remaining space */
  justify-content: space-around;
  padding: 0;
  margin-top:4%;
  margin-left:2%;
  margin-right:2%;
  height: 20%;
    width: 95%;
    background: linear-gradient(
119.9472198772661deg
, rgba(247, 247, 104,1) 34.781394675925924%,rgba(242, 231, 27,1) 52.48133680555556%,rgba(247, 247, 104,1) 79.9558738425926%);
    border-radius: 30px;
    padding: 1%;
    display: flex;
    border: 4px solid #424242;
    box-shadow: 4px 4px 4px #d3d3d3;
    margin-bottom: 10%;
}



.dex-main-td{
    transition: transform .4s;
    height: 100%;
    margin:0;
    padding: 0;
    display: table-cell;
    border-collapse: separate;
    border-radius: 20px;
    border: 0px solid #424242;
    /* box-shadow: 4px 4px 4px #d3d3d3; */
}


.poke-dex-img{
    margin:0;
    padding:0;
    height:58%;
    width:100%;
}

.poke-icon-dex{
    margin-top:15%;
    margin-left:25%;
    margin-right:25%;
    padding:0;
    height:65px;
    width:65px;
    border-radius:50px;
}

.dex-name{
    margin:0;
    padding:0;
    height:13%;
    width:100%;
}


</style>


<template>

    <v-container style="margin-left:30px;padding:0px;margin-top:15px;" >
        <div v-if="isMounted">
        <!-- HEAD -->
         <v-row class="headertab table_header " style="width:100%;padding:0px;margin-bottom:7px; margin-left:0px;">
             <v-col cols="4" sm="4" md="4" class="" >
                <p>PokéTK</p>
             </v-col>
             <v-col cols="2" sm="2" md="2" class="" >
                <p>PKBL Value</p>
             </v-col>
            <v-col cols="3" sm="3" md="3" class="" >
                <p>Available</p>
             </v-col>
             <v-col cols="3" sm="3" md="3" class="" >
                 <p>PokéTK Supply</p>
             </v-col>
           
        </v-row> 
         <!-- ROWS   -->
        <div style="position:relative;height:248vh;overflow-y:scroll;overflow-x:hidden;margin-top:1vh;">
            <v-row    v-for="poke in poke_list" :key="poke.id" style="padding:0px;margin-left:0px;width:100%;" class="ativity_row info_table">
             <v-col cols="4" sm="4" md="4" class="" >
                 <v-row>
                      <v-col cols="2" sm="2" md="2">
                          <div style="margin-top:10px;"> {{poke.id}}.</div>
                      </v-col>
                      <v-col cols="10" sm="10" md="10">
                          <div>
                              <span>
                                  <img class="poke_icon_table" :src="getImage(poke.img_colored)"/>
                              </span>
                              
                              <div class="pfit" style="">{{poke.name}}</div>
                              
                          </div>
                      </v-col>
                 </v-row>
             </v-col>
             <v-col cols="2" sm="2" md="2" class="text-center" >
                 <div style="margin-top:10px;">
                     <span>{{ roundPrices( poke.pkb_cost) }} PKBL</span>
                 </div>
             </v-col>
             <v-col cols="3" sm="3" md="3" class="text-center" >
                <div style="margin-top:10px;margin-left:10%;">
                     <span>  {{ getAvailable(poke) }}  </span>
                 </div>
             </v-col>
             <v-col cols="3" sm="3" md="3" class="text-center" >
                <div style="margin-top:10px;">
                     <span> {{  formatUsd(poke.maxSupply) }} </span>
                 </div>
             </v-col>
        </v-row>

        </div>
        

        </div> 
        

    </v-container>

</template>

<script>
// import PokeCard from './poke-card.vue'
// import Crowdsales from '../bd/crowdsales.json'
import PokeList from '../bd/poke-dex.json'
import Web3Utils from "web3-utils";
import Contract from 'web3-eth-contract';
import Web3ABI from 'web3-eth-abi';


export default {
    name: 'app-about-table',
    data() {
       return {
           poke_list : PokeList.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)),
           unitary_val : "0.001",
           totalSupply : [],
           maxSupply : [],
           isMounted : false
       }
    },
    mounted:  function () 
    {
        console.log('About table mounted ' );
        let self =  this;
        this.loadCaps();
        console.log('Total getMaxSupply ',this.maxSupply );
        this.isMounted = true;

    },
    methods : {

        loadCaps : function()
        {
            let self =  this;

            if (window.ethereum)
            {
                this.poke_list.forEach(elem => {
                    self.getTotalSupply(elem.id);
                });
                this.poke_list.forEach(elem => {
                    self.getMaxSupply(elem.id);
                });
            }

        },
        roundPrices: function(price){
            return  price.toFixed(1)
        },
        formatUsd : function (val){
            return new Intl.NumberFormat('en-US', { style: 'decimal' }).format(val);
        },
        getAvailable : function(poke){
            return this.formatUsd(poke.maxSupply - poke.totalSupply);
        },
        getPercentual : function(poke)
        {
            //  return "242353%"
            console.log('poke.totalSupply ', poke.totalSupply);
            console.log('poke.maxSupply ', poke.maxSupply);
           
            let perc = poke.totalSupply > 0.00 ?  ( (poke.totalSupply  / poke.maxSupply)  * 100).toFixed(4) : 0;
            // console.log("percentage ", perc);
            return  perc;
        },
        getTotalSupply(id)
        {
            let self = this;
            const ERC1155Crowdsale = new Contract(
                    this.$store.state.contracts.erc1155.abi,
                    this.$store.state.contracts.erc1155.address
            )

            ethereum.request({
                    method: 'eth_call',
                    params: [{
                        to: this.$store.state.contracts.erc1155.address,
                        data: ERC1155Crowdsale.methods.totalSupply( id ).encodeABI()
                    }]
            })
            .then(result => 
            { 
                // console.log("Result of total supply for id ", id, ' is ', Web3Utils.hexToNumberString(result));
                console.log('GET totalSupply ', Web3Utils.hexToNumberString(result));

                self.totalSupply[id-1] = Web3Utils.hexToNumberString(result);    
                self.poke_list[id-1].totalSupply = Web3Utils.hexToNumberString(result);
            });
        },
        getMaxSupply(id)
        {
            let self = this;
            const ERC1155Crowdsale = new Contract(
                    this.$store.state.contracts.erc1155.abi,
                    this.$store.state.contracts.erc1155.address
            )

            ethereum.request({
                    method: 'eth_call',
                    params: [{
                        to: this.$store.state.contracts.erc1155.address,
                        data: ERC1155Crowdsale.methods.maxSupply( id ).encodeABI()
                    }]
            })
            .then(result => 
            { 
                console.log('GET MAx Supply ', Web3Utils.hexToNumberString(result));
                // console.log("Result of total supply for id ", id, ' is ', Web3Utils.hexToNumberString(result));
                self.maxSupply[id-1] = Web3Utils.hexToNumberString(result);
                self.poke_list[id-1].maxSupply = Web3Utils.hexToNumberString(result);    
            });
        },
        getImage (id){
            // console.log('img iid ', id);
            return require('@/assets/img/moved_colored_icons/'+id);
        }
    },
    components: { },
}
</script>

<style>
.pfit {
    display: inline;
    float: right;
    width: 50%;
    padding: 0;
    margin-left: -10%;
    margin-right: 10%;
    margin-top: 5%;
}
.poke_icon_table {
    /* background-color: white; */
    height: 35px;
    width: 35px;
    border-radius: 0px;
}

.info_table {
    /* border-bottom:1px solid white; */
    /* background:linear-gradient(124.12280687684802deg, rgba(245, 245, 245,1) 27.297453703703702%,rgba(255, 255, 255,1) 36.20370370370371%,rgba(245, 245, 245,1) 79.30555555555556%); */
    font-size:15px;
    margin-top:0px  !important;
    margin-bottom:0px;
    background-color: #E9EBEE;
    width: 110%;
    /* padding:5px; */
    font-family: Robotolight;
    font-size: 12px;
    text-align: center;
    color: #4d4d4d;
    border-radius: 5px;
}
.header_topic{
    margin-top : 1.5%;
    padding-left:0;
    padding-right:0;
    padding-top:0;
    padding-bottom:0;
    font-family: Robotobold;
    font-size: 12px;
    /* border-bottom: 1px solid white; */
    margin-bottom: 0;
}


    .table_header{
        box-sizing: border-box; 
        background-color:#424242;
        color:#E9EBEE;
        border-radius: 5px;
        font-family: Robotobold;
        font-size: 12px;
    }
    .headertab{
        /* width:100%; */
        height:40px;
    }

    .bill-text {
        font-family: Roboto;
        text-align: justify;
        color: #4d4d4d;
    }

</style>



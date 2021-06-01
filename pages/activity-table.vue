<template>

    <v-container style="padding:0">
        <!-- HEAD -->
        <div style="">
            <v-row class="act_table_header text-center" justify="center" align="center" style="width:100%;height:6vh; !important;padding:0px;margin:0px;">
                <v-col cols="3" sm="3" md="3" offset="1" class=""  >
                    <span style="font-family: Roboto;">Pokemon</span>
                </v-col>
                <v-col cols="2" sm="2" md="2" offset="1">
                    <span style="font-family: Roboto;" >Amount</span>
                </v-col>
                <v-col cols="3" sm="3" md="3">
                    <span style="font-family: Roboto;" >Trainer</span>
                </v-col>
                <v-col cols="2" sm="2" md="2">
                    <span style="font-family: Roboto;" >Block</span>
                </v-col>
            </v-row> 
         <!-- ROWS   -->
         <div style="position:relative;height:74vh;overflow-y:scroll;overflow-x:hidden;margin-top:1vh;">
            <v-row v-for="item in transfers" :key="item.trxHash" style="position:relative;width:100%;margin-bottom:1%;" align="center" class="ativity_row info_table">
                <v-col cols="1" sm="1" md="1">
                    <span style="font-weight:500">{{item.id}}.</span>
                </v-col>
                <v-col cols="1" sm="1" md="1">
                    <span>
                        <img class="poke_icon_table" :src="item.img" />
                    </span>
                </v-col>
                <v-col cols="2" sm="2" md="2" >
                    <span style="font-weight:500" class="act_pfit">{{item.type}}</span>
                </v-col>
                <v-col cols="2" sm="2" md="2" offset="1" class="d-flex justify-center">
                    <span style="font-weight:500;text-align:right;">{{item.amount}}</span>
                </v-col>
                <v-col cols="3" sm="3" md="3" class="d-flex justify-center">
                   <span style="font-weight:500">{{item.reduceWa}}</span>
                </v-col>
                <v-col cols="1" sm="1" md="1" class="d-flex justify-start">
                    <a target="_blank" style="color: inherit;" :href="item.trxHash"  ><span>{{item.block}}</span></a>                         
                </v-col>
            </v-row>
        </div>
        </div>
    </v-container>
</template>

<script>
import Web3Utils from 'web3-utils';
import Web3ABI from 'web3-eth-abi';
import PokeDex from '../bd/poke-dex.json';


export default {
    name: 'app-activity-table',
    props : [ "wa", "pokes", "number" ],
    mounted() {
        this.getTransferActivity()
        this._interval = setInterval(this.getTransferActivity, 1000 * 5) 
    },
    beforeDestroy() {
        clearInterval(this._interval)
	},
    data() {
       return {
           a : 1,
           explorer : "https://etherscan.io/tx",
           totalBuy : 0,
           totalActivity : 30,
           transfers: [{
               id : 1,
               amount : 1,
               trainer : '0x000000',
               type : 'NA',
               img : require('@/assets/img/moved_colored_icons/1_bulbasaur.png'),
               block : '0x00000'
           }],
       }
    },
    methods : {
        getImage (){
            return require('@/assets/img/moved_colored_icons/7_squirtle.png' );
        },
        getTransferActivity: function() {
            console.log('Get transfer ativity handler ');
            this.$store.commit('deck_balance/setBalanceId', new Date().getSeconds() );
            let self = this;


           if (window.ethereum)
           {
               ethereum.request({
                    method: 'eth_getLogs',
                    params: [{
                        address: this.$store.state.contracts.erc1155.address,
                        fromBlock: '0x7de290',
                        toBlock: 'latest',
                        topics: [
                            "0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62",
                            null,
                            "0x0000000000000000000000000000000000000000000000000000000000000000"
                        ]
                    }]
                })
                .then(result => {
                    // console.log('Result transctaion ', result );
                    this.$store.commit('account/setTotalBuys', result.length );
                    this.transfers = result.map(e => {
                        // console.log('Result transctaion E ', e );
                        const _data = Web3ABI.decodeParameters(['uint256','uint256'], e.data)
                        const pokemon = PokeDex.filter(pd => pd.id == _data[0])[0];
                        const _trainerWa = Web3ABI.decodeParameter('address', e.topics[3]);
                        return {
                            id: _data[0],
                            amount: _data[1],
                            trainer: _trainerWa,
                            reduceWa : _trainerWa.slice(0, 6) + '...' + _trainerWa.slice(38, _trainerWa.length),
                            type: pokemon.name,
                            trxHash : self.explorer + '/'+ e.transactionHash,
                            img : require('@/assets/img/moved_colored_icons/' + pokemon.img_colored),
                            block: Web3Utils.hexToNumberString(e.blockNumber)
                        }
                    }).reverse().slice(0, self.totalActivity)  
                })
           } 

            console.log("Ativity transfers ", this.transfers );
        }
    },
    components: { },
}
</script>

<style>

.ativity_row:hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) {
    opacity: 0.65;
}

.act_pfit {
    display: inline;
    float: right;
    width: 50%;
    padding: 0;
    margin-left: -10%;
    margin-right: 10%;
    margin-top: 5%;
}
.poke_icon {
    background-color: white;
    height: 35px;
    width: 35px;
    border-radius: 40px;
}

.info_table {
    border-bottom:1px solid white;
    /* background:linear-gradient(124.12280687684802deg, rgba(245, 245, 245,1) 27.297453703703702%,rgba(255, 255, 255,1) 36.20370370370371%,rgba(245, 245, 245,1) 79.30555555555556%); */
    font-size:15px;
    
    background-color: #E9EBEE;
    margin: 0px; 
    /* padding:5px; */
    font-family: Robotolight;
    font-size: 12px;
    text-align: center;
    color: #4d4d4d;
    border-radius: 5px;
    border-radius:20px 20px 20px 20px;

}
.header_topic{
    margin-top : 2%;
    padding-left:0;
    padding-right:0;
    padding-top:0;
    padding-bottom:0;
    font-family: Robotobold;
    font-size: 12px;
    border-bottom: 3px solid white;
    margin-bottom: 0;
}


.act_table_header{
    position:relative;
    background-color: white;
    box-sizing: border-box;
    background-color:#424242;
    color:#E9EBEE;
    border-radius: 10px;
    margin-bottom: 15%;
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



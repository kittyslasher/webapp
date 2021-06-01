<template>

    <v-container style="padding:0">
        <!-- HEAD -->
        <div style="">
            <v-row class="act_table_header text-center" justify="center" align="center" style="width:100%;height:6vh;padding:0px;margin:0px;">
                <v-col cols="3" sm="3" md="3" offset="1" align="left">
                    <h5 class="crwd-item-pokename" style="letter-spacing:2px;">Pokémon</h5>
                </v-col>
                <v-col cols="2" sm="2" md="2" offset="1">
                    <h5 class="crwd-item-pokename" style="letter-spacing:2px;">Amount</h5>
                </v-col>
                <v-col cols="3" sm="3" md="3">
                    <h5 class="crwd-item-pokename" style="letter-spacing:2px;">Trainer</h5>
                </v-col>
                <v-col cols="2" sm="2" md="2">
                    <h5 class="crwd-item-pokename" style="letter-spacing:2px;">Block</h5>
                </v-col>
            </v-row> 
         <!-- ROWS   -->
         <div style="position:relative;height:81vh;overflow-y:scroll;overflow-x:hidden;margin-top:1vh;">
            <v-row v-for="item in transfers" :key="item.trxHash" style="position:relative;width:100%;margin-bottom:1%;" align="center" class="info_table">
                
                <v-overlay v-if="item.id == -1" style="position:relative;width:100%;height:100%;opacity:0.6;" class="nohover">
                    <div style="margin-bottom:50%;"></div>
                    <v-progress-circular
                        indeterminate
                        size="30"
                    ></v-progress-circular>
                    <div style="margin-top:50%;"></div>
                </v-overlay>

                <v-col v-if="item.id != -1" cols="1" sm="1" md="1">
                    <span style="font-weight:500">{{item.id}}.</span>
                </v-col>
                <v-col v-if="item.id != -1" cols="1" sm="1" md="1">
                    <span>
                        <img class="poke_icon_table" :src="item.img" />
                    </span>
                </v-col>
                <v-col v-if="item.id != -1" cols="2" sm="2" md="2" >
                    <span style="font-family:Roboto !important;font-weight:500" class="act_pfit">{{item.type}}</span>
                </v-col>
                <v-col v-if="item.id != -1" cols="2" sm="2" md="2" offset="1" class="d-flex justify-center">
                    <span style="font-family:Roboto !important;font-weight:500;text-align:right;">{{item.amount}}</span>
                </v-col>
                <v-col v-if="item.id != -1" cols="3" sm="3" md="3" class="d-flex justify-center">
                   <span style="font-family:Roboto !important;font-weight:500">{{item.reduceWa}}</span>
                </v-col>
                <v-col v-if="item.id != -1" cols="1" sm="1" md="1" class="d-flex justify-start">
                    <a target="_blank" style="font-family:Roboto !important;color: inherit;" :href="item.trxHash"><span>{{item.block}}</span></a>                         
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

const BN = Web3Utils.BN;

export default {
    name: 'app-activity-table',
    props : [ "wa", "pokes", "number" ],
    mounted() {
        let self = this;
        this._interval = setInterval(this.getTransferActivity, 1000 * 5)
        setTimeout(() => 
        {   
            self.getTransferActivity(true)
        }, 1000);
       
    },
    beforeDestroy() {
        clearInterval(this._interval)
	},
    data() {
       return {
           a : 1,
           explorer : "https://explorer-mainnet.maticvigil.com/tx",
           totalBuy : 0,
           totalActivity : 30,
           transfers: [{ id: -1 }],
           _searchLock: false,
           _lastBlock: 0,
       }
    },
    methods : {
        getImage (){
            return require('@/assets/img/moved_colored_icons/7_squirtle.png' );
        },
        getTransferActivity: async function(initialLoad) {
            this.$store.commit('deck_balance/setBalanceId', new Date().getSeconds() );
            let self = this;
            var emptyCtrLimit = 50;

            if (window.ethereum && !this._searchLock)
            {
                console.log("Get Logs #1 ", this.$store.state.contracts.erc1155.address );
                
                // Lock function while searching the blockchain
                this._searchLock = true;

                // Get latest block
                var _start = await ethereum.request({
                    method: 'eth_blockNumber',
                    params: []
                });
                var start = parseInt(_start);
                var emptyCtr = 0;
                
                do {
                    let lowerLimit = start - 1000;
                    if(lowerLimit <= this._lastBlock) {
                        lowerLimit = this._lastBlock;
                    }
                    if(initialLoad) {

                    }

                    var limits = { from: lowerLimit, to: start };
                    let _logs = await ethereum.request({
                        method: 'eth_getLogs',
                        params: [{
                            address: this.$store.state.contracts.erc1155.address,
                            fromBlock: '0x' + limits.from.toString(16),
                            toBlock: '0x' + limits.to.toString(16),
                            topics: [
                                "0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62",
                                null,
                                "0x0000000000000000000000000000000000000000000000000000000000000000"
                            ]
                        }]
                    })

                    if(_logs.length > 0) {
                        _logs = _logs.reverse().map(e => {
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
                        })
                        
                        if(initialLoad) {
                            this.transfers = this.transfers.concat(_logs)
                            if(this.transfers.length > 0) {
                                this.transfers = this.transfers.filter(e => e.id != -1);
                            }
                        }
                        else
                            this.transfers = _logs.concat(this.transfers)


                        // Remove duplicates
                        this.transfers = this.transfers.filter((elem, index) => {
                            if(!this.transfers.find((e, i) => e.trxHash == elem.trxHash && index != i))
                                return true;
                            else return false;
                        })

                    }
                    
                    start -= 1000;

                    if(this.transfers.length >= 10 && _logs.length == 0)
                        emptyCtr++;
                }
                while(emptyCtr < emptyCtrLimit && this.transfers.length < 31);
                
                this.$store.commit('account/setTotalBuys', this.transfers.length);

                this._lastBlock = parseInt(_start);
                this._searchLock = false;
           } 
        }
    },
    components: { },
}
</script>

<style>

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
    font-size:15px;
    background-color: rgb(233, 235, 238, 0.8);
    margin: 0;
    margin-top:0 !important;
    font-family: Robotolight;
    font-size: 12px;
    text-align: center;
    color: #4d4d4d;
    border-radius: 20px 20px 20px 20px;
    border: 1px solid #424242;
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
    background-color: transparent;
    box-sizing: border-box;
    color:#E9EBEE;
    margin-bottom: 15%;
}

.headertab{
    /* width:100%; */
    height:40px;
}

.poke_icon_table {
    /* background-color: white; */
    height: 35px;
    width: 35px;
    border-radius: 0px;
}

.info_tables {
    /* border-bottom:1px solid white; */
    /* background:linear-gradient(124.12280687684802deg, rgba(245, 245, 245,1) 27.297453703703702%,rgba(255, 255, 255,1) 36.20370370370371%,rgba(245, 245, 245,1) 79.30555555555556%); */
    font-size:15px;

    background-color: #E9EBEE;
    width: 110%;
    /* padding:5px; */
    font-family: Robotolight;
    font-size: 12px;
    text-align: center;
    color: #4d4d4d;
    border-radius: 5px;
}
.bill-text {
    font-family: Roboto;
    text-align: justify;
    color: #4d4d4d;
}

</style>
<template>
    
    <v-container class="flex-container-card" :class="card_back" style="position:relative;height:13em;;margin-bottom:5%">
        <v-row style="position:relative;height:13em;padding:0px">
            <v-col class="text-center align-center" cols="4" sm="4" md="4" style="position:relative;width:100%;height:100%;margin:0;">
                <div :class="poke_ring" style="position:relative;margin-top:2%;height:95%;width:95%;">
                    <div style="position:relative;" class="poke_img-pikachu" >
                        <div style="position:relative;" class="poke_img-pikachu_2" :style="btnStyles"></div>
                    </div>
                </div>
            </v-col> 

            <v-col cols="4" sm="4" md="4" align="center" justify="center" style="position:relative;height:80%;">
                <h1 class="name" style="padding:0px;letter-spacing:2px;"> {{ getName(poke.id) }}</h1>
                <p class="airdrop text-center" style="margin:0px;font-size:14px;font-family: Robotoit;">Avail. {{ remaining_supply }} / {{ cap }}</p>
                <div style="position:relative; margin-right:5%; margin-top:15%;">
                    <v-row style="font-size:0.8em;position:relative;width=100%;" justify="end" align="center">
                        <v-col cols="8" md="8" sm="6" justify="start" align="start">
                            <span style="font-weight:500;font-family:Roboto">Max. Supply:</span>
                        </v-col>
                        <v-col cols="4" md="4" sm="6" justify="center"  align="end">
                            <span>{{max_supply}}</span>
                        </v-col>
                    </v-row>
                    <v-row style="font-size:0.8em;position:relative;width=100%;margin-top:0;">
                        <v-col cols="8" md="8" sm="8" justify="start" align="start">
                            <span style="font-weight:500;font-family:Roboto;">Price (MATIC):</span>
                        </v-col>
                        <v-col cols="4" md="4" sm="4" justify="center" align="end">
                            <span>{{unit_price_eth}}</span>
                        </v-col>
                    </v-row>
                </div>
            </v-col> 
    
         <v-col cols="4" sm="4" md="" style="margin-right:2%;" class="text-center align-center">
            <h3 class="trade_close" style="color:#424242;">Closes in :</h3>
            <h3 class="close_time">{{ time_left }}</h3>

            <v-row class="quantity" style="margin-top:10%">
                <v-col cols="1"  style="padding:0">
                </v-col>
                <v-col cols="2" class=""  style="padding:0">
                    <input type="button" v-on:click="buy_amount == 0? 0 : buy_amount= parseInt(buy_amount)-1" value="-" class="minus btn">
                </v-col>
                <v-col cols="4" offset-md="1" style="padding:0">
                    <input type="number" step="1" min="1" max="" name="quantity" v-model="buy_amount" title="Qty" class="input-text qty text" size="20" pattern="" inputmode="">
                </v-col>
                <v-col cols="2" offset-md="1" style="padding:0">
                    <input type="button" v-on:click=" buy_amount= parseInt(buy_amount)+1" value="+" class="plus btn">
                </v-col>
                <v-col cols="1" class=""  style="padding:0">
                </v-col>
            </v-row>

            <p style="margin-top:10%;margin-bottom:0;">{{amount_price}} MATIC</p>

            <v-col cols="12" sm="12" class="" style="padding:0;margin-top:5%;">
                <v-btn v-on:click="buyPokemon" rounded width="75%" style="color:white;background-color: #424242 !important;">Catch!</v-btn> 
            </v-col>
        </v-col>

        </v-row>
    </v-container>

</template>

<script>
import VuetifyLogo from '../components/VuetifyLogo.vue';
import PokeType from '../bd/type.json';
import PokeList from '../bd/poke-dex.json'


import Contract from 'web3-eth-contract';
import Web3Utils from 'web3-utils';
import detectEthereumProvider from '@metamask/detect-provider';


const BN = Web3Utils.BN;
const EtherUnit = Web3Utils.toWei('1');
const PKBSupply = Web3Utils.toWei('4537500');

export default {
    name: 'app-poke-card',
    components: {  VuetifyLogo },
    props : ["poke"],
    data() {
        return {
            card_back : 'card-grass',
            poke_image : require('@/assets/img/moved_colored_icons/1_bulbasaur.png'),
            poke_ring : 'img_frame-thunder',
            buy_amount: 1,
            time_left: 0,
            circulating_supply: 0,
            remaining_supply: 0,
            cap: this.poke.cumulative_cap || '',
            _interval: undefined,
            unit_price_eth: '0',
            max_supply: '0',
            amount_price: '0'
        }
    },
    computed: {
        btnStyles() {
            return {
                "background-image": "url("+this.poke_image + ")" ,
            };
        }
    },
    watch: {
        buy_amount: function() {
            this.calculateETHValue(this.buy_amount)
                .then(value => Web3Utils.fromWei(value))
                .then(value_eth => this.amount_price = value_eth.slice(0, value_eth.indexOf('.')+8))
        }
    },
    methods: {    
        getName(id)
        {
            return PokeList[id-1].name;
        },
        getPokeImg : function()
        {
            let classes =  this.designByType(this.poke.id);
            this.card_back = classes.card_back;
            this.poke_image = classes.poke_image;
            this.poke_ring = classes.poke_ring;
            return this.poke_image;
        },
        designByType : function(id)
        {
           let type =  PokeType[id];
           let pokeItem = PokeList.find(x => x.id == id);

            //console.log('Type  id ', id , ' and type ', type );
            //console.log('Poke Item ', pokeItem.img_colored );
            this.poke_image = require('@/assets/img/moved_colored_icons/' + pokeItem.img_colored);

           if(type == 'grass'){
                return {
                    card_back : 'card-grass',
                    poke_ring  : 'img_frame-grass',
                    poke_image : require('@/assets/img/moved_colored_icons/' + pokeItem.img_colored)
                }
           } else if(type == 'fire'){
                return {
                    card_back : 'card-fire',
                    poke_ring  : 'img_frame-fire',
                    poke_image : require('@/assets/img/moved_colored_icons/' + pokeItem.img_colored)
                }
           }else if(type == 'earth'){
                return {
                    card_back : 'card-earth',
                    poke_ring  : 'img_frame-earth',
                    poke_image : require('@/assets/img/moved_colored_icons/' + pokeItem.img_colored)
                }
           }else if(type == 'psy'){
                return {
                    card_back : 'card-psy',
                    poke_ring  : 'img_frame-psy',
                    poke_image : require('@/assets/img/moved_colored_icons/' + pokeItem.img_colored)
                }
           }else if(type == 'normal'){
                return {
                    card_back : 'card-norm',
                    poke_ring  : 'img_frame-norm',
                    poke_image : require('@/assets/img/moved_colored_icons/' + pokeItem.img_colored)
                }
           }else if(type == 'water'){
                return {
                    card_back : 'card-water',
                    poke_ring  : 'img_frame-water',
                    poke_image : require('@/assets/img/moved_colored_icons/' + pokeItem.img_colored)
                }
           }else if(type == 'thunder'){
                return {
                    card_back : 'card-thunder',
                    poke_ring  : 'img_frame-thunder',
                    poke_image : require('@/assets/img/moved_colored_icons/' + pokeItem.img_colored)
                }
           }else{
               return {
                    card_back : 'card-thunder',
                    poke_ring  : 'img_frame-thunder',
                    poke_image : require('@/assets/img/moved_colored_icons/' + pokeItem.img_colored)
                }
           }
           
        },
        calculateRemainingAmount: function() {            
            const ERC1155Crowdsale = new Contract(
                this.$store.state.contracts.erc1155.abi,
                this.$store.state.contracts.erc1155.address
            )
            
            if (window.ethereum)
            {
                ethereum.request({
                    method: 'eth_call',
                    params: [{
                        to: this.$store.state.contracts.erc1155.address,
                        data: ERC1155Crowdsale.methods.totalSupply(this.poke.id).encodeABI()
                    }]
                })
                .then(result => { this.remaining_supply = this.poke.cumulative_cap - parseInt(result) })
            }
          

        },
        calculateETHValue: function(amount) {
            const _this = this

            if(this.max_supply == '0') {
                const ERC1155Crowdsale = new Contract(
                    this.$store.state.contracts.erc1155.abi,
                    this.$store.state.contracts.erc1155.address
                )

                console.log("ERC1155 address ", this.$store.state.contracts.erc1155.address );

                return ethereum.request({
                    method: 'eth_call',
                    params: [{
                        to: this.$store.state.contracts.erc1155.address,
                        data: ERC1155Crowdsale.methods.maxSupply(this.poke.id).encodeABI()
                    }]
                })
                .then(result => (new BN(PKBSupply)).div((new BN(Web3Utils.hexToNumberString(result)))))
                .then(rate => (new BN(parseInt(amount))).mul(rate))
                .then(price => (new BN(_this.$store.state.pkb.crowdsale_rate)).mul(price).div(new BN(EtherUnit)))
            }
            else {
                return Promise.resolve(_this.max_supply)
                    .then(result => (new BN(PKBSupply)).div((new BN(result))))
                    .then(rate => (new BN(parseInt(amount))).mul(rate))
                    .then(price => (new BN(_this.$store.state.pkb.crowdsale_rate)).mul(price).div(new BN(EtherUnit)))
            }
        },
        buyPokemon: function() {
            if(!this.$store.state.account.address) return
            
            const ERC1155Crowdsale = new Contract(
                this.$store.state.contracts.erc1155.abi,
                this.$store.state.contracts.erc1155.address
            )

            ethereum.request({
                method: 'eth_call',
                params: [{
                    to: this.$store.state.contracts.erc1155.address,
                    data: ERC1155Crowdsale.methods.maxSupply(this.poke.id).encodeABI()
                }]
            })
            .then(result => (new BN(PKBSupply)).div((new BN(Web3Utils.hexToNumberString(result)))) )
            .then(rate => (new BN(parseInt(this.buy_amount))).mul(rate))
            .then(price => (new BN(this.$store.state.pkb.crowdsale_rate)).mul(price).div(new BN(EtherUnit)))
            .then(value => ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: this.$store.state.account.address,
                    to: this.$store.state.contracts.erc1155.address,
                    value: Web3Utils.numberToHex(value.toString()),
                    data: ERC1155Crowdsale.methods.mintCrowdsale(this.poke.id, this.buy_amount).encodeABI()
                }]
            }))
            .then(() => this.calculateRemainingAmount())
        }
    },
    mounted () {
        const _this = this;
        _this._interval = setInterval(function() {
            var distance = _this.poke.end_date - Math.floor((Date.now() / 1000))
            var days = Math.floor(distance / 86400);
            var hours = Math.floor((distance % 86400) / 3600);
            var minutes = Math.floor((distance % 3600) / 60);
            var seconds = Math.floor((distance % 60));

            _this.time_left = `${days} ${days == 1? 'day':'days'} ` +
                `${hours < 10? '0'+hours:hours}:` +
                `${minutes < 10? '0'+minutes:minutes}:` +
                `${seconds < 10? '0'+seconds:seconds}`

            if(distance <= 0) _this.$emit('self-destruct');
        }, 1000);

        // Calculate token price in ETH
        const ERC1155Crowdsale = new Contract(
            this.$store.state.contracts.erc1155.abi,
            this.$store.state.contracts.erc1155.address
        )

        if( window.ethereum ) {
            ethereum.request({
                method: 'eth_call',
                params: [{
                    to: this.$store.state.contracts.erc1155.address,
                    data: ERC1155Crowdsale.methods.maxSupply(this.poke.id).encodeABI()
                }]
            })
            .then(result => _this.max_supply = Web3Utils.hexToNumberString(result))
            .then(() => _this.calculateETHValue(1))
            .then(value => Web3Utils.fromWei(value))
            .then(value_eth => {
                
                _this.unit_price_eth = value_eth.slice(0, value_eth.indexOf('.')+8)
                _this.amount_price = value_eth.slice(0, value_eth.indexOf('.')+8)
                
                _this.buy_amount =  Math.round(1.2  / _this.amount_price) > 0 ?   Math.round(1.2  / _this.amount_price) : 1;
            })
        }
      

        this.calculateRemainingAmount();
        this.getPokeImg();
    },
    beforeDestroy() {
        clearInterval(this._interval)
	}
}
</script>


<style>



::-webkit-scrollbar {
    display: none;
}

.close_time{
    align-content: center;
    vertical-align: middle;
    text-align: center;
    margin-top:0px;
    font-size: 1em; 
    color: #424242;;
    font-family: Robotobold;
}


.text-box{
    position: relative;
    width:100%;
    height:70%;
    text-align:center;
}


.btn{
    width: 75%;
    text-transform: uppercase;
    text-decoration: none;
    font-family: Roboto;
    color: white;
    border-radius: 20px;
    transition: all .2s;
    position: relative;
    background-color: #424242;
}

.btn:link,
.btn:visited
.button {
    align-content: center;
    vertical-align: middle;
    text-align: center;
    margin-left:-1.5%;
    height:35px;
    width:10%;
    text-transform: uppercase;
    text-decoration: none;
    font-family: Roboto;
    color:white;
    padding-left:1%;
    padding-right:1%;
    padding-bottom:1%;
    padding-top:1%;
    border-radius:20px;
    transition: all .2s;
    position: relative;
    background-color: #424242 !important;
}
.catch_btn_1 {
    height: 100%;
    text-transform: uppercase;
    text-decoration: none;
    font-family: Roboto;
    color:white;
    border-radius:20px;
    transition: all .2s;
    position: relative;
    background-color: #424242 !important;
    border: none;
    outline: none;
}


.catch_btn {
    margin-top:-3px;
    vertical-align: middle;
    font-size: 11px;
    font-family: Roboto;
    color:white  !important;
}


.btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn:active {
     border: none;
    outline: none;
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.btn-white {
    background-color: #fff;
    color: #777;
}

.btn::after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 100%;
    border-radius: 100px;
    /* position: relative; */
    top: 0;
    left: 0;
    z-index: -1;
    transition: all .4s;
     /* border: none;
    outline: none; */
}

.btn-white::after {
    background-color:#424242 ;
    opacity: 20%;
}

.btn:hover::after {
    /* transform: scaleX(1.2) scaleY(1.1); */
    opacity: 20%;
}

.btn-animate {
    animation: moveInBottom 5s ease-out;
    animation-fill-mode: backwards;
}


.price_value{
    padding:0;
    width:60%;
    margin-left:-1%;
    margin-right:2%;
    margin-bottom: 8px;
    font-size:15px;
    font-family: Roboto;
    color:#4d4d4d;
}


.quantity {
 position: relative;
 margin-bottom:0;   
 font-family: Roboto;
}

.quantity .input-text.qty {
 width: 100%;
 padding-bottom:0;    
 text-align: center;
 background-color: transparent;
 border: transparent;
 font-size: 16px;
 font-family: Roboto;
 color:#4d4d4d;    
}

.quantity.buttons_added {    
 text-align: left;
 position: relative;
 white-space: nowrap;
 vertical-align: top;  
}

.quantity.buttons_added input {
 display: inline-block;
 margin: 0;
 vertical-align:middle;
 box-shadow: none;
 border-radius:40%;  
}

.quantity.buttons_added .minus,
.quantity.buttons_added .plus {
 background-color: #424242;
 color:white;   
 cursor:pointer;
}

.quantity.buttons_added .minus {
 border-right: 0; 
}

.quantity.buttons_added .plus {
 border-left: 0; 
}


.quantity.buttons_added .minus:active
.quantity.buttons_added .plus:active{
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
.quantity input::-webkit-outer-spin-button,
.quantity input::-webkit-inner-spin-button {
 -webkit-appearance: none;
 -moz-appearance: none;
 margin: 0; 
}
 
.quantity.buttons_added .minus:focus,
.quantity.buttons_added .plus:focus {
 outline: none;
}


p.airdrop{
    margin-top: 0px;
    margin-bottom: 0px;
    width:100%;
    font-family: RobotoIt !important;
    color:#4d4d4d;
}


p.tk_name{
    vertical-align:inherit;
    display:inline;
}
.poke_name{
    padding:0;
    width:150%;
    height:30%;
    margin-bottom:5%;
    
}

.poke_name,
 h1{
     padding-bottom:1%;
     margin:0;
}

.poke_name p{
    margin:0;
    padding-top:1%;
    padding-bottom: 1%;
    
}
h1.name{
    font-size:35px;
    font-family: PokemonHollow  !important;
    color:#4d4d4d;
}

p.tk_name{
    font-size:15px;
    font-family: Roboto;
    color:#4d4d4d;
}

p.airdrop{
    margin-top:2%;
    margin-left:20%;
    width:100%;
    font-family: Robotoit;
    color:#4d4d4d;
}

.trade_table{
    position: relative;
    height:80%;
    width:100%; 
    border:0;
}

.data_topics{
    padding-right:0;
    padding-top:6%;
    padding-bottom:1.5%;
    margin:0;
    font-size:13px;
    color:#4d4d4d;
    font-family: Robotolight !important
}


.data_points{
    width:50%;
    padding-left:0;
    padding-left:10%;
    padding-top:1.5%;
    padding-bottom:1.5%;
    margin:0;
    font-family: Roboto;
    font-size:14px;
    color:#4d4d4d;
}


.trade_info {
    height: 47%;
    width: 100%;
    margin-top: 5%;
    margin-left: 3%;
    font-family: Roboto;
}

.poke_img-pikachu{
    position:relative;
    background: white;
    height:90%;
    width:90%;
    background-size: 100% 100%   ;
    border-radius: 100%;
    background-repeat: no-repeat;
}

.poke_img-pikachu_2 {
    position: absolute;
    height:100%;
    width:100%;
    background-size: 100% 100%   ;
    background-repeat: no-repeat;
}

.trade_left {
    float:left;
    margin-right:2%;
}


.img_frame-thunder{
    display: flex;
    align-items: center;
    margin-left:2%;
    justify-content: center;
    margin-top: 9%;
    margin-bottom:13%;
    height: 80%;
    width: 80%;
    /* background-image: url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6a466c46-7fdb-4916-ab6b-fd59bfa64d55/d4nn7fc-943dbad3-12e4-4735-ab9a-31924b0b0b9c.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNmE0NjZjNDYtN2ZkYi00OTE2LWFiNmItZmQ1OWJmYTY0ZDU1XC9kNG5uN2ZjLTk0M2RiYWQzLTEyZTQtNDczNS1hYjlhLTMxOTI0YjBiMGI5Yy5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.5FF9xCYmIClo3li8BOszxdivnvApSrjUEoK-2e_83JA);  */
    background-image: url('~/assets/img/thunder.png');
    background-size: 102% 105% ;
    border-radius: 90%;     
}

.img_frame-grass{
    display: flex;
    align-items: center;
    margin-left:2%;
    justify-content: center;
    margin-top: 9%;
    margin-bottom:13%;
    height: 80%;
    width: 80%;
    /* background-image: url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6a466c46-7fdb-4916-ab6b-fd59bfa64d55/d4nn7fc-943dbad3-12e4-4735-ab9a-31924b0b0b9c.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNmE0NjZjNDYtN2ZkYi00OTE2LWFiNmItZmQ1OWJmYTY0ZDU1XC9kNG5uN2ZjLTk0M2RiYWQzLTEyZTQtNDczNS1hYjlhLTMxOTI0YjBiMGI5Yy5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.5FF9xCYmIClo3li8BOszxdivnvApSrjUEoK-2e_83JA);  */
    background-image: url('~/assets/img/grass-back.jpeg');
    background-size: 102% 105% ;
    border-radius: 90%;     
}
.img_frame-water{
    display: flex;
    align-items: center;
    margin-left:2%;
    justify-content: center;
    margin-top: 9%;
    margin-bottom:13%;
    height: 80%;
    width: 80%;
    /* background-image: url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6a466c46-7fdb-4916-ab6b-fd59bfa64d55/d4nn7fc-943dbad3-12e4-4735-ab9a-31924b0b0b9c.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNmE0NjZjNDYtN2ZkYi00OTE2LWFiNmItZmQ1OWJmYTY0ZDU1XC9kNG5uN2ZjLTk0M2RiYWQzLTEyZTQtNDczNS1hYjlhLTMxOTI0YjBiMGI5Yy5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.5FF9xCYmIClo3li8BOszxdivnvApSrjUEoK-2e_83JA);  */
    background-image: url('~/assets/img/water-back.jpeg');
    background-size: 102% 105% ;
    border-radius: 90%;     
}

.img_frame-earth{
    display: flex;
    align-items: center;
    margin-left:2%;
    justify-content: center;
    margin-top: 9%;
    margin-bottom:13%;
    height: 80%;
    width: 80%;
    /* background-image: url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6a466c46-7fdb-4916-ab6b-fd59bfa64d55/d4nn7fc-943dbad3-12e4-4735-ab9a-31924b0b0b9c.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNmE0NjZjNDYtN2ZkYi00OTE2LWFiNmItZmQ1OWJmYTY0ZDU1XC9kNG5uN2ZjLTk0M2RiYWQzLTEyZTQtNDczNS1hYjlhLTMxOTI0YjBiMGI5Yy5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.5FF9xCYmIClo3li8BOszxdivnvApSrjUEoK-2e_83JA);  */
    background-image: url('~/assets/img/earth-back.jpeg');
    background-size: 102% 105% ;
    border-radius: 90%;     
}
.img_frame-norm{
    display: flex;
    align-items: center;
    margin-left:2%;
    justify-content: center;
    margin-top: 9%;
    margin-bottom:13%;
    height: 80%;
    width: 80%;
    /* background-image: url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6a466c46-7fdb-4916-ab6b-fd59bfa64d55/d4nn7fc-943dbad3-12e4-4735-ab9a-31924b0b0b9c.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNmE0NjZjNDYtN2ZkYi00OTE2LWFiNmItZmQ1OWJmYTY0ZDU1XC9kNG5uN2ZjLTk0M2RiYWQzLTEyZTQtNDczNS1hYjlhLTMxOTI0YjBiMGI5Yy5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.5FF9xCYmIClo3li8BOszxdivnvApSrjUEoK-2e_83JA);  */
    background-image: url('~/assets/img/norm-back.jpg');
    background-size: 102% 105% ;
    border-radius: 90%;     
}
.img_frame-fire{
    display: flex;
    align-items: center;
    margin-left:2%;
    justify-content: center;
    margin-top: 9%;
    margin-bottom:13%;
    height: 80%;
    width: 80%;
    /* background-image: url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6a466c46-7fdb-4916-ab6b-fd59bfa64d55/d4nn7fc-943dbad3-12e4-4735-ab9a-31924b0b0b9c.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNmE0NjZjNDYtN2ZkYi00OTE2LWFiNmItZmQ1OWJmYTY0ZDU1XC9kNG5uN2ZjLTk0M2RiYWQzLTEyZTQtNDczNS1hYjlhLTMxOTI0YjBiMGI5Yy5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.5FF9xCYmIClo3li8BOszxdivnvApSrjUEoK-2e_83JA);  */
    background-image: url('~/assets/img/fire-back.jpeg');
    background-size: 102% 105% ;
    border-radius: 90%;     
}
.img_frame-psy{
    display: flex;
    align-items: center;
    margin-left:2%;
    justify-content: center;
    margin-top: 9%;
    margin-bottom:13%;
    height: 80%;
    width: 80%;
    /* background-image: url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6a466c46-7fdb-4916-ab6b-fd59bfa64d55/d4nn7fc-943dbad3-12e4-4735-ab9a-31924b0b0b9c.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNmE0NjZjNDYtN2ZkYi00OTE2LWFiNmItZmQ1OWJmYTY0ZDU1XC9kNG5uN2ZjLTk0M2RiYWQzLTEyZTQtNDczNS1hYjlhLTMxOTI0YjBiMGI5Yy5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.5FF9xCYmIClo3li8BOszxdivnvApSrjUEoK-2e_83JA);  */
    background-image: url('~/assets/img/pys2-back.jpeg');
    background-size: 102% 105% ;
    border-radius: 90%;     
}

.card-psy{
    background-image: radial-gradient(circle, #9a9ce7, #a9a4e5, #b7ace4, #c2b5e3, #ccbee2, #cec1e3, #cfc4e5, #d1c7e6, #cac5e9, #c3c3ec, #b9c1ef, #aec0f2);
}
.card-fire{
    background-image: linear-gradient(to right top, #a1411c, #b56326, #c78535, #d7a749, #e4c963, #e9d168, #edd86e, #f2e073, #f1ce62, #f0bc53, #eea946, #eb963d);
}
.card-norm{
    background-image: linear-gradient(to right bottom, #c0babc, #c8c2c3, #cfc9ca, #d7d1d2, #ded9d9, #dcd7d7, #dad5d5, #d8d3d3, #ccc7c7, #c0bbbc, #b5b0b1, #a9a4a6);
}
.card-earth {
    background-image: radial-gradient(circle, #cc8d4f, #d09555, #d49d5c, #d8a563, #dcad6a, #d9ab69, #d6aa69, #d3a868, #c89c5f, #be9057, #b3844f, #a87947);
}
.card-water {
    background-image: linear-gradient(to left top, #67b2b2, #76bbb7, #85c4bd, #94ccc3, #a3d5c9, #a6d8cd, #a8dcd1, #abdfd5, #a2ddd8, #9adcdc, #93d9e0, #8dd7e5);
}
.card-thunder  {
    background: linear-gradient(119.9472198772661deg, rgba(247, 247, 104,1) 34.781394675925924%,rgba(242, 231, 27,1) 52.48133680555556%,rgba(247, 247, 104,1) 79.9558738425926%);
}
.card-grass {
    background-image: linear-gradient(to left top, #418027, #4c8d31, #579b3c, #62a846, #6db651, #7ec05b, #8fcb65, #a0d56f, #b8de7c, #cfe88a, #e5f19a, #f9fbab);
}

.flex-container-card {
  /* We first create a flex layout context */
    display: flex;
    flex-flow: row wrap;
    /* Then we define how is distributed the remaining space */
    justify-content: space-around;
    
    padding: 0;
    margin-top:0;
    margin-left:2%;
    margin-right:2%;
    height: 20%;
    width: 95%;
    border-radius: 30px;
    padding: 1%;
    display: flex;
    border: 4px solid #424242;
    margin-bottom: 10%;
}

</style>


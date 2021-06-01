<template>
<div>
<div class="bg-image blur-image"></div>
<v-container class="over-bkg mt-5">
  	<v-row style="position:relative;margin:0;margin-top:5%;width:100%;height:48vh;">
			<v-col cols="12" sm="12" md="12" align="center" style="margin:0;padding:0;width:80%;" >
				<div style="position:relative;" class="trading-container trading-zone">
					<h3 style="padding-top:5%;color:#424242;font-size:1em;">PKBL Available:  <a target="_blank" style="color: inherit;"  href="https://explorer-mainnet.maticvigil.com/address/0x1b160E0fDcb331D1c0aFCe82E46508e656595802/transactions" > {{available_pkb}} </a> </h3>				
					<v-row style="position:relative;height:22%;margin-top:4%" class="flex-container-market">
						<v-col cols="12" sm="12" md="12" class="trading-zone">
							<v-row>
								<v-col cols="4" sm="4" md="4" align="start" justify="start">
									<h2 class="from-h">From</h2>
								</v-col>
								<v-col cols="2" sm="2" md="2" offset="3" align="start" justify="start">
									<h2 class="from-h">Balance:</h2>
								</v-col>
								<v-col cols="3" sm="3" md="3" align="end" justify="start">
									<p class="from-h">{{ account_balance }}</p>
								</v-col>
							</v-row>

							<v-row>
								<v-col cols="6" sm="6" md="6" style="width:100;">
									<input class="input-val" @change="updateBuyAmount" v-model="buy_amount" inputmode="decimal"  title="Token Amount" type="number" placeholder="0.0" minlength="1" maxlength="55" value />
								</v-col>

								<v-col cols="2" sm="2" md="2"  class="max-zone">
									<button v-on:click="setMaxBuyAmount" class="max">MAX</button>
								</v-col>

								<v-col cols="2" sm="2" md="2" align="end" justify="center" style="padding-right:0">
									<div style="" class="coin-img-zone"></div>
								</v-col>

								<v-col cols="2" sm="2" md="2" align="center" justify="center">
									<span class="eth" style="font-size:0.9em;">MATIC</span>
								</v-col>

							</v-row>

						</v-col>
					</v-row>

				
					<v-row style="position:relative;font-family:Roboto;color:#424242;height:5%;margin-top:4%;" class="flex-container-noborder">
						<v-col cols="12" md="12" sm="12" align="center" justify="center">
							<h5> 1 PKBL = {{ pkb_price }} MATIC </h5>
						</v-col>
					</v-row>

					<v-row style="position:relative;height:22%;margin-top:6%;" class="flex-container-market">
						<v-col cols="12" sm="12" md="12" class="trading-zone">
							<v-row>
								<v-col cols="4" sm="4" md="4" align="start" justify="start">
									<h2 class="from-h">To</h2>
								</v-col>
								<v-col cols="2" sm="2" md="2" offset="3" align="start" justify="start">
									<h2 class="from-h">Balance:</h2>
								</v-col>
								<v-col cols="3" sm="3" md="3" align="end" justify="start">
									<p class="from-h">{{ account_pkb_balance }}</p>
								</v-col>
							</v-row>

							<v-row>
								<v-col cols="6" sm="6" md="6">
									<input class="input-val" @change="updateBuyValue" v-model="pkb_buy_amount" inputmode="decimal"  title="Token Amount" type="text" placeholder="0.0" minlength="1" maxlength="50" value />
								</v-col>

								<v-col cols="2" sm="2" md="2" offset="2" align="end" justify="center" style="padding-right:0">
									<div style="" class="coin-img-poke"></div>
								</v-col>

								<v-col cols="2" sm="2" md="2" align="center" justify="center">
									<span class="eth" style="font-size:1em;">PKBL</span>
								</v-col>

							</v-row>
						</v-col>
					</v-row>

					<v-row style="position:relative;margin-top:15%;height:15%;background-color:transparent;border:0;" justify="center" align="center" class="btn_buy flex-container-market">
						<v-btn id="swap-button" v-on:click="buy">{{ buyButton }}</v-btn>		
					</v-row>
				</div>
			</v-col>
  	</v-row>

  	<v-row style="margin-top:4%;">
		<v-col cols="12" sm="12" md="12" align="center" style="margin:0;padding:0;width:80%;">
			<div style="width:35%;">
				<v-row style="position:relative;margin-top:2.5%;" class="caps-txt">
					<v-col cols="6" sm="6" md="6" align="start"  style="position:relative;margin:0;padding:0;">
						<span><b class="crwd-item-pokename" style="letter-spacing:1px;">Circulating supply: </b></span>
					</v-col>
					<v-col cols="6" sm="6" md="6" align="end" style="position:relative;margin:0;padding:0;">
						<span class="crwd-item-pokename"><a style="color:inherit;font-family:inherit;font-size:inherit;text-shadow: 3px 3px #386ab8;-webkit-text-stroke: 1px #386ab8;letter-spacing:2px;" target="_blank" class="crwd-item-pokename" href="https://explorer-mainnet.maticvigil.com/tokens/0x1b160E0fDcb331D1c0aFCe82E46508e656595802/token-transfers"> {{ pkb_total_supply_str }} </a> </span>
					</v-col>
				</v-row>
				<v-row style="position:relative;margin-top:5%; " class="caps-txt"> 
					<v-col cols="6" sm="6" md="6" align="start" style="position:relative;margin:0;padding:0;">
						<span><b class="crwd-item-pokename" style="letter-spacing:1px;">Reserved for NFT sale:</b></span>
					</v-col>
					<v-col cols="6" sm="6" md="6" align="end" style="position:relative;margin:0;padding:0;">
						<span class="crwd-item-pokename">{{formatUsd(reservedNFT)}}</span>
					</v-col>
				</v-row>
				<v-row style="position:relative;margin-top:5%; " class="caps-txt">
					<v-col cols="6" sm="6" md="6" align="start" style="position:relative;margin:0;padding:0;">
						<span><b class="crwd-item-pokename" style="letter-spacing:0px;">Staked on NFT contract:</b></span>
					</v-col>
					<v-col cols="6" sm="6" md="6" align="end" style="position:relative;margin:0;padding:0;">
						<span class="crwd-item-pokename"><a style="color:inherit;font-family:inherit;font-size:inherit;text-shadow: 3px 3px #386ab8;-webkit-text-stroke: 1px #386ab8;letter-spacing:2px;" target="_blank" class="crwd-item-pokename" href="https://explorer-mainnet.maticvigil.com/tokens/0x1b160E0fDcb331D1c0aFCe82E46508e656595802/token-transfers">  {{ pkb_contract_balance_str }} </a> </span>
					</v-col>
				</v-row>
				<v-row style="position:relative;margin-top:5%;" class="caps-txt">
					<v-col cols="6" sm="6" md="6" align="start" style="position:relative;margin:0;padding:0;">
						<span><b class="crwd-item-pokename" style="letter-spacing:1px;">Max supply:</b></span>
					</v-col>
					<v-col cols="6" sm="6" md="6" align="end" style="position:relative;margin:0;padding:0;">
						<span class="crwd-item-pokename" ><a style="color:inherit;font-family:inherit;font-size:inherit;text-shadow: 3px 3px #386ab8;-webkit-text-stroke: 1px #386ab8;letter-spacing:2px;" target="_blank" href="https://explorer-mainnet.maticvigil.com/tokens/0x1b160E0fDcb331D1c0aFCe82E46508e656595802/token-transfers" > {{formatUsd(maxSupply) }} </a> </span>
					</v-col>
				</v-row>
			</div>
		</v-col>
  	</v-row>
	</v-container>
</div>
</template>

<script>
import Web3Utils from 'web3-utils';
import Contract from 'web3-eth-contract';

const BN = Web3Utils.BN;
const EtherUnit = Web3Utils.toWei('1');

export default {
	name: 'app-market',
	components: {  },
	data() {
		return {
			account: {
				address: '',
				balance: '1',
				pkb_balance: '0'
			},
			maxSupply : 353925000 ,
			button_message : "Buy", 
			pkb_contract_balance: '0',
			pkb_total_supply: '0',
			buy_amount : '0',
			pkb_buy_amount: '0',
			reservedNFT : 0,
			_interval: undefined,
			buyButton: window.ethereum? 'Swap' : 'Connect Wallet'
		}
	},
	computed: {
		available_pkb: function() {
			const _result = (new BN('176962500')).mul(new BN(EtherUnit)).sub(new BN(this.pkb_total_supply))
			const _ether = Web3Utils.fromWei(_result, 'ether');
			return  this.formatUsd( _ether.slice(0, _ether.indexOf('.')+7))
		},
		account_pkb_balance: function() {
			const _ether = Web3Utils.fromWei(this.$store.state.account.pkb_balance, 'ether')
			const __ether = _ether.slice(0, 11);
			return __ether.slice(0, __ether.indexOf('.')+7)
		},
		account_address: function() {
			return this.$store.state.account.address
		},
		account_balance: function() {
			const _ether = Web3Utils.fromWei(this.$store.state.account.balance, 'ether')
			const __ether = _ether.slice(0, 11);
			return __ether.slice(0, __ether.indexOf('.')+7)
		},
		pkb_contract_balance_str: function() {
			const _ether = Web3Utils.fromWei(this.pkb_contract_balance, 'ether')
			return this.formatUsd( _ether.slice(0, _ether.indexOf('.')+7) )
		},
		pkb_total_supply_str: function() {
			const _ether = Web3Utils.fromWei(this.pkb_total_supply, 'ether')
			return  this.formatUsd( _ether.slice(0, _ether.indexOf('.')+7))
		},
		pkb_price: function() {
			return Web3Utils.fromWei(this.$store.state.pkb.nominal_rate, 'ether')
		}
	},
	methods: {
		formatUsd : function (val){
            return new Intl.NumberFormat('en-US', { style: 'decimal' }).format(val);
        },
		loadPKBSupplyData: function() {
			const _this = this;

			if (window.ethereum)
            {

				const ERC20Crowdsale = new Contract(
					this.$store.state.contracts.erc20.abi,
					this.$store.state.contracts.erc20.address
				)

				ethereum.request({
					method: 'eth_call',
					params: [{
						to: this.$store.state.contracts.erc20.address,
						data: ERC20Crowdsale.methods.balanceOf(this.$store.state.contracts.erc1155.address).encodeABI()
					}]
				}).then(result => _this.pkb_contract_balance = Web3Utils.hexToNumberString(result))
				ethereum.request({
					method: 'eth_call',
					params: [{
						to: this.$store.state.contracts.erc20.address,
						data: ERC20Crowdsale.methods.totalSupply().encodeABI()
					}]
				}).then(result => 
				{ 
					_this.pkb_total_supply = Web3Utils.hexToNumberString(result) 
					let totalSupplyEther = Web3Utils.fromWei(this.pkb_total_supply, 'ether');
					_this.reservedNFT = (_this.maxSupply - totalSupplyEther) * 0.50;
				})
			}

		},
		setMaxBuyAmount: function() {
			this.buyEstimatePrice().then(() => this.updateBuyAmount())	
		},
		updateBuyValue: function(event) {
			var pkb = Web3Utils.toWei(this.pkb_buy_amount);
			var unit_price = this.$store.state.pkb.nominal_rate;
			var value = (new BN(pkb)).mul(new BN(unit_price)).div(new BN(EtherUnit))
			this.buy_amount = Web3Utils.fromWei(value.toString())
		},
		updateBuyAmount: function(event) {
			var eth = Web3Utils.toWei(this.buy_amount);
			var price = this.$store.state.pkb.nominal_rate;
			var amount = (new BN(eth)).mul(new BN(EtherUnit)).div(new BN(price))
			console.log('Amount %%% ',   Web3Utils.fromWei(amount.toString()));
			this.pkb_buy_amount = Web3Utils.fromWei( amount < 0 ? 0 :  amount.toString())
		},
		buyEstimatePrice: function() {
			const { value, txData } = this._prepareBuyTransaction('1', '1');

			return Promise.all([
				ethereum.request({
					method: 'eth_estimateGas',
					params: [{
						from: this.account_address,
						to: this.$store.state.contracts.erc20.address,
						value: Web3Utils.numberToHex(value.toString()),
						data: txData
					}]
				}),
				ethereum.request({ method: 'eth_gasPrice', params: [] })
			])
			.then(result => (new BN(result[0])).mul(new BN(result[1])))
			.then(tx_cost_wei => (new BN(this.$store.state.account.balance)).sub(tx_cost_wei))
			.then(available_value => this.buy_amount = Web3Utils.fromWei(available_value.toString(), 'ether'))
			.catch(err => { 
				console.log('Error estimate gas : ', err);
				
			})

		},
		buy: function() {
			const { value, txData } = this._prepareBuyTransaction(this.buy_amount, this.pkb_buy_amount);

			if (window.ethereum)
            {		
				ethereum.request({
					method: 'eth_sendTransaction',
					params: [{
						from: this.account_address,
						to: this.$store.state.contracts.erc20.address,
						value: Web3Utils.numberToHex(value.toString()),
						gasLimit: '0x88b8',
						data: txData
					}]
				})
			}
		},
		_prepareBuyTransaction: function(eth_amount, pkb_amount) {
			const ERC20Crowdsale = new Contract(
				this.$store.state.contracts.erc20.abi,
				this.$store.state.contracts.erc20.address
			)

			var eth = Web3Utils.toWei(eth_amount)
			var _amount = Web3Utils.toWei(pkb_amount)
			var price = this.$store.state.pkb.nominal_rate
			var value = (new BN(_amount)).mul(new BN(price)).div(new BN(EtherUnit))
			var amount = Web3Utils.numberToHex(_amount)
			var txData = ERC20Crowdsale.methods.mintNominal(amount).encodeABI()

			return { value, txData }
		},
	},
	mounted() {
		const _this = this;
		_this.loadPKBSupplyData();
		this._interval = setInterval(function() {
			_this.loadPKBSupplyData()
		}, 5000)
	},
	beforeDestroy() {
        clearInterval(this._interval)
	}
}
</script>


<style scoped>


.caps-txt
{
	position: relative;
	font-family: Roboto;
	font-size:14.5px;
}


.btn_buy:hover
{
	cursor: pointer;
	border: 4px 4px solid #424242;
	background-color: #CDCFD2;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
/* input[type=number] {
  -moz-appearance: textfield;
} */

.coin-img-zone{
	position:relative;
	display:inline-block;
	margin: 0;
	width:47%;
	height:100%;
	padding-right:0;
	border-radius:100%;
	background-image:url(~/assets/img/webiste_imgs/mat-logo.png); 
	background-size: 105% 100%;
	background-color:#E9EBEE;
	background-repeat: no-repeat;
}

.coin-img-poke{
	display: inline-block;
	width:47%;
	height:100%;
	padding-right:0;
	border-radius:100%;
	background-image:url(~/assets/img/webiste_imgs/pokeball_256.png); 
	background-size: 100% 100%;
	background-color:#E9EBEE;
	background-repeat: no-repeat;
}

.coin-eth{
	vertical-align: middle;
}

.eth{
	font-family: Roboto;
	color:#424242;
	font-size:20px;
	margin:0;
	font-weight:500;
}

.eth:hover{
	font-family: Roboto;
	color: #424242;
	font-size:20px;
	margin:0;
}

.max-zone{
	height:100%;
	width:100%;
	padding-left:0;
	vertical-align: middle;
	display:block;
}

.max{
	width:100%;
	vertical-align: middle;
	border-radius:8px;
	background-color: #424242;
	color:#E9EBEE;
	border:none;
	font-family:Roboto;
	font-size:17px;
}

.max:hover{
	cursor: pointer;	
}



.flex-container-market {
  /* display: flex; */

  /* flex-flow: row wrap;
  justify-content: space-around; */
  
  padding: 0;
  margin-left:2%;
  margin-right:2%;
  border-radius: 1em;
  border: 1.5px solid #424242;
  /* z-index: 0; */
}

.val-zone{
  margin-top: 5px;
}

.from{
	float:left;
	height:100%;
	width:60%;
	margin-left:6%;
}

.from-h{
	padding:0;
	margin:0;
	font-family:Roboto;
	font-size:14px;
	color:#424242;
}
.input-val{
	padding:0;
	margin:0;
	width:100%;
	margin-top:0%;
	font-family:Roboto;
	font-size:1em;
	color:#424242;
}

.pair-zone-head{
	width:100%;
	height: 20%;
}


.tr-head{
	padding-top:6%;
	vertical-align: middle;
	margin-left:5.3%;
	font-family:Roboto;
	font-size: 20px;
	color:#424242;
}

.trading-pair-zone{
	display: flex;
	flex-flow: row wrap;
	/* Then we define how is distributed the remaining space */
	justify-content: space-around;
	margin-top:5%;
	height:20%;
	width:90%;
	margin-left:5%;
	margin-right:5%;
	border-radius: 20px;
	border: 1px solid #424242;
	
}

.trading-header {
	height: 10%;
	object-fit: contain;
}

.trading-container {
	margin: 0px;
	padding: 0px;
	height: 100%;
	max-width: 35%;
	min-width: 35%;
	border-top: 2px solid #424242;
	border-left: 1px solid #424242;
	border-right: 1px solid #424242;
	border-bottom: 1px solid #424242;

}
.trading-zone{
	width: 100%;
	height: 100%;
	background-color: #E9EBEE;
	border-radius: 1em;
}

.ico-dynamic {
    font-family: Roboto;
	color: #424242;
	font-size: 1em;
	width: 10%;
}

.ico-static {
	width: 35%;
	font-family: Robotobold;
	Font-size: 1em;
	color: #424242;
	font-weight: bold;
}

.ico-row {
	height: 25%;
	border-bottom: 2px solid white;
}

.ico_table {
	position:relative;
	margin-top: 10%;
	margin-left: 22.5%;
	margin-right: 22.5%;
	width: 55%;
	height: 40%;
	display: table;
	border-collapse: collapse;
}
.ico {
  
	width: 90%;
	height: 90%;
	margin-top: 5%;
	margin-bottom: 5%;
	background-color: #E9EBEE;
	border-radius: 43px;
	border: 2px solid #424242;
	box-shadow: 4px 4px 4px #d3d3d3;
}

#swap-button {
	-webkit-transition-duration: 0.4s; /* Safari */
	transition-duration: 0.4s;
	width:100%;
	height:100%;
	font-size:1.5em;
	font-family: Roboto;
	padding:0;
	margin:0;
	border-radius: 0.8em;
	background-color:transparent;
	border: 1.5px solid #424242;
}

</style>

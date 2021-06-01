<template>

  <v-app-bar app color="#424242" class="header">
  <v-dialog hide-overlay max-width="500" content-class="v-dialog"
      v-model="walletConnected"
      transition="dialog-bottom-transition"
      >
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="#424242"
              dark
            >PokeSwap - Connect Metamask</v-toolbar>
            <v-card-text>
              <div class="pa-5">This web-site uses web-3 features in order to get real time data from the blockchain. If you don't have a wallet installed you might not be able to enjoy the full experience</div>
            </v-card-text>
            <v-card-actions class="justify-end">
               <v-btn
                href="https://metamask.io/" target="_blank"
                text
                @click="dialog.value = false"
              >Install Metamask</v-btn>
            </v-card-actions>
          </v-card>
        </template>
  </v-dialog>
    <div class="d-flex align-center">
       <NuxtLink  style="text-decoration: none; color: inherit;" to="/">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-0 ml-md-n4"
          contain
          :src="require('~/assets/PoKeSwAp.png')"
          transition="scale-transition"
          width="170"
        />
       </NuxtLink>
      <NuxtLink  style="text-decoration: none; color: inherit;margin-top:5%" to="/pokeballs">
        <div class="dex-nav ml-5">
          <p>Pokéballs</p>
        </div>
        </NuxtLink>
       <NuxtLink  style="text-decoration: none; color: inherit; margin-top:5%;" class="nav-item" to="/rules">
        <div class="dex-nav  ml-5">
          <p>Rules</p>
        </div>
        </NuxtLink>
    </div>

    <v-spacer></v-spacer>

     <v-spacer> </v-spacer>
         
          <v-toolbar-items class="d-none d-md-flex">
            <v-btn text color="transparent" class="nav-item ">
              <router-link class="dex-nav" to="/pokedex" target="_self"> PokéDex {{this.$store.state.deck_balance.pokeTypes}}/151</router-link>
            </v-btn>
                <div v-if="isConnected" style="margin-top:2%;margin-bottom:2%;" class="add_container">
                    <div class="ether_place" style="padding-left:3%;padding-right:3%;flex-shrink: 0;"> {{balance}} ETH</div>
                    <input disabled class="address"  v-model="reducedWa" value="..." >
                    <div class="wa_ico" style="padding-right:2%;" >
                      <div class="sc-gGBfsJ gLyupU"><div style="border-radius: 50px; overflow: hidden; padding: 0px; margin: 0px; width: 16px; height: 16px; display: inline-block;"><svg height="100" version="1.1" width="100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="overflow: hidden; position: relative;"><desc style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Created with Raphaël 2.3.0</desc><defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></defs><rect x="0" y="0" width="16" height="16" rx="0" ry="0" fill="#2362e1" stroke="none" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></rect><rect x="0" y="0" width="16" height="16" rx="0" ry="0" fill="#1897f2" stroke="none" transform="matrix(0.0423,-0.9991,0.9991,0.0423,-1.1516,16.1943)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></rect><rect x="0" y="0" width="16" height="16" rx="0" ry="0" fill="#c8144a" stroke="none" transform="matrix(0.9999,0.0113,-0.0113,0.9999,4.9636,-6.633)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></rect><rect x="0" y="0" width="16" height="16" rx="0" ry="0" fill="#f94301" stroke="none" transform="matrix(0.7978,0.6029,-0.6029,0.7978,17.6356,1.9986)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></rect></svg></div></div>
                  </div>
                </div>
                <div v-else style="margin-top:3%;margin-bottom:3%;" class="">
                  <input type="button" @click="connectWallet" style="width:150px; " class="address" value="Connect Wallet" >
                </div>
                 
      </v-toolbar-items>

  </v-app-bar> 


  
</template>

<script>

import detectEthereumProvider from '@metamask/detect-provider';
import PokeList from '../bd/poke-dex.json' 
import Web3Utils from "web3-utils";
import Contract from 'web3-eth-contract';
import Web3ABI from 'web3-eth-abi';


// console.log("web3 Utils ",Web3Utils );


export default {

  computed: {
		walletConnected : function()
		{
       return !(typeof window.ethereum !== 'undefined');
    }
  },
  
  methods : {
    isCon : async function (){
      console.log("Is connected method : ", this.currentAccount)
      let retVal = this.currentAccount != '';
      console.log("Return val ", retVal );
      return retVal;
    },
    transformBalance : async function(dataFromChain)
    {
      console.log('***** transformBalance **** ');
      dataFromChain = dataFromChain.slice(2);
      console.log("data from chain ", dataFromChain);
      let chuncksLength = 64;
      let parsedChunks = []
       //
       for(var i = 0; i < 11; i++)
       {
         let startIdx = i * chuncksLength;
         let endIdx = startIdx + chuncksLength;
         parsedChunks[i] = dataFromChain.slice(startIdx, endIdx );
       }
       console.log(" parsed chunks ",  parsedChunks);

    },
    getDeckBalance : async function()
    {

      console.log('*****  get deck balance ******  ');
      const totalIds = 151;
      let addr_list = [];
      this.pokes_id = [];
      const self = this;

      for(var i=1; i < (totalIds + 1) ; i++)
      {
          this.pokes_id.push(i);
          addr_list.push(this.currentAccount);
      }

      console.log(this.pokes_id.length, addr_list.length)

      if(!this.$store.state.account.address) return;

      const ERC1155Crowdsale = new Contract(
            this.$store.state.contracts.erc1155.abi,
            this.$store.state.contracts.erc1155.address
      )

      //console.log("poke id ", [...this.pokes_id] );

      ethereum.request({
            method: 'eth_call',
            params: [{
                to: this.$store.state.contracts.erc1155.address,
                data: ERC1155Crowdsale.methods.balanceOfBatch(addr_list, this.pokes_id).encodeABI()
            }]
      })
      .then(result => 
      { 
        // console.log('1. result of balance Batch ' , result, '  end.' ); 
        let arr_deck = Web3ABI.decodeParameter('uint256[]', result );
        self.$store.commit('deck_balance/setDeckBalance', arr_deck );
        //count how many type of tokens user have
        this.$store.commit('deck_balance/setTotalTypes',  arr_deck.filter(x => parseInt(x) > 0 ).length  );
        // console.log("Convert array : ",  arr_deck  );
      });

    },
    checkConnection : async function(){
      console.log('Connected ', ethereum.isConnected());
      console.log('Metamask is unlocked ',await ethereum._metamask.isUnlocked())
      // console.log("Web3 ", window.web3)
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      const accounts = await ethereum.request({ method: 'eth_accounts' }) //https://docs.metamask.io/guide/getting-started.html#basic-considerations
      const account = accounts[0];

      console.log('Chain id ', chainId)
      console.log('accounts ', account)

      const balance = await ethereum.request({ method: 'eth_getBalance', params : [
        account,
        'latest'
      ] })
  
      let eth = Web3Utils.fromWei(balance, 'ether');//window.web3.utils.fromWei(balance, 'ether');

      console.log('Balance ', eth );

      return ethereum.isConnected();

    },
    getBalance : async function(account)
    {
      const balance = await ethereum.request({ method: 'eth_getBalance', params : [
        account,
        'latest'
      ] })
  
      let eth = Web3Utils.fromWei(balance, 'ether');//window.web3.utils.fromWei(balance, 'ether');
      console.log('Balance ', eth );
      this.balance = Math.round(eth * 1000) / 1000 ;
      this.$store.commit('account/setBalance', Web3Utils.hexToNumberString(balance))
     
    },
    startApp : async function(provider)
    {
      console.log('Star de APP ');
      // If the provider returned by detectEthereumProvider is not the same as
      // window.ethereum, something is overwriting it, perhaps another wallet.
      if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
      }

      // Access the decentralized web!
      console.log(' Is metamask ', ethereum.isMetaMask );
      console.log(' Is connected ', ethereum.isConnected() );

      
      ethereum.on('chainChanged', (chainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        console.log('Account change  [2] ');
        window.location.reload();
      });
      ethereum.on('connect', (info) =>{
        console.log("Metamask connected [3] ", info);
      });
      ethereum.on('disconnect', (cenas) => {
           console.log("Metamask disconnect [4] ", cenas);
      });

      /*
          Get connected account
      */
      ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(this.handleAccountsChanged)
        .catch((error) => {
          if (error.code === 4001) {
            // EIP-1193 userRejectedRequest error
            console.log('Please connect to MetaMask.');
          } else {
            console.error(error);
          }
        });
    },
    handleAccountsChanged : async function (accounts)
    {
      console.log('handleAccountsChanged ');
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log('Please connect to MetaMask.');
      } else if (accounts[0] !== this.currentAccount) {
        // this.$data.currentAccount = accounts[0];
        // Do any other work!
        console.log('Current Account ', accounts[0] );
        await this.getBalance(accounts[0]);
        this.currentAccount = accounts[0];
        this.$store.commit('account/setAddress', accounts[0])
        this.reducedWa =  this.currentAccount.slice(0, 6) + '...' + this.currentAccount.slice(36, 40)
        this.isConnected = true;
        
        // LOAD ACCOUNT PKB BALANCE
        const _this = this;
        const ERC20Crowdsale = new Contract(
          this.$store.state.contracts.erc20.abi,
          this.$store.state.contracts.erc20.address
        )

        this.getDeckBalance();

        ethereum.request({
          method: 'eth_call',
          params: [{
            to: this.$store.state.contracts.erc20.address,
            data: ERC20Crowdsale.methods.balanceOf(this.$store.state.account.address).encodeABI()
          }]
        })
        .then(result => _this.$store.commit('account/setPKBBalance',Web3Utils.hexToNumberString(result)))
      }
    },
    hello : async function()
    {
      return 19;
    },
    connectWallet : async function()
    {
        // console.log('hello ', await this.hello()  );
        this.provider = await detectEthereumProvider();
        if (this.provider) {
          await this.startApp(this.provider); // Initialize your app
        } else {
          console.log('Please install MetaMask!');
        }
    }
  },
  created: function()
  {
    console.log('Created Method');
  },
  mounted: async function () 
  {
    console.log('Mounted Method AppHeader ');

    // const unsubscribe = this.$store.subscribe((mutation, state) => 
    // {
    //     console.log('Subscribe store change ', this.$store );
    // });


    if (typeof window.ethereum !== 'undefined') 
    {
      console.log('MetaMask is installed! Check if connected : ');
      /**
      * If metamask installed and permision is active not need to show connect button
      */
      const accounts = await ethereum.request({ method: 'eth_accounts' }) //https://docs.metamask.io/guide/getting-started.html#basic-considerations
      const account = accounts[0];
      this.handleAccountsChanged(accounts)
      ethereum.on('accountsChanged', (accounts) => {
      // Handle the new accounts, or lack thereof.
      // "accounts" will always be an array, but it can be empty.
        console.log('Account change  [1] ');
        this.handleAccountsChanged(accounts)
      });
  
    }
  },
  data () {
    return {
      pokes_id : [],
      balance : 0,
      isConnected : false,
      provider : '',
      currentAccount : '',
      reducedWa : '...'
    }
  },
  name: 'app-header',
  components: {},
}
</script>
<style lang="scss">

.dex-nav:hover {
        text-shadow:  
        0 0 10px rgba(255,255,255, 1),
        0 0 50px rgba(255, 255, 255, .8),
        0 0 75px rgba(255, 255, 255, .6),
        0 0 76px rgba(255, 255, 255, .4),
        0 0 77px rgba(255, 255, 255, .5),
        0 0 78px rgba(255, 255, 255, .4),
        0 0 79px rgba(255, 255, 255, .3),
        0 0 80px rgba(255, 255, 255, .2),
        0 0 85px rgba(255, 255, 255, .1);
    cursor:pointer;
}

.dex-nav {
    margin-top: 1%;
    color: #E9EBEE !important;
    margin-right: 3%;
    font-family: Roboto;
    font-size: 15 px;
    text-decoration: none;
    color: inherit;
}

.ether_place {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-size: 12px !important;
    padding-left: 0.75rem;
    padding-right: 0.5rem;
    font-weight: 500;
}

.wa_ico {
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0px 0.5rem 0px 0.25rem;
    font-size: 1rem;
    width: fit-content;
    font-weight: 500;
}

.address {
    text-align: center;
    outline: none;
    text-decoration: none;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    font-size: 16px;
    display: flex;
    flex-flow: row nowrap;
    width: 90%;
    -webkit-box-align: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 12px;
    cursor: pointer;
    user-select: none;
    background-color: rgb(247, 248, 250);
    border: 1px solid rgb(237, 238, 242);
    color: rgb(0, 0, 0);
    font-weight: 500;
}

.add_container {
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    background-color: rgb(237, 238, 242);
    border-radius: 12px;
    white-space: nowrap;
    width: 100%;
    cursor: pointer;
}

 .beta_logo{
      border-radius: 3px;
      background-color: #aca921;
      padding: 2px 7px;
      p {
        font-size: 13px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: var(--white);
        margin-bottom: 0;
      }
    }

.dca-verify-web {
  .v-app-bar.header {
    box-shadow: 0 2px 4px 0 rgba(222, 222, 222, 0.5) !important;

    margin: 0;


    .v-toolbar__content {
      // padding-left: 0px;
      // padding-right: 0px;
      margin: 0 auto;
      max-width: 1170px;
    }
    .header-button {
      font-size: 14px;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.71;
      letter-spacing: normal;
      color: var(--charcoal-grey);

      text-decoration: none;
      display: flex;
      padding: 16px;
      &:last-child {
        margin-right: -24px;
      }
      span {
        margin-top: -2px;
      }

      &.router-link-exact-active.router-link-active {
        color: var(--teal-blue);
        svg {
          g {
            fill: var(--teal-blue);
          }
        }
      }
    }
  }
}
</style>

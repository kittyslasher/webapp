<template>
    <div style="height:80vh;" >
        <div>
            <ActivityTable  v-bind:activity="transfers" />
        </div>
    </div>
</template>

<script>
import Web3Utils from 'web3-utils';
import Web3ABI from 'web3-eth-abi';
import PokeDex from '../bd/poke-dex.json';
import ActivityTable from './activity-table.vue'


export default {
    name: 'transfer-activity-table',
    props : [ "wa", "pokes", "number" ],
    components: {ActivityTable},
    data() {
        const headers = [
            { text: 'ID', align: 'start', sortable: false, value: 'id', class : "blue-grey darken-1" },
            { text: 'Pokemon', value: 'type', sortable: false, class : "blue-grey darken-1" },
            { text: 'Amount', value: 'amount', sortable: false,  class : "blue-grey darken-1"},
            { text: 'Trainer', value: 'trainer', sortable: false, class : "blue-grey darken-1" },
            { text: 'Block', value: 'block', sortable: true, class : "blue-grey darken-1"},
        ];
        return {
            table_headers: headers,
            transfers: [],
            _interval: undefined,
            pageNumber: 1
        }
    },
    methods: {
        getTransferActivity: function() {
            console.log('getTransferActivity')
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
            .then(result => this.transfers = result.map(e => {
                const _data = Web3ABI.decodeParameters(['uint256','uint256'], e.data)
                return {
                    id: _data[0],
                    amount: _data[1],
                    trainer: Web3ABI.decodeParameter('address', e.topics[3]),
                    type: PokeDex.filter(pd => pd.id == _data[0])[0].name,
                    block: Web3Utils.hexToNumberString(e.blockNumber)
                }
            }).reverse())
        }
    },
    mounted() {
        // this.getTransferActivity()
        // this._interval = setInterval(this.getTransferActivity, 10000) 
    },
    beforeDestroy() {
        // clearInterval(this._interval)
	}
}
// https://vuetifyjs.com/en/styles/colors/#material-colors
// https://material.io/design/color/the-color-system.html#color-usage-and-palettes
</script>
<style>

 .header {
     color: rgb(172, 46, 46)
 }

</style>

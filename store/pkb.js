import Web3Utils from 'web3-utils';

export const state = () => ({
    crowdsale_rate: Web3Utils.toWei('0.05'),
    nominal_rate: Web3Utils.toWei('0.1'),
})
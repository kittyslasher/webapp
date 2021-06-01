import Web3Utils from 'web3-utils';

export const state = () => ({
    crowdsale_rate: Web3Utils.toWei('0.00025'),
    nominal_rate: Web3Utils.toWei('0.0005'),
})
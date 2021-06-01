import Contract from 'web3-eth-contract';
import { erc20crowdsale, erc1155crowdsale } from '../bd/contracts_metadata.json';

export const state = () => ({
    erc20: {
        address: erc20crowdsale.address,
        abi: erc20crowdsale.abi.abi
    },
    erc1155: {
        address: erc1155crowdsale.address,
        abi: erc1155crowdsale.abi.abi
    },
})
  
export const mutations = {
    getERC20Contract(state) {
        return state.erc20.contract
    },
    getERC1155Contract(state) {
        return state.erc1155.contract
    },
    getERC20Metadata(state) {
        return {
            address: state.erc20.address,
            abi: state.erc20.abi
        }
    },
    getERC1155Metadata(state) {
        return {
            address: state.erc1155.address,
            abi: state.erc1155.abi
        }
    }
}
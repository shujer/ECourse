import Web3 from 'web3'
import {store} from '../store/'

let web3 = window.web3;
web3 = new Web3(web3.currentProvider);
web3.currentProvider.publicConfigStore.on('update', ({selectedAddress, networkVersion}) => {
  store.dispatch('pollWeb3', {
    coinbase: selectedAddress
  })
});


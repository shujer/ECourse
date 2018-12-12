import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../util/getWeb3'
import pollWeb3 from '../util/pollWeb3'
import getContract from '../util/getContract'
import {accessKey, secretKey} from '../util/config/qiniu'
const qiniu = require('qiniu');

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  state,
  mutations: {
  	registerWeb3Instance(state, payload) {
      console.log('commited result to registerWeb3Instance mutation');
  	  let result = payload;
  	  let web3Copy = state.web3;
  	  web3Copy.coinbase = result.coinbase;
  	  web3Copy.networkId = result.networkId;
  	  web3Copy.isInjected = result.injectedWeb3;
  	  web3Copy.web3Instance = result.web3;
  	  state.web3 = web3Copy;
  	},
  	pollWeb3Instance (state, payload) {
  		console.log('commited result to pollWeb3Instance mutation, coinbase: ' + payload.coinbase);
  		state.web3.coinbase = payload.coinbase;
  	},
    registerContractInstance (state, payload) {
      console.log('Casino contract instance: ', payload);
      state.contractInstance = () => payload
    },
    setLoginState(state, payload) {
  	  state.authUser.loginState = payload;
    },
    setRegisterState(state, payload) {
      state.authUser.registerState = payload;
    },
    setUserAccount(state, payload) {
      state.authUser.account = payload;
    }
  },
  actions: {
  	registerWeb3({commit}) {
  	  getWeb3.then(result => {
  	  	commit('registerWeb3Instance', result)
  	  })
  	  .catch(err => {
  	  	console.log('error in action registerWeb3', err)
  	  })
  	},
    pollWeb3 ({commit}, payload) {
      commit('pollWeb3Instance', payload)
    },
    getContractInstance ({commit}) {
      getContract.then(result => {
        commit('registerContractInstance', result)
      }).catch(e => console.log(e))
    },
    getUploadToken() {
      const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
      const options = {
        scope: 'sysu-geokg',
      };
      const putPolicy = new qiniu.rs.PutPolicy(options);
      return putPolicy.uploadToken(mac);
    },
    checkLoginState({commit, state}) {
  	  try {
        state.contractInstance().methods.isMemberOf().call({from: state.web3.coinbase})
          .then(result => {
            return new Promise((resolve, reject) => {
              resolve(result);
            })
          })
          .then(result => {
            if(result === true) {
              state.contractInstance().methods.getMemberInfo().call({from: state.web3.coinbase})
                .then(result => {
                  commit('setLoginState', true);
                  commit('setRegisterState', true);
                  commit('setUserAccount', result);
                })
                .catch(err => {
                  commit('setLoginState', false);
                  commit('setRegisterState', false);
                  commit('setUserAccount', {name: '', avatar: '', balance: 0});
                })
            } else {
              commit('setLoginState', false);
              commit('setRegisterState', false);
              commit('setUserAccount', {name: '', avatar: '', balance: 0});
            }
          })
          .catch(e => {
            console.log(e);
          })
      } catch (e) {
        console.log(e);
      }
    },
  }
});

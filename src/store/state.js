let state = {
  web3: {
  	isInjected: false,
  	web3Instance: null,
  	networkId: null,
  	coinbase: null,
  	error: null
  },
  authUser: {
    loginState: false,
    registerState: false,
    account: {
      name: '',
      avatar: '',
      balance: 0
    }
  },
  contractInstance: null
};
export default state

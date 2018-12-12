import Web3 from 'web3'

let getWeb3 = new Promise(function (resolve, reject) {
  var web3js = window.web3;
  var web3Provider;
  if (typeof web3js !== 'undefined') {
  	web3Provider = web3js.currentProvider;
  } else {
  	// If no injected web3 instance is detected, fall back to Ganache
  	web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
  }
  var web3 = new Web3(web3Provider);
  resolve({
  	injectedWeb3: web3.eth.net.isListening(),
  	web3() {
  		return web3
  	}
  })
})
  .then(result => {
  	return new Promise(function (resolve, reject) {
  	  result.web3().eth.net.getId((err, networkId) => {
  	  	if(err) {
  	  	  reject(new Error('Unable to retrieve network ID'))
  	  	} else {
  	  	  console.log('retrieve newworkId: ' + networkId)
  	  	  result = Object.assign({}, result, {networkId})
  	  	  resolve(result)
  	  	}
  	  })
  	})
  })
  .then(result => {
  	return new Promise(function (resolve, reject) {
  	  result.web3().eth.getCoinbase((err, coinbase) => {
  	  	if(err) {
  	  	reject(new Error('Unable to retrieve coinbase'))
  	  } else {
        coinbase = result.web3().utils.toChecksumAddress(coinbase);
  	  	console.log('retrieve coinbase: '+ coinbase);
  	  	result = Object.assign({}, result, {coinbase});
  	  	resolve(result)
  	  }})
  	})
  });

  export default getWeb3

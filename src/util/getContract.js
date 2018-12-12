import Web3 from 'web3'
import {address, ABI} from './constant/ecourse_abi'
import {store} from '../store/'

let getContract = new Promise(function(resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider);
  let ecourseContractInstance =  new web3.eth.Contract(ABI, address);
  if (!ecourseContractInstance) {
    reject("no contract instance build")
  }
  resolve(ecourseContractInstance);
});
export default getContract




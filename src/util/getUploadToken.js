import {accessKey, secretKey} from './config/qiniu'
const qiniu = require('qiniu');
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
  scope: 'sysu-geokg',
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);
console.log("get token successfully");

module.exports = uploadToken;

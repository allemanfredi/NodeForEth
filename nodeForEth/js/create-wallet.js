var Web3 = require('web3');
var Accounts = require('web3-eth-accounts');

var net = process.argv[2];

web3 = new Web3.providers.HttpProvider(net);
var accounts = new Accounts(web3);
console.log(accounts.create());
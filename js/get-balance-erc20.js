const Web3 = require('web3')
const EthereumTx = require('ethereumjs-tx')

var path = require('path')
var fs = require('fs')

var address = process.argv[2]
var contractAddress = process.argv[3]

const net = process.argv[4]//'https://rinkeby.infura.io/QQghNfFwGsfvd2rA8mjp '
const web3 = new Web3( new Web3.providers.HttpProvider(net) )


try{

  // This file is just JSON stolen from the contract page on etherscan.io under "Contract ABI"
  var abiArray = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../token/matoken-abi.json'), 'utf-8'));

  var contract = web3.eth.contract(abiArray).at(contractAddress);

  var balance = contract.balanceOf( address)
  balance = web3.fromWei(balance.valueOf(), 'ether')
  console.log(balance)

}catch(err){
  //exception handling
  console.log(err)
  return;
}

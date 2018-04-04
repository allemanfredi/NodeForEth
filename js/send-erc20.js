const Web3 = require('web3')
const EthereumTx = require('ethereumjs-tx')

var path = require('path')
var fs = require('fs')

var address = process.argv[3]
var private_key = process.argv[4]
var to = process.argv[5]

const net = process.argv[2]//'https://rinkeby.infura.io/QQghNfFwGsfvd2rA8mjp '
const web3 = new Web3( new Web3.providers.HttpProvider(net) )
web3.eth.defaultAccount = address;

var contractAddress = process.argv[6]

//number of token to send
var amountToSend = parseFloat(process.argv[7])

try{
  let myBalanceWei = web3.eth.getBalance(web3.eth.defaultAccount).toNumber()
  let myBalance = web3.fromWei(myBalanceWei, 'ether')

  //console.log('Your wallet balance is currently ' + myBalance + ' ETH')

  let nonce = web3.eth.getTransactionCount(web3.eth.defaultAccount)
  //console.log('The outgoing transaction count for your wallet address is: ' + nonce )

  // This file is just JSON stolen from the contract page on etherscan.io under "Contract ABI"
  var abiArray = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../token/matoken-abi.json'), 'utf-8'));

  // This is the address of the contract which created the ERC20 token
  //var contractAddress = "0x4C20aEa100612472BB598A789c6b1D43B88cee55";
  var contract = web3.eth.contract(abiArray).at(contractAddress);

  //here i have to calculate the correct amunt of token that i want to send
  amountToSend = amountToSend * 1000000000000000;

  var data = contract.transfer.getData(contractAddress, amountToSend, {from: address});
  var gasPrice = 3;
  var gasLimit = 90000;

  // I chose gas price and gas limit based on what ethereum wallet was recommending for a similar transaction. You may need to change the gas price!
  var details = {
      "from": address,
      "nonce": "0x" + nonce.toString(16),
      "gasPrice": gasPrice * 1000000000,
      "gasLimit": gasLimit,
      "to": to,
      "value": "0x0",
      "data": data,
      "chainId": 0x04
  };


  const transaction = new EthereumTx(details)

  transaction.sign( Buffer.from(private_key, 'hex') )

  const serializedTransaction = transaction.serialize()

  web3.eth.sendRawTransaction('0x' + serializedTransaction.toString('hex'), function(err, hash) {
    if (!err){
      console.log(hash+ ":" + "https://rinkeby.etherscan.io/tx/" + hash); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
    }
    else{
      console.log('error:' + err)
    }
  });
}
catch(err){
  //exception handling
  console.log(err)
  return;
}

const Web3 = require('web3')
const EthereumTx = require('ethereumjs-tx')
const axios = require('axios')


var address = process.argv[3]
var private_key = process.argv[4]
var to = process.argv[5]

const net = process.argv[2]//'https://rinkeby.infura.io/QQghNfFwGsfvd2rA8mjp '
const web3 = new Web3( new Web3.providers.HttpProvider(net) )
web3.eth.defaultAccount = address;

//number of token to send
const amountToSend = parseFloat(process.argv[6])

try{
  let myBalanceWei = web3.eth.getBalance(web3.eth.defaultAccount).toNumber()
  let myBalance = web3.fromWei(myBalanceWei, 'ether')

  //console.log('Your wallet balance is currently ' + myBalance + ' ETH')

  let nonce = web3.eth.getTransactionCount(web3.eth.defaultAccount)
  //console.log('The outgoing transaction count for your wallet address is: ' + nonce )

  let details = {
    "to": to,
    "value": web3.toHex( web3.toWei(amountToSend, 'ether') ),
    "gasLimit": 21000,
    "gasPrice": 1 * 1000000000, // converts the gwei price to wei
    "nonce": nonce,
    "chainId": 4 // EIP 155 chainId - mainnet: 1, rinkeby: 4
  }

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
  if ( err.message === 'The field to must have byte length of 20')
    console.log("error: Invalid address")
  return;
}

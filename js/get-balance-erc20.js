/**
 * User: alle.manfredi
 * Date: 12/04/2018
 * Time: 21:27
 */

const Web3 = require('web3')
const EthereumTx = require('ethereumjs-tx')

var path = require('path')
var fs = require('fs')

var address = process.argv[2]
var contractAddress = process.argv[3]

const net = process.argv[4]//'https://rinkeby.infura.io/QQghNfFwGsfvd2rA8mjp '
const web3 = new Web3( new Web3.providers.HttpProvider(net) )


try{

  var abiArray = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../token/matoken-abi.json'), 'utf-8'));

  //get the balance
  var contract = new web3.eth.Contract(abiArray,contractAddress);

  contract.methods.balanceOf(address).call().then(function(result){
    //the result holds your Token Balance that you can assign to a var
    var balance = result;
    balance = web3.utils.fromWei(balance, 'ether')
    console.log(balance)
  });

  /*var balance = contract.methods.balanceOf(address)
  console.log(balance.valueOf())
  balance = web3.utils.fromWei(String(balance.valueOf()), 'ether')
  console.log(balance)*()*/


}catch(err){
  //exception handling
  console.log(err)
  return;
}

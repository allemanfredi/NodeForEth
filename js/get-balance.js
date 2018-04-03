var Web3 = require('web3');

//get net URL
var net = process.argv[3];

web3 = new Web3(new Web3.providers.HttpProvider(net));

var addr = (process.argv[2]);
try{
	var res = web3.eth.getBalance(addr);
	console.log(web3.fromWei(res.valueOf(), 'ether'));

}catch(err){
	console.log('error:' + err.message);
}

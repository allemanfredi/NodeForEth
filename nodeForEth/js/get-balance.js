var Web3 = require('web3');

//get net URL
var net = process.argv[3];

web3 = new Web3(new Web3.providers.HttpProvider(net));

var addr = (process.argv[2]);
web3.eth.getBalance(addr, function (error, result) {
	if (!error){
		console.log(web3.fromWei(result.valueOf(), 'ether'));
	}
	else
		console.log('error');
});

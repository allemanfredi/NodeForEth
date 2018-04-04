<?php

/**
 * PHP Class to interact with ethereum blockchain throug node.js
 *
 *
 * @link https://github.com/allemanfredi/NodeForEth/
 * @author Alessandro Manfredi <alle.manfredi@gmail.com>
 * @access public
 * @copyright (c) 2018, Alessandro Manfredi
 * @version 1.0
 */
class NodeForEth {

    private $nodePath = '';
    private $debug = false;
    private $psw = '';
    private $net = '';

    /**
    * Initialize NodeForEth
    *
    * @param boolean $debug to enable or disable debug messages
    * @param String  $psw   user psw to enable sudo into command line
    * @param String  $net   net in which you want to operate ----> ex : rospten , localhost:8545 ecc...
    * @param String  $path  node path
    */
    public function __construct($debug = false , $psw = '' , $net = '' , $path = '') {

        $this->debug = $debug;
        $this->net = $net;
        $this->psw = $psw;
        $this->nodePath = $path;
    }


  /**
  * Get Balance (ether) given an address
  *
  * @param String  $address of which you want to get the balance
  */
   public function getBalance ( $address ){

   	$cmd = shell_exec('echo '.$this->psw.' | sudo -S '.$this->nodePath.' ./js/get-balance.js  '.$address.' '.$this->net.' 2>&1');

    	if ( $this->debug == true )
      		echo $cmd;

	//cmd result = "Password:1.3455555555.55555ecc" -> needed to be splitted   ( 'error' = error )
	$result = explode( ":" , $cmd );

	return $result[1];
   }
	

   /**
   * Get Balance  given an address of a specific erc20 token identified by its address
   *
   * @param String  $address of which you want to get the balance
   * @param String  $contract address
   */
   public function getBalanceERC20 ( $address , $contract_address ){
	
	$cmd = shell_exec('echo '.$this->psw.' | sudo -S '.$this->nodePath.' ../node/js/get-balance-erc20.js  '.$address.' '.$contract_address.' '.$this->net.' 2>&1');

        //if debug is enanle then print the reslult taken from js file
        if ( $this->debug == true )
      		echo $cmd;

	$result = explode( ":" , $cmd );

    	return $result;
     }


    /**
    * Create a wallet
    */
    public function createWallet ( ){

    	$cmd = shell_exec('echo '.$this->psw.' | sudo -S '.$this->nodePath.' ./js/create-wallet.js '.$this->net.' 2>&1');

    	if ( $this->debug == true )
      		echo $cmd;

	$explode = explode( "'" , $cmd );
	$address = $explode[1];
	$private_key = $explode[3];

	$result['address'] = $address;
	$result['private_key'] = $private_key;
	return $result;
  }

  /**
  * Send tx to a an address
  * @param String  $address_src address source
  * @param String  $pr_key_src private key of who want to send tokens
  * @param String  $address where will be sent the tokens
  * @param Float   $n_token : amount of token you want to send
  */
  public function sendTx ( $address_src , $pr_key_src , $address_dst , $n_token ){

  	$cmd = shell_exec('echo '.$this->psw.' | sudo -S '.$this->nodePath.' ./js/send-tx.js '
                          .$this->net.' '.$address_src.' '.$pr_key_src.' '.$address_dst.' '
                          .$n_token. ' 2>&1');

    	if ( $this->debug == true )
      		echo $cmd;

    	//cmd result = "Password:0x44hb4h4b4h4b4h4bh4b4h4b4h" -> needed to be splitted   ( 'error' = error )
    	$result = explode( ":" , $cmd );

    	return $result[1];
  }
	
	
  /**
  * Send tx to a an address
  * @param String  $address_src address source
  * @param String  $pr_key_src private key of who want to send tokens
  * @param String  $address where will be sent the tokens
  * @param String  $contract_address
  * @param Float   $n_token : amount of token you want to send
  */
  public function sendERC20 ( $address_src , $pr_key_src , $address_dst , $contract_address ,$n_token ){

    $cmd = shell_exec('echo '.$this->psw.' | sudo -S '.$this->nodePath.' ../node/js/send-erc20.js '
                       .$this->net.' '.$address_src.' '.$pr_key_src.' '.$address_dst.' '
                       .' '.$contract_address.' '.$n_token. ' 2>&1');

    if ( $this->debug == true )
      echo $cmd;

    $result = explode( ":" , $cmd );

    return $result;
  }

}
?>

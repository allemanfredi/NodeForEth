
<?php
  include_once dirname(__FILE__) . '/NodeForEth.php';

  $debug = false;
  $NodeForEth = new NodeForEth($debug , 'Ktmsxf2502015' ,'https://rinkeby.infura.io/QQghNfFwGsfvd2rA8mjp' , '/usr/local/bin/node' );
  $result = $NodeForEth->getBalance('0x9596f1439576e0142976F0822883DE62e326B542');

  if (  trim($result[1] ) === "error" ){
    echo $result[2];
  }else{
    $balance = $result[1];
    echo $balance;
  }

  $result = $NodeForEth->sendTx('0x9596f1439576e0142976F0822883DE62e326B542' ,
                       '983ab3335943f82ecb78e941ad03ddd60e149d8a02be8ca4c0c2a65bf48292cc',
                       '0xbd95911be6E070e23569bcbF612aEad91afC0002' ,
                       0.010000 );
   if (  trim($result[1] ) === "error" ){
     echo $result[2];
   }
   else{
     $transaction_id = $result[1];
     echo $transaction_id;
   }


  $result = $NodeForEth->sendERC20('0x9596f1439576e0142976F0822883DE62e326B542' ,
                      '983ab3335943f82ecb78e941ad03ddd60e149d8a02be8ca4c0c2a65bf48292cc',
                      '0x5eE8f0ec28F6Fae0c79D5dd37DbB66256b2911f4' ,
                      '0x4C20aEa100612472BB598A789c6b1D43B88cee55' ,
                       20000 );
  if (  trim($result[1] ) === "error" ){
    echo $result[2];
  }
  else{
    $transaction_id = $result[1];
    echo $transaction_id;
  }

?>

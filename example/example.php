<?php

include_once dirname(__FILE__) . '/NodeForEth.php';

$debug = true;
$NodeForEth = new NodeForEth($debug , 'your password' ,'https://rinkeby.infura.io/QQghNfFwGsfvd2rA8mjp' , '/usr/local/bin/node' );


echo $NodeForEth->getBalance('0x281055afc982d96fab65b3a49cac8b878184cb16');

$NodeForEth->sendTx('0x9596f1439576e0142976F0822883DE62e326B542' ,
                     '983ab3335943f82ecb78e941ad03ddd60e149d8a02be8ca4c0c2a65bf48292cc',
                     '0xeF19E7Ec9eE90a0426c60aFCc504C02513E11' ,
                     0.010000 );
                    
?>

const mutiOmniSing = require('../sdk/sign/omniSign');

var utxo ={
    "unspent_outputs":[
        {
            "tx_hash":"58b632679fadd5071fa2129bee5bf9336e04e0043602272d4b8dc871a83694c0",
            "tx_hash_big_endian":"c09436a871c88d4b2d27023604e0046e33f95bee9b12a21f07d5ad9f6732b658",
            "tx_index":387716199,
            "tx_output_n": 1,
            "script":"76a91462afcd140f6175796395a9a2f55cf2bbb601393488ac",
            "value": 10000,
            "value_hex": "2710",
            "confirmations":6096
        },

        {
            "tx_hash":"e518c002e4cd8c5bedddeb0c24206394ae10b51ab1f1d0ed73471bd1d0dd4a9f",
            "tx_hash_big_endian":"9f4addd0d11b4773edd0f1b11ab510ae946320240cebdded5b8ccde402c018e5",
            "tx_index":389304216,
            "tx_output_n": 1,
            "script":"76a91462afcd140f6175796395a9a2f55cf2bbb601393488ac",
            "value": 10000,
            "value_hex": "2710",
            "confirmations":5337
        },

        {
            "tx_hash":"1850f43bae65cbd273485605f72229b17cad5c403bd35d7d9428d2c235bb36c7",
            "tx_hash_big_endian":"c736bb35c2d228947d5dd33b405cad7cb12922f705564873d2cb65ae3bf45018",
            "tx_index":399931612,
            "tx_output_n": 0,
            "script":"76a91462afcd140f6175796395a9a2f55cf2bbb601393488ac",
            "value": 546,
            "value_hex": "0222",
            "confirmations":165
        },

        {
            "tx_hash":"ef3cb8ac18d67056d23afc52952684a0d822812e80b81c080c8e13dca8a52e63",
            "tx_hash_big_endian":"632ea5a8dc138e0c081cb8802e8122d8a084269552fc3ad25670d618acb83cef",
            "tx_index":400228035,
            "tx_output_n": 0,
            "script":"76a91462afcd140f6175796395a9a2f55cf2bbb601393488ac",
            "value": 546,
            "value_hex": "0222",
            "confirmations":0
        }

    ]
};

/*
var sendInfo = {
    privateKey:"私钥",
    utxo:utxo.unspent_outputs,
    fromAddress:"1DefiYRCAD4wVS7rXwFkqhEn6R88EkSUnh",
    feeValue:0.0002,
    "addressAmount":[
        {
            "toAddress":"1KSX5wmrVax3LYaB4uKUxXzCRcv5SiLDq3",
            "amount":1
        },{
            "toAddress":"19zopg3DC4wqomG4JsW3JzYHHpMnkCnN38",
            "amount":1
        },{
            "toAddress":"1EEfQUapVjKZtdNNZNDKSKAjS28VmyMYzo",
            "amount":1
        }
    ]
};
*/

var privateKey = "私钥";
var utxos =  utxo.unspent_outputs;
var fromAddress = "19zopg3DC4wqomG4JsW3JzYHHpMnkCnN38";
var feeValue = 0.0002;
var toAddress = "1DefiYRCAD4wVS7rXwFkqhEn6R88EkSUnh";
var usdtValue = 1;

var sign = mutiOmniSing.usdtSign(privateKey, utxos, feeValue, usdtValue, fromAddress, toAddress);
console.log(sign);



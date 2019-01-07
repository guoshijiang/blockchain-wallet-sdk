const signs = require('../sdk/sign/indexSign');

var utxo ={
    "unspent_outputs":[
        {
            "tx_hash":"58b632679fadd5071fa2129bee5bf9336e04e0043602272d4b8dc871a83694c0",
            "tx_hash_big_endian":"c09436a871c88d4b2d27023604e0046e33f95bee9b12a21f07d5ad9f6732b658",
            "tx_index":387716199,
            "tx_output_n": 0,
            "script":"76a9148ac137fb413490ec6f69792552c5f5ddf2ecd4cf88ac",
            "value": 100000,
            "value_hex": "0186a0",
            "confirmations":5925
        },
        {
            "tx_hash":"e518c002e4cd8c5bedddeb0c24206394ae10b51ab1f1d0ed73471bd1d0dd4a9f",
            "tx_hash_big_endian":"9f4addd0d11b4773edd0f1b11ab510ae946320240cebdded5b8ccde402c018e5",
            "tx_index":389304216,
            "tx_output_n": 0,
            "script":"76a9148ac137fb413490ec6f69792552c5f5ddf2ecd4cf88ac",
            "value": 100000,
            "value_hex": "0186a0",
            "confirmations":5166
        },
        {
            "tx_hash":"cf2bfbbca9071a62fc53edc3ae0bd9343c91529d41a4ff10291328d9b577e32a",
            "tx_hash_big_endian":"2ae377b5d928132910ffa4419d52913c34d90baec3ed53fc621a07a9bcfb2bcf",
            "tx_index":399118405,
            "tx_output_n": 2,
            "script":"76a9148ac137fb413490ec6f69792552c5f5ddf2ecd4cf88ac",
            "value": 546,
            "value_hex": "0222",
            "confirmations":495
        },
        {
            "tx_hash":"1bf1e457ac7572518cde36945e94728659dfae7fb2229411c1e13c085054c506",
            "tx_hash_big_endian":"06c55450083ce1c1119422b27faedf598672945e9436de8c517275ac57e4f11b",
            "tx_index":399167492,
            "tx_output_n": 0,
            "script":"76a9148ac137fb413490ec6f69792552c5f5ddf2ecd4cf88ac",
            "value": 546,
            "value_hex": "0222",
            "confirmations":471
        },
        {
            "tx_hash":"57528ec2f4fecede043ce15305d7e9748031ffed7df5ae92472e5904e20a2aff",
            "tx_hash_big_endian":"ff2a0ae204592e4792aef57dedff318074e9d70553e13c04decefef4c28e5257",
            "tx_index":399168014,
            "tx_output_n": 0,
            "script":"76a9148ac137fb413490ec6f69792552c5f5ddf2ecd4cf88ac",
            "value": 546,
            "value_hex": "0222",
            "confirmations":471
        }
    ]
}

var signParams = {
    "signMark":"OMNI",
    "privateKey":"私钥",
    "contractAddress":"0xfa3118b34522580c35ae27f6cf52da1dbb756288",
    "fromAddress":"12zEJohMNqSZLXH1Msxpw41ykkk3rxgx1s",
    "changeAddress":"1KSX5wmrVax3LYaB4uKUxXzCRcv5SiLDq3",
    "utxo":utxo.unspent_outputs,
    "sendFee":0.001,
    "gasPrice":12000000000,
    "gasLimit":30000,
    "nonce":63,
    "decimal":6,
    "addressAmount":[
        {
            "toAddress":"1KSX5wmrVax3LYaB4uKUxXzCRcv5SiLDq3",
            "amount":10
        },{
            "toAddress":"12zEJohMNqSZLXH1Msxpw41ykkk3rxgx1s",
            "amount":10
        },{
            "toAddress":"12zEJohMNqSZLXH1Msxpw41ykkk3rxgx1s",
            "amount":10
        }
    ]
};

var sign = signs.blockchainWalletSign(signParams);
console.log(sign);




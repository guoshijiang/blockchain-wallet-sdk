const mutiOmniSing = require('../sdk/sign/omniSign');

var utxo ={
    "unspent_outputs":[
        {
            "tx_hash":"1850f43bae65cbd273485605f72229b17cad5c403bd35d7d9428d2c235bb36c7",
            "tx_hash_big_endian":"c736bb35c2d228947d5dd33b405cad7cb12922f705564873d2cb65ae3bf45018",
            "tx_index":399931612,
            "tx_output_n": 3,
            "script":"76a9148ac137fb413490ec6f69792552c5f5ddf2ecd4cf88ac",
            "value": 181092,
            "value_hex": "02c364",
            "confirmations":27
        }
    ]
}

var sendInfo = {
    privateKey:"L3TiWsZxS2jAKkLjrDajEPhzVmCmY6MzvTmGGQfWxT8GgdYp1g6e",
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

var sign = mutiOmniSing.usdtBatchSign(sendInfo);
console.log(sign);

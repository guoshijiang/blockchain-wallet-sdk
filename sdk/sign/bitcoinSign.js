const bitcoin = require('bitcoinjs-lib');
const constant = require('../constant');

var ligBitcoinSign = {};

/**
 * @param privateKey
 * @param amount
 * @param utxo
 * @param sendFee
 * @param toAddress
 * @param changeAddress
 * @returns {*}
 */
ligBitcoinSign.btcSingleSign = function (privateKey, amount, utxo, sendFee, toAddress, changeAddress) {
    if(!privateKey && !amount && !utxo && !sendFee && !toAddress && !changeAddress ) {
        console.log("one of privateKey, amount, utxo, sendFee, toAddress and changeAddress is null, please give a valid param");
        return constant.paramsErr;
    } else {
        var set = bitcoin.ECPair.fromWIF(privateKey);
        var txb = new bitcoin.TransactionBuilder();
        var sendAmount = parseFloat(amount);
        var fee = parseFloat(sendFee);
        sendAmount += fee;
        txb.setVersion(1);
        var totalMoney = 0;
        for(var i=0; i<utxo.length; i++){
            txb.addInput(utxo[i].tx_hash_big_endian, utxo[i].tx_output_n);
            totalMoney += utxo[i].value;
        }
        txb.addOutput(toAddress, sendAmount - fee);
        txb.addOutput(changeAddress, totalMoney - sendAmount);
        for(var i = 0; i < utxo.length; i++){
            txb.sign(i, set);
        }
    }
    return txb.buildIncomplete().toHex();
};

/**
 * @param sendInfo
 * @param utxo
 * @returns {*}
 */
ligBitcoinSign.btcMultiSign = function(sendInfo, utxo) {
    if( !utxo && !sendInfo ) {
        console.log("one of sendInfo or utxo, is null, please give a valid param");
        return constant.paramsErr;
    } else {
        console.log("param is valid, start sign transaction");
        var set = bitcoin.ECPair.fromWIF(sendInfo.privateKey);
        var txb = new bitcoin.TransactionBuilder();
        var sendAmount = 0;
        txb.setVersion(1);
        var totalMoney = 0;
        for(var i=0; i<utxo.length; i++){
            txb.addInput(utxo[i].tx_hash_big_endian, utxo[i].tx_output_n);
            totalMoney += utxo[i].value;
        }
        for(var j = 0; j < sendInfo.addressAmount.length; j++)
        {
            txb.addOutput(sendInfo.addressAmount[j].toAddress,  parseFloat(sendInfo.addressAmount[j].amount));
            sendAmount = sendAmount +  parseFloat(sendInfo.addressAmount[j].amount);
        }
        txb.addOutput(sendInfo.changeAddress, totalMoney - (sendAmount + parseFloat(sendInfo.sendFee)));
        for(var i=0; i< utxo.length;i++){
            txb.sign(i, set);
        }
    }
    return txb.buildIncomplete().toHex();
};

module.exports = ligBitcoinSign;

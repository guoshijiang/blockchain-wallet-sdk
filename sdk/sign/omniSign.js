const bitcoin = require('bitcoinjs-lib');
const constant = require('../constant');

var libUsdtSign = {};

/**
 * @param num
 * @returns {string}
 */
function addPreZero(num){
    var t = (num+'').length,
        s = '';
    for(var i=0; i<16-t; i++){
        s += '0';
    }
    return s+num;
}

/**
 * @param privateKey
 * @param utxo
 * @param feeValue
 * @param usdtValue
 * @param fromAddress
 * @param toAddress
 * @returns {*}
 */
libUsdtSign.usdtSign = function (privateKey, utxo, feeValue, usdtValue, fromAddress, toAddress) {
    if(!privateKey || !utxo || !feeValue || !usdtValue || !fromAddress || !toAddress) {
        console.log("input params is null");
        return constant.paramsErr;
    }
    var txb = new bitcoin.TransactionBuilder();
    var set = bitcoin.ECPair.fromWIF(privateKey);
    const fundValue = 546;
    var usdtAmount = parseInt(usdtValue*1e8).toString(16);
    var totalUnspent = 0;
    for(var i = 0; i < utxo.length; i++){
        totalUnspent = totalUnspent + utxo[i].value;
    }
    const changeValue = totalUnspent - fundValue - (feeValue*1e8);
    if (totalUnspent < feeValue + fundValue) {
        console.log("Total less than fee");
        return constant.LessValue;
    }
    for(var i = 0; i< utxo.length; i++){
        txb.addInput(utxo[i].tx_hash_big_endian, utxo[i].tx_output_n, 0xfffffffe);
    }
    const usdtInfo = [
        "6f6d6e69",
        "0000",
        "00000000001f",
        addPreZero(usdtAmount)
    ].join('');
    const data = Buffer.from(usdtInfo, "hex");
    const omniOutput = bitcoin.script.compile([
        bitcoin.opcodes.OP_RETURN,
        data
    ]);
    txb.addOutput(toAddress, fundValue);
    txb.addOutput(omniOutput, 0);
    txb.addOutput(fromAddress, changeValue);
    for(var i = 0;i < utxo.length; i++){
        txb.sign(i, set);
    }
    return txb.buildIncomplete().toHex();
};

/**
 * @param sendInfo
 * @returns {*}
 */
libUsdtSign.usdtBatchSign = function (sendInfo) {
   if(!sendInfo) {
       console.log("input params is null");
       return constant.paramsErr;
   }
   const fundValue = 546;
   var totalUnspent = 0;
   var txb = new bitcoin.TransactionBuilder();
   var set = bitcoin.ECPair.fromWIF(sendInfo.privateKey);
    for(var i = 0; i < sendInfo.utxo.length; i++){
        totalUnspent = totalUnspent + sendInfo.utxo[i].value;
    }
    var changeValue = totalUnspent - fundValue - (sendInfo.feeValue*1e8);
    if (totalUnspent < sendInfo.feeValue + fundValue) {
        console.log("Total less than fee");
        return constant.LessValue;
    }
    for(var i = 0; i< sendInfo.utxo.length; i++){
        txb.addInput(sendInfo.utxo[i].tx_hash_big_endian, sendInfo.utxo[i].tx_output_n, 0xfffffffe);
    }
    for(var i = 0; i < sendInfo.addressAmount.length; i++) {
        var usdtAmount = parseInt(sendInfo.addressAmount[i].amount*1e8).toString(16);
        const usdtInfo = [
            "6f6d6e69",
            "0000",
            "00000000001f",
            addPreZero(usdtAmount)
        ].join('');
        const data = Buffer.from(usdtInfo, "hex");
        const omniOutput = bitcoin.script.compile([
            bitcoin.opcodes.OP_RETURN,
            data
        ]);
        txb.addOutput(sendInfo.addressAmount[i].toAddress, fundValue);
        txb.addOutput(omniOutput, 0);
    }
    txb.addOutput( sendInfo.fromAddress, changeValue);
    for(var i = 0;i < sendInfo.utxo.length; i++){
        txb.sign(i, set);
    }
    return txb.buildIncomplete().toHex();
};

module.exports = libUsdtSign;




const util = require('ethereumjs-util');
const transaction = require('ethereumjs-tx');

var ethOrErc20Sign = {};

/**
 * @param privateKey
 * @param nonce
 * @param toAddress
 * @param sendAmount
 * @param gasPrice
 * @param gasLimit
 * @returns {*}
 */
ethOrErc20Sign.ethereumSign = function (privateKey, nonce, toAddress, sendAmount, gasPrice, gasLimit) {
    var errData = {code:400, message:"param is null"};
    var serializedErr = {code:400, message:"Serialized transaction fail"};
    if(!privateKey || !nonce || !toAddress || !sendAmount || !gasPrice || !gasLimit) {
        console.log("one of fromAddress, toAddress, sendToBalance, sendFee is null, please give a valid param");
        return errData;
    } else {
        var transactionNonce = parseInt(nonce).toString(16);
        var numBalance = parseFloat(sendAmount);
        var balancetoWei = web3.toWei(numBalance, "ether");
        var oxNumBalance = parseInt(balancetoWei).toString(16);
        var gasPriceHex = parseInt(gasPrice).toString(16);
        var gasLimitHex = parseInt(gasLimit).toString(16);
        var privateKeyBuffer =  Buffer.from(privateKey, 'hex');
        var rawTx = {
            nonce:'0x' + transactionNonce,
            gasPrice: '0x' + gasPriceHex,
            gas:'0x'+ gasLimitHex,
            to:toAddress,
            value:'0x' + oxNumBalance,
        };
        alert(JSON.stringify(rawTx));
        var tx = new transaction(rawTx);
        tx.sign(privateKeyBuffer);
        var serializedTx = tx.serialize();
        if(serializedTx == null) {
            return serializedErr;
        } else {
            if (tx.verifySignature()) {
                console.log('Signature Checks out!');
            } else {
                return serializedErr;
            }
        }
    }
    return '0x' + serializedTx.toString('hex');
}

/**
 * @param privateKey
 * @param nonce
 * @param currentAccount
 * @param contractAddress
 * @param toAddress
 * @param gasPrice
 * @param gasLimit
 * @param totalAmount
 * @param decimal
 * @returns {*}
 * @constructor
 */
ethOrErc20Sign.Erc20CoinSign = function(privateKey, nonce, currentAccount,  contractAddress, toAddress,  gasPrice,  gasLimit, totalAmount , decimal) {
    if(!privateKey || !nonce || !currentAccount || !contractAddress || !toAddress  || !gasPrice || !gasLimit || !totalAmount || !decimal) {
        console.log("one of param is null, please give a valid param");
        var errData = {msgCode:3000, Message:"one of param is null, please give a valid param"};
        return errData;
    }
    var transactionNonce = parseInt(nonce).toString(16);
    console.log("transaction nonce is " + transactionNonce);
    var gasLimits = parseInt(60000).toString(16);
    console.log("send transaction gasLimit is " + gasLimit);
    var gasPrices = parseFloat(gasPrice).toString(16);
    console.log("send transaction gasPrice is " + gasPrice);
    var txboPrice = parseFloat(totalAmount*(10**decimal)).toString(16)
    var txData = {
        nonce: '0x'+ transactionNonce,
        gasLimit: '0x' + gasLimits,
        gasPrice: '0x' +gasPrices,
        to: contractAddress,
        from: currentAccount,
        value: '0x00',
        data: '0x' + 'a9059cbb' + addPreZero(toAddress.substr(2)) + addPreZero(txboPrice)
    }
    var tx = new transaction(txData);
    const privateKey1 = new Buffer(privateKey, 'hex');
    tx.sign(privateKey1);
    var serializedTx = tx.serialize().toString('hex');
    console.log("transaction sign result is " + serializedTx);
    return '0x'+serializedTx;
}

module.exports = ethOrErc20Sign;

const util = require('ethereumjs-util');
const transaction = require('ethereumjs-tx');
const Web3 = require('web3');
const constant = require('../constant');

var libEthereumSign = {};

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider);
} else {
    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

/**
 * @param privateKey
 * @param nonce
 * @param toAddress
 * @param sendToBalance
 * @param gasPrice
 * @param gasLimit
 * @returns {*}
 */
libEthereumSign.ethereumSign = function (privateKey, nonce, toAddress, sendToBalance, gasPrice, gasLimit) {
    if(!privateKey && !nonce && !toAddress && !sendToBalance && !gasPrice && !gasLimit) {
        console.log("one of fromAddress, toAddress, sendToBalance, sendFee is null, please give a valid param");
        return constant.paramsErr;
    } else {
        var transactionNonce = parseInt(nonce).toString(16);
        var numBalance = parseFloat(sendToBalance);
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
        var tx = new transaction(rawTx);
        tx.sign(privateKeyBuffer);
        var serializedTx = tx.serialize();
        if(serializedTx == null) {
            return constant.serializedErr;
        } else {
            if (tx.verifySignature()) {
                console.log('Signature Checks out!');
            } else {
                return constant.serializedErr;
            }
        }
    }
    return '0x' + serializedTx.toString('hex');
};

/**
 * @param sendInfo
 * @returns {*}
 */
libEthereumSign.ethereumMultiSign = function (sendInfo) {
    if(sendInfo == null) {
        console.log("param is invalid, sendInfo is null");
        return constant.paramsErr;
    }
    var calcNonce = Number(sendInfo.nonce);
    var arrData = sendInfo.addressAmount;
    var outArr = [];
    for(var i = 0; i < arrData.length; i++){
        var transactionNonce = parseInt(calcNonce).toString(16);
        var balancetoWei = web3.toWei(parseFloat(sendInfo.addressAmount[i].amount), "ether");
        var balanceValue = parseInt(balancetoWei).toString(16);
        var oxGas = parseInt(sendInfo.gasLimit).toString(16);
        var oxGasPrice = parseInt(sendInfo.gasPrice).toString(16);
        var privateKeyBuffer =  Buffer.from(sendInfo.privateKey, 'hex');
        var rawTx = {
            nonce:'0x' + transactionNonce,
            gasPrice: '0x' + oxGasPrice,
            gas:'0x' + oxGas,
            to: sendInfo.addressAmount[i].toAddress,
            value:'0x' + balanceValue
        };
        var tx = new transaction(rawTx);
        tx.sign(privateKeyBuffer);
        var serializedTx = tx.serialize();
        if(serializedTx == null) {
            console.log("Serialized transaction fail")
        } else {
            outArr = outArr.concat('0x' + serializedTx.toString('hex'))
            if (tx.verifySignature()) {
                console.log('Signature Checks out!')
            } else {
                console.log("Signature checks fail")
            }
        }
        calcNonce = calcNonce + 1;
    }
    return { signCoin:"ETH", signDataArr:outArr}
};

module.exports = libEthereumSign;

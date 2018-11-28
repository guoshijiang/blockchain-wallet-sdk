const util = require('ethereumjs-util');
const transaction = require('ethereumjs-tx');
const Web3 = require('web3');

var libEthereumSign = {};

const paramsErr = {code:1000, message:"input params is null"};
var serializedErr = {code:400, message:"Serialized transaction fail"};

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
    if(!privateKey || !nonce || !toAddress || !sendToBalance || !gasPrice || !gasLimit) {
        console.log("one of fromAddress, toAddress, sendToBalance, sendFee is null, please give a valid param");
        return paramsErr;
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
};

/**
 * @param sendData
 * @returns {*}
 */
libEthereumSign.ethereumMultiSign = function (sendData) {
    if(sendData == null) {
        console.log("param is invalid, sendData is null");
        return paramsErr;
    }
    var calcNonce = Number(sendData.nonce);
    var arrData = sendData.signDta;
    var outArr = [];
    for(var i = 0; i < arrData.length; i++){
        var transactionNonce = parseInt(calcNonce).toString(16);
        var balancetoWei = web3.toWei(parseFloat(sendData.signDta[i].totalAmount), "ether");
        var balanceValue = parseInt(balancetoWei).toString(16);
        var oxGas = parseInt(sendData.gasLimit).toString(16);
        var oxGasPrice = parseInt(sendData.gasPrice).toString(16);
        var privateKeyBuffer =  Buffer.from(sendData.privateKey, 'hex');
        var rawTx = {
            nonce:'0x' + transactionNonce,
            gasPrice: '0x' + oxGasPrice,
            gas:'0x' + oxGas,
            to: sendData.signDta[i].toAddress,
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

const transaction = require( 'ethereumjs-tx');
const constant = require('../constant');

var libErc29Sign = {};

function addPreZero(num){
    var t = (num+'').length,
        s = '';
    for(var i=0; i<64-t; i++){
        s += '0';
    }
    return s+num;
}

libErc29Sign.ethereumErc20CoinSign = function(privateKey, nonce, currentAccount,  contractAddress, toAddress,  gasPrice,  gasLimit, totalAmount , decimal) {
    if(!privateKey && !nonce && !currentAccount && !contractAddress && !toAddress  && !gasPrice && !gasLimit && !totalAmount && !decimal) {
        console.log("one of param is null, please give a valid param");
        return constant.paramsErr;
    }
    var transactionNonce = parseInt(nonce).toString(16);
    var gasLimits = parseInt(gasLimit).toString(16);
    var gasPrices = parseFloat(gasPrice).toString(16);
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
    return '0x'+serializedTx;
};

libErc29Sign.MultiEthereumErc20CoinSign = function (sendInfo) {
    var outErc20Data = [];
    if(sendInfo === null) {
        console.log("sendInfo param is null, please give a valid param");
        return constant.paramsErr;
    }
    var calcNonce = Number(sendInfo.nonce);
    for (var i = 0; i < sendInfo.addressAmount.length; i++){
        var transactionNonce = parseInt(calcNonce).toString(16);
        var gasLimit = parseInt(120000).toString(16);
        var gasPrice = parseFloat(sendInfo.gasPrice).toString(16);
        var totx = parseFloat((sendInfo.addressAmount[i].amount)*(10**(sendInfo.decimal))).toString(16);
        var txData = {
            nonce: '0x'+ transactionNonce,
            gasLimit: '0x' + gasLimit,
            gasPrice: '0x' +gasPrice,
            to: sendInfo.contractAddress,
            from: sendInfo.currentAccount,
            value: '0x00',
            data: '0x' + 'a9059cbb' + addPreZero((sendInfo.addressAmount[i].toAddress).substr(2)) + addPreZero(totx)
        }
        var tx = new transaction(txData);
        const privateKey1 = new Buffer(sendInfo.privateKey, 'hex');
        tx.sign(privateKey1);
        var serializedTx = '0x' + tx.serialize().toString('hex');
        outErc20Data = outErc20Data.concat(serializedTx)
        calcNonce = calcNonce + 1;
    }
    return { signCoin:"ERC20", signDataArr:outErc20Data}
};

module.exports = libErc29Sign;

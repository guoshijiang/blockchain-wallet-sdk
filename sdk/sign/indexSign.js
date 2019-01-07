const bitcoinSign = require('./bitcoinSign');
const erc20Sign = require('./erc20Sign');
const ethereumSign = require('./ethereumSign');
const omniSign = require('./omniSign')
const constant = require('../constant');

var libIndexSign = {};

libIndexSign.blockchainWalletSign = function (signParams) {
    if(!signParams) {
        console.log("input params is null");
        return constant.paramsErr;
    }
    if(!signParams.signMark){
        console.log("signParams.signMark param is null, please check it");
        return constant.signMarkErr;
    }
    switch (signParams.signMark) {
        case 'BTC':
            if (signParams.privateKey && signParams.changeAddress && signParams.sendFee && signParams.addressAmount && signParams.utxo) {
                var sendInfo = {
                    privateKey:signParams.privateKey,
                    changeAddress:signParams.changeAddress,
                    sendFee:signParams.sendFee,
                    addressAmount:signParams.addressAmount
                };
                var uxto = signParams.utxo;
                return bitcoinSign.btcMultiSign(sendInfo, signParams.utxo);
            } else {
                console.log("bitcoin sign fail, please check your params");
                return constant.BitCoinSignFail;
            }
        case 'ETH':
            if(signParams.privateKey && signParams.gasPrice && signParams.gasLimit && signParams.nonce && signParams.addressAmount){
                var sendInfo = {
                    privateKey:signParams.privateKey,
                    gasPrice:signParams.gasPrice,
                    gasLimit:signParams.gasLimit,
                    nonce:signParams.nonce,
                    addressAmount:signParams.addressAmount
                };
                return ethereumSign.ethereumMultiSign(sendInfo)
            } else {
                console.log("eth sign fail, please check it");
                return constant.EthSignFail;
            }
        case 'ERC20':
            if(signParams.privateKey && signParams.contractAddress && signParams.fromAddress && signParams.gasPrice && signParams.gasLimit && signParams.nonce && signParams.decimal && signParams.addressAmount) {
                var sendInfo = {
                    privateKey:signParams.privateKey,
                    contractAddress:signParams.contractAddress,
                    currentAccount:signParams.fromAddress,
                    gasPrice:signParams.gasPrice,
                    gasLimit:signParams.gasLimit,
                    nonce:signParams.nonce,
                    decimal:signParams.decimal,
                    addressAmount:signParams.addressAmount
                };
                return erc20Sign.MultiEthereumErc20CoinSign(sendInfo);
            } else {
                console.log("erc20 sign fail, please check it");
                return constant.Erc20SignFail;
            }
        case 'OMNI':
            if(signParams.privateKey && signParams.changeAddress &&  signParams.sendFee && signParams.addressAmount && signParams.utxo) {
                var sendInfo = {
                    privateKey:signParams.privateKey,
                    utxo:signParams.utxo,
                    fromAddress:signParams.changeAddress,
                    feeValue:signParams.sendFee,
                    addressAmount:signParams.addressAmount
                };
                return omniSign.usdtSign(privateKey, utxo, feeValue, addressAmount[0].amount, fromAddress, addressAmount[0].toAddress);
            } else {
                console.log("omni sign fail, please check it");
                return constant.OmniSignFail;
            }
        case 'EOS':
            console.log("Temporarily does not support the situation you want");
            return constant.noSupport;
        default:
            console.log("Temporarily does not support the situation you want");
            return constant.noSupport;
    }
};

module.exports = libIndexSign;

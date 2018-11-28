const bitcoin  = require('bitcoinjs-lib');
const baddress = require('bitcoinjs-lib/src/address');
const bcrypto  = require('bitcoinjs-lib/src/crypto');
const NETWORKS = require('bitcoinjs-lib/src/networks');
const hdkey = require('ethereumjs-wallet/hdkey');
const util = require('ethereumjs-util');
const bip32  = require( 'bip32');

var libGenerateAddress = {};

const paramsErr = {code:1000, message:"input params is null"};
const inputParamErr = {code:1001, message:"input receiveOrChange param is error, you must input 0 or 1"};
const childKeyErr = {code:1002, message:"input param childKey is null"};
const unknownType = {code:1003, message:"unknown type,please input once again"};

function getAddress (childKey) {
    if(!childKey){
       console.log("input param childKey is null");
       return childKeyErr;
    }
    return baddress.toBase58Check(bcrypto.hash160(childKey.publicKey), NETWORKS.bitcoin.pubKeyHash)
}

function bitcoinAddress(seed, receiveOrChange, number) {
    if(!seed || !receiveOrChange || !number) {
        console.log("input params seed, receiveOrChange and number is null");
        return paramsErr;
    }
    var rootMasterKey = bip32.fromSeed(seed);
    if(receiveOrChange === '0') {
        var childKey = rootMasterKey.derivePath("m/44'/0'/0'/0/" + number + "")
    } else if(receiveOrChange === '1') {
        var childKey = rootMasterKey.derivePath("m/44'/0'/0'/1/" + number + "")
    } else {
        console.log("input receiveOrChange param is error, you must input 0 or 1");
        return inputParamErr;
    }
    var btcData = {coinMark:"BTC", privateKey:childKey.toWIF().toString('hex'), address:getAddress(childKey)};
    return btcData;
}

function ethreumAddress(seed, number) {
    if(!seed || !number) {
        console.log("input param seed and number is null")
        return paramsErr;
    }
    var rootMasterKey = hdkey.fromMasterSeed(seed);
    var childKey = rootMasterKey.derivePath("m/44'/60'/0'/0/" +  number + "");
    var address = util.pubToAddress(childKey._hdkey._publicKey, true).toString('hex');
    var privateKey = childKey._hdkey._privateKey.toString('hex');
    var ethData = {coinMark:"ETH", privateKey:privateKey, address:"0x" + address}
    return ethData;
}

function erc20Address(seed, bipNumber, number, coinMark) {
    if(!seed || !number) {
        console.log("input param seed, coinNumber and number is null")
        return paramsErr;
    }
    var rootMasterKey = hdkey.fromMasterSeed(seed);
    var childKey = rootMasterKey.derivePath("m/44'/" + bipNumber + "'/0'/0/" +  number + "");
    var address = util.pubToAddress(childKey._hdkey._publicKey, true).toString('hex');
    var privateKey = childKey._hdkey._privateKey.toString('hex');
    var erc20Data = {coinMark:coinMark, privateKey:privateKey, address:"0x" + address}
    return erc20Data;
}

libGenerateAddress.blockchainAddress = function (addressParmas) {
    if(!addressParmas) {
        console.log("input param addressParmas is null")
        return paramsErr;
    }
    switch (addressParmas.coinType) {
        case 'BTC':
            return bitcoinAddress(addressParmas.seed, addressParmas.receiveOrChange, addressParmas.number);
        case 'ETH':
            return ethreumAddress(addressParmas.seed, addressParmas.number);
        case 'ERC20':
            return erc20Address(addressParmas.seed, addressParmas.bipNumber, addressParmas.number, addressParmas.coinMark);
        default:
            console.log("unknown type");
            return unknownType;
    }
};

libGenerateAddress.multiERC20AddressGenerate = function(ERC20AddressParam) {
    if(!ERC20AddressParam) {
        console.log("input param ERC20AddressParam is null");
        return paramsErr;
    }
    var outData = [];
    for(var i = 0; i < ERC20AddressParam.erc20.length; i++) {
        var e20Address = erc20Address(ERC20AddressParam.seed, ERC20AddressParam.erc20[i].bipNumber, ERC20AddressParam.erc20[i].number, ERC20AddressParam.erc20[i].coinMark);
        outData = outData.concat(e20Address);
    }
    return outData;
};

module.exports = libGenerateAddress;

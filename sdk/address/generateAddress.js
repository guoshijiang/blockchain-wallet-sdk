const bitcoin  = require('bitcoinjs-lib');
const baddress = require('bitcoinjs-lib/src/address');
const bcrypto  = require('bitcoinjs-lib/src/crypto');
const NETWORKS = require('bitcoinjs-lib/src/networks');
const hdkey = require('ethereumjs-wallet/hdkey');
const util = require('ethereumjs-util');
const bip32  = require( 'bip32');
const constant = require('../constant');
const irisnet = require('irisnet-crypto');
const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI();

var libGenerateAddress = {};

/**
 * @param childKey
 * @returns {*}
 */
function getAddress (childKey) {
    if(!childKey){
       console.log("input param childKey is null");
       return constant.childKeyErr;
    }
    return baddress.toBase58Check(bcrypto.hash160(childKey.publicKey), NETWORKS.bitcoin.pubKeyHash)
}

/**
 * @param seed
 * @param receiveOrChange
 * @param number
 * @returns {*}
 */
function bitcoinAddress(seed, receiveOrChange, number) {
    if(!seed && !receiveOrChange && !number) {
        console.log("input params seed, receiveOrChange and number is null");
        return constant.paramsErr;
    }
    var rootMasterKey = bip32.fromSeed(seed);
    if(receiveOrChange === '0') {
        var childKey = rootMasterKey.derivePath("m/44'/0'/0'/0/" + number + "")
    } else if(receiveOrChange === '1') {
        var childKey = rootMasterKey.derivePath("m/44'/0'/0'/1/" + number + "")
    } else {
        console.log("input receiveOrChange param is error, you must input 0 or 1");
        return constant.inputParamErr;
    }
    var btcData = {coinMark:"BTC", privateKey:childKey.toWIF().toString('hex'), address:getAddress(childKey)};
    return btcData;
}

/**
 * @param seed
 * @param number
 * @returns {*}
 */
function ethreumAddress(seed, number) {
    if(!seed && !number) {
        console.log("input param seed and number is null")
        return constant.paramsErr;
    }
    var rootMasterKey = hdkey.fromMasterSeed(seed);
    var childKey = rootMasterKey.derivePath("m/44'/60'/0'/0/" +  number + "");
    var address = util.pubToAddress(childKey._hdkey._publicKey, true).toString('hex');
    var privateKey = childKey._hdkey._privateKey.toString('hex');
    var ethData = {coinMark:"ETH", privateKey:privateKey, address:"0x" + address}
    return ethData;
}

/**
 * @param seed
 * @param bipNumber
 * @param number
 * @param coinMark
 * @returns {*}
 */
function erc20Address(seed, bipNumber, number, coinMark) {
    if(!seed && !number) {
        console.log("input param seed, coinNumber and number is null")
        return constant.paramsErr;
    }
    var rootMasterKey = hdkey.fromMasterSeed(seed);
    var childKey = rootMasterKey.derivePath("m/44'/" + bipNumber + "'/0'/0/" +  number + "");
    var address = util.pubToAddress(childKey._hdkey._publicKey, true).toString('hex');
    var privateKey = childKey._hdkey._privateKey.toString('hex');
    var erc20Data = {coinMark:coinMark, privateKey:privateKey, address:"0x" + address}
    return erc20Data;
}

function cosmosAddress(coinType){
    if(!coinType) {
        console.log("input param seed and number is null")
        return constant.paramsErr;
    }
    let crypto = irisnet.getCrypto(coinType);
    let account = crypto.create('english');
    return account;
}

function xrpAddress (coinType) {
    if(!coinType) {
        console.log("input param seed and number is null")
        return constant.paramsErr;
    }
    const RipAccount = api.generateAddress();
    let address = RipAccount.address;
    let secret = RipAccount.secret;
    let xrpData = {address:address, secret:secret};
    return xrpData
}

/**
 * @param addressParmas
 * @returns {*}
 */
libGenerateAddress.blockchainAddress = function (addressParmas) {
    if(!addressParmas) {
        console.log("input param addressParmas is null")
        return constant.paramsErr;
    }
    switch (addressParmas.coinType) {
        case 'BTC':
            return bitcoinAddress(addressParmas.seed, addressParmas.receiveOrChange, addressParmas.number);
        case 'ETH':
            return ethreumAddress(addressParmas.seed, addressParmas.number);
        case 'ERC20':
            return erc20Address(addressParmas.seed, addressParmas.bipNumber, addressParmas.number, addressParmas.coinMark);
        case 'OMNI':
            return bitcoinAddress(addressParmas.seed, addressParmas.receiveOrChange, addressParmas.number);
        case 'COSMOS':
            return cosmosAddress('cosmos');
        case 'IRIS':
            return cosmosAddress('iris');
        case 'XRP':
            return xrpAddress('xrp');
        default:
            console.log("unknown type");
            return constant.unknownType;
    }
};

/**
 * @param ERC20AddressParam
 * @returns {*}
 */
libGenerateAddress.multiERC20AddressGenerate = function(ERC20AddressParam) {
    if(!ERC20AddressParam) {
        console.log("input param ERC20AddressParam is null");
        return constant.paramsErr;
    }
    var outData = [];
    for(var i = 0; i < ERC20AddressParam.erc20.length; i++) {
        var e20Address = erc20Address(ERC20AddressParam.seed, ERC20AddressParam.erc20[i].bipNumber, ERC20AddressParam.erc20[i].number, ERC20AddressParam.erc20[i].coinMark);
        outData = outData.concat(e20Address);
    }
    return outData;
};

module.exports = libGenerateAddress;

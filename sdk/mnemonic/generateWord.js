const bip39  = require('bip39');
const bip32  = require( 'bip32');

var libGenerateHelpWord = {};


const paramsErr = {code:1000, message:"input params is null"};
const noWord = {code:1001, message:"don't support this case"};
const noSupport = {code:1002, message:"Temporarily does not support the situation you want"}

/**
 * @param number: the number of mnemonic
 * @param language: mnemonic language
 */
libGenerateHelpWord.createHelpWord = function (number, language) {
    if(!number || !language) {
        console.log("params number and language is null");
        return paramsErr;
    }
    switch (language) {
        case 'chinese_simplified':
            if(number === 12) {
                return bip39.generateMnemonic(128, null, bip39.wordlists.chinese_simplified);
            } else if(number === 15) {
                return bip39.generateMnemonic(160, null, bip39.wordlists.chinese_simplified);
            } else if(number === 18) {
                return bip39.generateMnemonic(192, null, bip39.wordlists.chinese_simplified);
            } else if(number === 21) {
                return bip39.generateMnemonic(224, null, bip39.wordlists.chinese_simplified);
            } else if(number === 24) {
                return bip39.generateMnemonic(256, null, bip39.wordlists.chinese_simplified);
            } else {
                console.log("don't support this case")
                return noWord;
            }
        case 'chinese_traditional':
            if(number === 12) {
                return bip39.generateMnemonic(128, null, bip39.wordlists.chinese_traditional);
            } else if(number === 15) {
                return bip39.generateMnemonic(160, null, bip39.wordlists.chinese_traditional);
            } else if(number === 18) {
                return bip39.generateMnemonic(192, null, bip39.wordlists.chinese_traditional);
            } else if(number === 21) {
                return bip39.generateMnemonic(224, null, bip39.wordlists.chinese_traditional);
            } else if(number === 24) {
                return bip39.generateMnemonic(256, null, bip39.wordlists.chinese_traditional);
            } else {
                console.log("don't support this case")
                return noWord;
            }
        case 'english':
            if(number === 12) {
                return bip39.generateMnemonic(128, null, bip39.wordlists.english);
            } else if(number === 15) {
                return bip39.generateMnemonic(160, null, bip39.wordlists.english);
            } else if(number === 18) {
                return bip39.generateMnemonic(192, null, bip39.wordlists.english);
            } else if(number === 21) {
                return bip39.generateMnemonic(224, null, bip39.wordlists.english);
            } else if(number === 24) {
                return bip39.generateMnemonic(256, null, bip39.wordlists.english);
            } else {
                console.log("don't support this case")
                return noWord;
            }
        case 'french':
            if(number === 12) {
                return bip39.generateMnemonic(128, null, bip39.wordlists.french);
            } else if(number === 15) {
                return bip39.generateMnemonic(160, null, bip39.wordlists.french);
            } else if(number === 18) {
                return bip39.generateMnemonic(192, null, bip39.wordlists.french);
            } else if(number === 21) {
                return bip39.generateMnemonic(224, null, bip39.wordlists.french);
            } else if(number === 24) {
                return bip39.generateMnemonic(256, null, bip39.wordlists.french);
            } else {
                console.log("don't support this case")
                return noWord;
            }
        case 'italian':
            if(number === 12) {
                return bip39.generateMnemonic(128, null, bip39.wordlists.italian);
            } else if(number === 15) {
                return bip39.generateMnemonic(160, null, bip39.wordlists.italian);
            } else if(number === 18) {
                return bip39.generateMnemonic(192, null, bip39.wordlists.italian);
            } else if(number === 21) {
                return bip39.generateMnemonic(224, null, bip39.wordlists.italian);
            } else if(number === 24) {
                return bip39.generateMnemonic(256, null, bip39.wordlists.italian);
            } else {
                console.log("don't support this case")
                return noWord;
            }
        case 'japanese':
            if(number === 12) {
                return bip39.generateMnemonic(128, null, bip39.wordlists.japanese);
            } else if(number === 15) {
                return bip39.generateMnemonic(160, null, bip39.wordlists.japanese);
            } else if(number === 18) {
                return bip39.generateMnemonic(192, null, bip39.wordlists.japanese);
            } else if(number === 21) {
                return bip39.generateMnemonic(224, null, bip39.wordlists.japanese);
            } else if(number === 24) {
                return bip39.generateMnemonic(256, null, bip39.wordlists.japanese);
            } else {
                console.log("don't support this case")
                return noWord;
            }
        case 'korean':
            if(number === 12) {
                return bip39.generateMnemonic(128, null, bip39.wordlists.korean);
            } else if(number === 15) {
                return bip39.generateMnemonic(160, null, bip39.wordlists.korean);
            } else if(number === 18) {
                return bip39.generateMnemonic(192, null, bip39.wordlists.korean);
            } else if(number === 21) {
                return bip39.generateMnemonic(224, null, bip39.wordlists.korean);
            } else if(number === 24) {
                return bip39.generateMnemonic(256, null, bip39.wordlists.korean);
            } else {
                console.log("don't support this case")
                return noWord;
            }
        case 'spanish':
            if(number === 12) {
                return bip39.generateMnemonic(128, null, bip39.wordlists.spanish);
            } else if(number === 15) {
                return bip39.generateMnemonic(160, null, bip39.wordlists.spanish);
            } else if(number === 18) {
                return bip39.generateMnemonic(192, null, bip39.wordlists.spanish);
            } else if(number === 21) {
                return bip39.generateMnemonic(224, null, bip39.wordlists.spanish);
            } else if(number === 24) {
                return bip39.generateMnemonic(256, null, bip39.wordlists.spanish);
            } else {
                console.log("don't support this case")
                return noWord;
            }
        default:
            console.log("Temporarily does not support the situation you want");
            return noSupport;
    }
};

libGenerateHelpWord.wordsToEntropy = function(mnemonic, language) {
    if(!mnemonic || !language) {
        console.log("param mnemonic and language is null");
        return paramsErr;
    }
    switch (language) {
        case 'chinese_simplified':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.chinese_simplified);
        case 'chinese_traditional':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.chinese_traditional);
        case 'english':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.english);
        case 'french':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.french);
        case 'italian':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.italian);
        case 'japanese':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.japanese);
        case 'korean':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.korean);
        case 'spanish':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.spanish);
        default:
            console.log("Temporarily does not support the situation you want");
            return noSupport;
    }
};

libGenerateHelpWord.entropyToWords = function(encrytMnemonic, language) {
    if(!encrytMnemonic || !language) {
        console.log("param encrytMnemonic and language is null");
        return paramsErr;
    }
    switch (language) {
        case 'chinese_simplified':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.chinese_simplified);
        case 'chinese_traditional':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.chinese_traditional);
        case 'english':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.english);
        case 'french':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.french);
        case 'italian':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.italian);
        case 'japanese':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.japanese);
        case 'korean':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.korean);
        case 'spanish':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.spanish);
        default:
            console.log("Temporarily does not support the situation you want");
            return noSupport;
    }
};

libGenerateHelpWord.mnemonicToSeed = function(mnemonic, password){
    if(!mnemonic ) {
        console.log("param mnemonic and password is null");
        return paramsErr;
    }
    return bip39.mnemonicToSeed(mnemonic, password)
};

libGenerateHelpWord.mnemonicToSeedHex = function(mnemonic, password){
    if(!mnemonic || !password) {
        console.log("param mnemonic and password is null");
        return paramsErr;
    }
    return bip39.mnemonicToSeedHex(mnemonic, password);
};

libGenerateHelpWord.validateMnemonic = function (mnemonic, language) {
    if(!mnemonic || !language) {
        console.log("param mnemonic and language is null");
        return paramsErr;
    }
    switch (language) {
        case 'chinese_simplified':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.chinese_simplified);
        case 'chinese_traditional':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.chinese_traditional);
        case 'english':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.english);
        case 'french':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.french);
        case 'italian':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.italian);
        case 'japanese':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.japanese);
        case 'korean':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.korean);
        case 'spanish':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.spanish);
        default:
            console.log("Temporarily does not support the situation you want");
            return noSupport;
    }
};

module.exports = libGenerateHelpWord;



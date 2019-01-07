const keythereum = require("keythereum");
const fs = require('fs');
const constant = require('../constant');


var libKeystore = {};

/**
 * @param password
 * @returns {*}
 */
libKeystore.createKeystore = function (password) {
    if(!password) {
        return constant.paramsErr;
    }
    var keystore = '';
    var params = { keyBytes: 32, ivBytes: 16 };
    var dk = keythereum.create(params);
    var kdf = "pbkdf2";
    var options = {
        kdf: "pbkdf2",
        cipher: "aes-128-ctr",
        kdfparams: {
            c: 262144,
            dklen: 32,
            prf: "hmac-sha256"
        }
    };
    var dk = keythereum.create(params)
    if (!dk) {
        return constant.createDkErr;
    }
    keystore = keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, options);
    if(!keystore) {
        return constant.createKeystoreErr;
    }
    return keystore;
}

/**
 * @param keyObject
 * @param path if your path is null, export keystore by default way; if path has value, export keystore by your way
 * @returns {{code: number, message: string}}
 */
libKeystore.exportKeystore = function(keyObject, path) {
    if(!keyObject) {
        return constant.paramsErr;
    }
    if(!path){
        keythereum.exportToFile(keyObject);
    } else {
        var json = JSON.stringify(keyObject);
        var outfile = keythereum.generateKeystoreFilename(keyObject.address);
        var outpath = path + "/" + outfile;
        console.log(outpath);
        fs.writeFile(outpath, json, function (err) {
            if (err) {
                return err;
            } else{
                outpath;
            }
        });
    }
}

/**
 * @param address
 * @param datadir
 * @returns {*}
 */
libKeystore.importKeystore = function(address, datadir) {
    if(!address && !datadir) {
        return constant.paramsErr;
    }
    return keythereum.importFromFile(address, datadir);
}

/**
 * @param keyObject
 * @param password
 * @returns {*}
 */
libKeystore.exportPrivateKey = function(keyObject, password) {
    if(!keyObject && !password) {
        return constant.paramsErr;
    }
    return keythereum.recover(password, keyObject);
}

/**
 * @param privateKey
 * @param password
 * @returns {*}
 */
libKeystore.importPrivateKey = function(privateKey ,password) {
    if(!password && !privateKey) {
        return constant.paramsErr;
    }
    var keystore = '';
    var params = { keyBytes: 32, ivBytes: 16 };
    var dk = keythereum.create(params);
    var kdf = "pbkdf2";
    var options = {
        kdf: "pbkdf2",
        cipher: "aes-128-ctr",
        kdfparams: {
            c: 262144,
            dklen: 32,
            prf: "hmac-sha256"
        }
    };
    var dk = keythereum.create(params)
    if (!dk) {
        return constant.createDkErr;
    }
    keystore = keythereum.dump(password, privateKey, dk.salt, dk.iv, options);
    if(!keystore) {
        return constant.createKeystoreErr;
    }
    return keystore;
}

module.exports = libKeystore;



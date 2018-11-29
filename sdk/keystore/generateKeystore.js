const keythereum = require("keythereum");
const fs = require('fs');

var libKeystore = {};

const paramsErr = {code:1000, message:"input params is null"};
const createDkErr = {code:1001, message:"create dk error"};
const createKeystoreErr = {code:1002, message:"create keystore fail"};

/**
 * @param password
 * @returns {*}
 */
libKeystore.createKeystore = function (password) {
    if(!password) {
        return paramsErr;
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
        return createDkErr;
    }
    keystore = keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, options);
    if(!keystore) {
        return createKeystoreErr;
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
        return paramsErr;
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
    if(!address || !datadir) {
        return paramsErr;
    }
    return keythereum.importFromFile(address, datadir);
}

/**
 * @param keyObject
 * @param password
 * @returns {*}
 */
libKeystore.exportPrivateKey = function(keyObject, password) {
    if(!keyObject || !password) {
        return paramsErr;
    }
    return keythereum.recover(password, keyObject);
}

/**
 * @param privateKey
 * @param password
 * @returns {*}
 */
libKeystore.importPrivateKey = function(privateKey ,password) {
    if(!password || !privateKey) {
        return paramsErr;
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
        return createDkErr;
    }
    keystore = keythereum.dump(password, privateKey, dk.salt, dk.iv, options);
    if(!keystore) {
        return createKeystoreErr;
    }
    return keystore;
}

module.exports = libKeystore;



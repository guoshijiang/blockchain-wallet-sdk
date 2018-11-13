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
 * @param path (if your path is null, export keystore by default way; if path has value, export keystore by your way)
 * @returns {{code: number, message: string}}
 */
libKeystore.exportKeystore = function(keyObject, path) {
    if(!keyObject) {
        return paramsErr;
    }
    if(!path){
        keythereum.exportToFile(keyObject);
    } else {
        fs.writeFile(path + '/'+ 'privateKeyOrKeystore.ert', keyObject, {flag:'w',encoding:'utf-8',mode:'0666'}, function(err) {
            if (err) {
                console.log("write private key to file fail")

            } else {
                console.log("write private key to file success");
            }
        })
    }
}

libKeystore.importKeystore = function() {

}

libKeystore.exportPrivateKey = function() {

}

libKeystore.importPrivateKey = function() {

}

module.exports = libKeystore;



var keythereum = require("../sdk/keystore/generateKeystore");


var password = "211212";
keythereum.exportKeystore(keythereum.createKeystore(password), "./")

var mnemonicS = require("../sdk/mnemonic/generateWord");
var address = require("../sdk/address/generateAddress");

var addressParmas = {
    "coinType":"XRP",
}

var addr = address.blockchainAddress(addressParmas);
console.log(addr);

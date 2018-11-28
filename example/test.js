var mnemonicS = require("../sdk/mnemonic/generateWord");
var address = require("../sdk/address/generateAddress");

var mnemonic= mnemonicS.createHelpWord(12, 'english');
var seed = mnemonicS.mnemonicToSeed(mnemonic);
var addressParmas = {
    "seed":seed,
    "coinType":"ERC20",
    "number":"0",
    "bipNumber":"518",
    "receiveOrChange":"1",
    "coinMark":"LET"
}

var addr = address.blockchainAddress(addressParmas);
console.log(addr);

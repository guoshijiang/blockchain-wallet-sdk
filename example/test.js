var test = require("../sdk/mnemonic/generateWord");
var testAddress = require("../sdk/address/generateAddress");

var words = test.createHelpWord(12, 'english');
console.log(words)

var seed = test.mnemonicToSeed(words);
console.log(seed)

var addressParmas = {
    "seed":seed,
    "coinType":"ERC20",
    "number":"12",
    "bipNumber":"0",
    "receiveOrChange":"1",
    "coinMark":"LET"
}

var addr = testAddress.blockchainAddress(addressParmas);
console.log(addr);


var ERC20AddressParam = {
    "seed":seed,
    "erc20":[
        {
            "coinMark":"LET",
            "bipNumber":"618",
            "number":"0"
        },{
            "coinMark":"SSP",
            "bipNumber":"518",
            "number":"0"
        },{
            "coinMark":"Kcash",
            "bipNumber":"128",
            "number":"0"
        }
    ]
}

var addre= testAddress.multiERC20AddressGenerate(ERC20AddressParam);
console.log(addre);

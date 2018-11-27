var testWord = require("../sdk/mnemonic/generateWord");

var words = testWord.createHelpWord(12, 'chinese_simplified');
console.log(words)
var wordsEntropy = testWord.wordsToEntropy(words, 'chinese_simplified');
console.log(wordsEntropy);
var wd = testWord.entropyToWords(wordsEntropy, 'chinese_simplified');
console.log(wd);

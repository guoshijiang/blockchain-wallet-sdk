# blockchain-wallet-sdk

区块链钱包Node SDK，包含助记词生成，所有数字货币的地址私钥生成，私钥管理，交易签名，发起转账，转账确认等内容

## 一.助记词

目前支持生成12,15,18,21,24个不同语言的助记词，支持的语言有中文简体，中文繁体，英语，法语，日语，意大利语，韩语和西班牙语。库中也提供助记词的编解码和随机数种子的生成。

### 1.助记词生成

* 使用该库前需要先引入库

      var testWord = require("../sdk/mnemonic/generateWord");

下面简单地写几个案例

#### 1.1.生成12个中文简体助记词

    var chinese_simplified = testWord.createHelpWord(12, 'chinese_simplified');
    
    侧 钟 毕 蓝 祝 牢 炭 旬 岛 锦 裁 萧
    
#### 1.2.生成15个中文繁体助记词

    var words = testWord.createHelpWord(15, 'chinese_traditional');
    
    晚 錢 破 性 及 普 木 迷 矛 而 肅 揭 聖 擠 言
    
#### 1.3.生成18个日文助记词

    var words = testWord.createHelpWord(18, 'japanese');

    かくとく　たもつ　けっせき　ちたい　こんわく　ぐっすり　しちょう　たいふう　まける　しほん　にんそう　てくび　さつまいも　ちつじょ　だいじょうぶ　ひっこし　てんらんかい　むかい
    
*注：您要生成多少个助记词，您就传入数字几（目前支持：12,15,18,21,24）；后面一个传入相应的语言，目前可以传入的语言有：chinese_simplified（中文简体）；chinese_traditional（中文繁体）；english（英语）；french（法语）；italian（意大利语）；japanese（日语）；korean（韩语）；spanish（西班牙语）。

### 2.助记词编解码

    // 生成助记词
    var words = testWord.createHelpWord(18, 'japanese');
    console.log(words)
    
    // 助词编码
    var wordsEntropy = testWord.wordsToEntropy(words, 'japanese');
    console.log(wordsEntropy);
    
    // 助记词解码
    var wd = testWord.entropyToWords(wordsEntropy, 'japanese');
    console.log(wd);


### 4.验证助记词

    var bool = testWord.validateMnemonic(words, 'japanese');
    console.log(bool)  // 返回true表示验证成功
    
    

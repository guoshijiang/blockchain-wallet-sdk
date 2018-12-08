# blockchain-wallet-sdk

区块链钱包Node SDK，包含助记词生成，所有数字货币的地址私钥生成，私钥管理，交易签名等内容

## 一.助记词

目前支持生成12,15,18,21,24个不同语言的助记词，支持的语言有中文简体，中文繁体，英语，法语，日语，意大利语，韩语和西班牙语。库中也提供助记词的编解码和随机数种子的生成。

### 1.助记词生成
使用该库前需要先引入库

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

### 3.验证助记词

    var bool = testWord.validateMnemonic(words, 'japanese');
    console.log(bool)  // 返回true表示验证成功
    
## 二.生成地址
目前该库支持以太坊，ERC20和比特币地址和私钥生成

### 1.生成BTC地址
下面代码是生成比特地址的代码

    var mnemonicS = require("../sdk/mnemonic/generateWord");
    var address = require("../sdk/address/generateAddress");

    var mnemonic= mnemonicS.createHelpWord(12, 'english');
    var seed = mnemonicS.mnemonicToSeed(mnemonic);
    var addressParmas = {
        "seed":seed,
        "coinType":"BTC",
        "number":"12",
        "bipNumber":"0",
        "receiveOrChange":"1",
        "coinMark":"BTC"
    }

    var addr = address.blockchainAddress(addressParmas);
    console.log(addr);
  
下面是生成效果：

    { 
      coinMark: 'BTC',
      privateKey: 'L3LK2uQQZCj7x7SzGSyRbiP8RwrYpGFPw7qbjuMKNfz83edmMJG3',
      address: '1AtMVGqbVSZDc4p5H414Q8zKqXMoYv7zxs' 
    }
    
上述代码中参数seed是随机数种子，这里需要传入的是一个Buffer流；coinType是要生成地址的币的类别，目前支持三种传参方式：BTC，ETH和ERC20;number是要生成第几个地址，0默认是第一个；bipNumber是该要生成地址的币在BIP44协议中的规范数字；receiveOrChange是比特币地址生成专用参数，0代表普通地址，1代表找零地址；coinMark是币的标识，例如bitcoin的标识是BTC，ethereum的标识是ETH。

### 2.生成以太坊地址
下面是生成以太坊地址的代码，参数如上

    var mnemonicS = require("../sdk/mnemonic/generateWord");
    var address = require("../sdk/address/generateAddress");

    var mnemonic= mnemonicS.createHelpWord(12, 'english');
    var seed = mnemonicS.mnemonicToSeed(mnemonic);
    var addressParmas = {
        "seed":seed,
        "coinType":"ETH",
        "number":"0",
        "bipNumber":"60",
        "receiveOrChange":"1",
        "coinMark":"ETH"
    }

    var addr = address.blockchainAddress(addressParmas);
    console.log(addr);
  
生成效果

    { 
          coinMark: 'ETH',
          privateKey: '612c02325cbf84cd4ad3dac8ae107e2bf37f98834b23f6f6208547f1a179d852',
          address: '0x947ee95a84f9bdf00dbc600961a737cb92fca5f4' 
    }
    
仔细观看不难看出，上面地址生成中，主要是参数改变了

### 3.生成单个ERC20地址
下面是生成ERC20地址的代码，参数如上

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
    
也只是传入参数发生变化

生成效果：

    { 
          coinMark: 'LET',
          privateKey: '0bdf145ae58a71c0da7fc3cf5510de5909d1314722f8d90c6b9ee543e431f1c7',
          address: '0x7d0c60a5ef87ed7f43fcad648911327c1f474623' 
    }
  
### 4.批量生成ERC20地址

    var mnemonicS = require("../sdk/mnemonic/generateWord");
    var address = require("../sdk/address/generateAddress");

    var mnemonic= mnemonicS.createHelpWord(12, 'english');
    var seed = mnemonicS.mnemonicToSeed(mnemonic);

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

    var addre= address.multiERC20AddressGenerate(ERC20AddressParam);
    console.log(addre);
  
如下是生成的效果

    [ 
          {
                coinMark: 'LET',
                privateKey: '164a6167e4c50e24ad6a74fd1cab6521e3a1472a70d67c88146a1952b7fb5092',
                address: '0x3a960d90b219ea4b9d3f5827ea6fba5bf40d391f' 
         },
         { 
                coinMark: 'SSP',
                privateKey: 'f8f766b246289f325e32cb28462096ade51f89b720dc6b064168baef2e6c9ac4',
                address: '0x8f5589faf64374788d1c8f3b1744bad1627ec565'
         },
         { 
                coinMark: 'Kcash',
                privateKey: '9bf8d4b890b391736cec94220d5d41d0c8a2b9555a5385316eecbeb89ce37d61',
                address: '0x910b0d94dd1f0f173f41e5ed0a2ddefeea6b4130' 
        } 
    ]
    
## 三.以太坊Keystore

### 1.生成Keystore
生成keystore的只需要传入密码，将自动生成keystore,下面函数中只需要传入一个参数，那就密码。“123456”就是传入的密码。

    var testKeystore = require("../sdk/keystore/generateKeystore");
    var keystore = testKeystore.createKeystore("123456");
    console.log(keystore);


    { 
          address: '531fe5d8be925ceba9bfce0c305d93fc6deb862b',
          crypto:
          { 
                cipher: 'aes-128-ctr',
                ciphertext: '3cf8ba317042815338f7397d80a53cf84cc7861c9ce70ed26fd23b2fdab9efc',
                cipherparams: { iv: '82c3b2d97f65ff974563bd14d5edaf4f' },
                mac: '67b2960dd73cd4f35d375a4c8c0898fc6f6cd9b7190dafb1c14aa724179a1e06',
                kdf: 'pbkdf2',
                kdfparams:
                { 
                      c: 262144,
                      dklen: 32,
                      prf: 'hmac-sha256',
                      salt: 'cb7a82cba06330ffe0ad2fea7124034d53f5db559e30e7752f9562dab8caa39c
                 } 
           },
          id: 'a101bdc9-54d6-44a9-b787-587c92fbc680',
          version: 3
    }
  
### 2.导出keystore
exportKeystore是导出Keystore的函数，需要传入的参数是密码和路径，返回keystore的值

    var testKeystore = require("../sdk/keystore/generateKeystore");

    var keystore = testKeystore.createKeystore("123456");
    console.log(keystore);
    testKeystore.exportKeystore(keystore, "./");
  
在你指定的目录下会生成相应的keystore文件

    UTC--2018-11-29T07-30-06.805Z--2fecb0dd3718453b51d7f42db6e9c60b2c82cfa9
    
### 3.导入keystore
    var keystore = testKeystore.importKeystore("531fe5d8be925ceba9bfce0c305d93fc6deb862b", "./");
    console.log(keystore);

    { 
          address: '531fe5d8be925ceba9bfce0c305d93fc6deb862b',
          crypto:
          { 
                cipher: 'aes-128-ctr',
                ciphertext: '3cf8ba317042815338f7397d80a53cf84cc7861c9ce70ed26fd23b2fdab9efc',
                cipherparams: { iv: '82c3b2d97f65ff974563bd14d5edaf4f' },
                mac: '67b2960dd73cd4f35d375a4c8c0898fc6f6cd9b7190dafb1c14aa724179a1e06',
                kdf: 'pbkdf2',
                kdfparams:
                { 
                      c: 262144,
                      dklen: 32,
                      prf: 'hmac-sha256',
                      salt: 'cb7a82cba06330ffe0ad2fea7124034d53f5db559e30e7752f9562dab8caa39c
                 } 
           },
          id: 'a101bdc9-54d6-44a9-b787-587c92fbc680',
          version: 3
    }
  
### 4.导出私钥

    var privateKey = testKeystore.exportPrivateKey(keystore, "123456")
  
### 5.导入私钥

     var keystore = testKeystore.importPrivateKey("qeeqeqqeqwweq", "123456");
     console.log(keystore)

     { address: '805a06621171443bcf7d2bae9ac4c91539aef65f',
      crypto:
       { cipher: 'aes-128-ctr',
         ciphertext: 'f7c0ce4b3c83b9927ce75cbceb',
         cipherparams: { iv: '173ecf2cf4e34879175190a5a7b328cd' },
         mac: 'd8b829e98383cbc8eb69f090e765c085e0882006489c74837aa4bff69b7b62bc',
         kdf: 'pbkdf2',
         kdfparams:
          { c: 262144,
            dklen: 32,
            prf: 'hmac-sha256',
            salt: '85766bde5af062f631d62d16842d079e8a0a52a0555bfd94ce3f1b3c28fa839b'
     } },
      id: '70860efe-84f0-43c9-9d68-3f8f0262203b',
      version: 3 }
      
## 四.数字货币签名

### 1.比特币单笔转账签名

    const testBtcSign = require('../sdk/sign/bitcoinSign');

    var privateKey  = "L2CzLwNmNxVtV4RpgBMMRKPWhZmDeMofqxEqUjeRi8nQaVae5F51";
    var amount = "100000";
    var utxo = {
        "unspent_outputs":[
            {
                "tx_hash":"8ee886ba0c66ba2df2c0e3da3beee526996d9a5e6bbbdfea43e1a78340cb0128",
                "tx_hash_big_endian":"2801cb4083a7e143eadfbb6b5e9a6d9926e5ee3bdae3c0f22dba660cba86e88e",
                "tx_index":382253932,
                "tx_output_n": 0,
                "script":"76a914ca45c6eceea7aed14b6aea7e0ed466c6134f14bc88ac",
                "value": 1899000,
                "value_hex": "1cf9f8",
                "confirmations":2
            }
        ]
    };
    var sendFee = "100000";
    var toAddress = "12zEJohMNqSZLXH1Msxpw41ykkk3rxgx1s";
    var changeAddress = "12zEJohMNqSZLXH1Msxpw41ykkk3rxgx1s";

    var signValue = testBtcSign.btcSingleSign(privateKey, amount, utxo.unspent_outputs, sendFee, toAddress, changeAddress);
    console.log(signValue);
    
结果如下：

    01000000018ee886ba0c66ba2df2c0e3da3beee526996d9a5e6bbbdfea43e1a78340cb0128000000
    006a473044022002d03fbb44d012733de62bd34047c22ef988bd3c79134be63565a1a0e031bfbe02
    2067bddc7d9e5b70ff78abd2db2db499b3bd8ecb23b8bf9f7ecc670cc55b4d5818012103881a9743
    d7bbb3e3f1ec534960b433cff5f883eec1f1c29dfdaf3aff43c1d0feffffffff02a0860100000000
    001976a91415caf1976fc8334d4f2f071548d9cbace1a4517988acb8ec1900000000001976a91415
    caf1976fc8334d4f2f071548d9cbace1a4517988ac00000000
    
### 2.比特币多笔交易转账签名

    const testBtcSign = require('../sdk/sign/bitcoinSign');

    var sendInfo = {
        "privateKey":"KwHEU8DTrY2ekGuqE6EqMMrcFj6Kdb6gWF4k8SpUeV7vDfc9c5Fn",
        "changeAddress":"1KSX5wmrVax3LYaB4uKUxXzCRcv5SiLDq3",
        "sendFee":1000,
        "addressAmount":[
            {
                "toAddress":"12zEJohMNqSZLXH1Msxpw41ykkk3rxgx1s",
                "amount":10
            },{
                "toAddress":"1KSX5wmrVax3LYaB4uKUxXzCRcv5SiLDq3",
                "amount":10
            },{
                "toAddress":"12zEJohMNqSZLXH1Msxpw41ykkk3rxgx1s",
                "amount":10
            }
        ]
    }

    var bitUtxo = {
        "unspent_outputs":[
            {
                "tx_hash":"8ee886ba0c66ba2df2c0e3da3beee526996d9a5e6bbbdfea43e1a78340cb0128",
                "tx_hash_big_endian":"2801cb4083a7e143eadfbb6b5e9a6d9926e5ee3bdae3c0f22dba660cba86e88e",
                "tx_index":382253932,
                "tx_output_n": 0,
                "script":"76a914ca45c6eceea7aed14b6aea7e0ed466c6134f14bc88ac",
                "value": 1899000,
                "value_hex": "1cf9f8",
                "confirmations":2
            }
        ]
    };

    var utxo = bitUtxo.unspent_outputs;
    var signValue = testBtcSign.btcMultiSign(sendInfo, utxo);
    console.log(signValue);
结果：

    01000000018ee886ba0c66ba2df2c0e3da3beee526996d9a5e6bbbdfea43e1a78340cb0128000000
    006a47304402207bf66084ebbb91abc4fd4132b21a2d4d3b9c9d6535da1ff599ec0d323595ff2402
    200965c6afd1d0b673f71761a0d53f6d6dcb6b194b1064226ef440c3d460b327ee01210202184157
    40e8ae879fc6b6837e4ab6e8c44d452c62f7e0f7bceb37ae1b13e685ffffffff040a000000000000
    001976a91415caf1976fc8334d4f2f071548d9cbace1a4517988ac0a000000000000001976a914ca
    45c6eceea7aed14b6aea7e0ed466c6134f14bc88ac0a000000000000001976a91415caf1976fc833
    4d4f2f071548d9cbace1a4517988acf2f51c00000000001976a914ca45c6eceea7aed14b6aea7e0e
    d466c6134f14bc88ac00000000

### 3.以太坊单笔转账签名

    const testEthSign = require('../sdk/sign/ethereumSign');

    var privateKey = "a2506976294fc506f6969e8f914ae9371804b104163f07e8d0e96794d5b43189";
    var nonce = 78;
    var toAddress = "0xe558be4e90b2ac96ae5cad47dc39cd08316f2e57";
    var gasPrice = 9000000000;
    var gasLimit = 120000;
    var sendToBalance = 10;

    var signValue = testEthSign.ethereumSign(privateKey, nonce, toAddress, sendToBalance, gasPrice, gasLimit);
    console.log(signValue);
结果：

    0xf86d4e850218711a008301d4c094e558be4e90b2ac96ae5cad47dc39cd08316f2e57888ac72304
    89e80000801ca03dcd39cc88ce022914de6b8ec66915d14fe3273f342b67692bea5e338ce3c2dfa0
    16ecf3d329d4497baf538a36d7874ecc8aee7c537dca45e36fe0d7fc420da330
### 4.以太坊批量转账签名

    const testEthSign = require('../sdk/sign/ethereumSign');

    var sendData =
        {
            "signMark":"ETH",
            "privateKey":"a2506976294fc506f6969e8f914ae9371804b104163f07e8d0e96794d5b43189",
            "gasPrice":12000000000,
            "gasLimit":30000,
            "nonce":63,
            "signDta":[
                {
                    "toAddress":"0xe558be4e90b2ac96ae5cad47dc39cd08316f2e57",
                    "totalAmount":0.0001,
                },{
                    "toAddress":"0x69204ab30fa18fb6b5b9677e639cdaf8a7e9b587",
                    "totalAmount":0.0001,
                },{
                    "toAddress":"0x79faca516a4eae381ab0baa50f99629ee59ead89",
                    "totalAmount":0.0001,
                }
            ]
        }

    var signValue = testEthSign.ethereumMultiSign(sendData);
    console.log(signValue);
    
结果：

    { 
          signCoin: 'ETH',
          signDataArr:
          [ 
              '0xf86a3f8502cb41780082753094e558be4e90b2ac96ae5cad47dc39cd08316f2e57865af3107a4000801ca0520360d673c0988ad6771c702ebf360449a05f84cf97bb1feb60342e6dc50b81a078c4c3ab0026e49fa0ab3555888d26ca01813763a1c57e7f5ee2074790e4dee5',
         '0xf86a408502cb4178008275309469204ab30fa18fb6b5b9677e639cdaf8a7e9b587865af3107a4000801ba05ccc441eac845e2bcdc2889ddcae025e4040159aea441a795bb4cf359c1a4e73a03afdeda4978b3b032ead801de3ac4e114ea5940f761230075dc5765bba146f13',
          '0xf86a418502cb4178008275309479faca516a4eae381ab0baa50f99629ee59ead89865af3107a4000801ca04e586da8a2e8c8d606886572b82cefdf51402ad819f22aef52634e188b9355d6a0078214480d95f1a3a2cf62be2f0030c4c67cc9c598550ee0f174a1e22c244de9' 
        ] 
  }
### 5.ERC20单笔转账签名

    const testERC20Sign = require('../sdk/sign/erc20Sign');

    var privateKey = "a2506976294fc506f6969e8f914ae9371804b104163f07e8d0e96794d5b43189";
    var nonce = 78;
    var currentAccount = "0xc6328b3a137b3be3f01c35ecda4ecda375be7fdf";
    var contractAddress = "0xfa3118b34522580c35ae27f6cf52da1dbb756288";
    var toAddress = "0xe558be4e90b2ac96ae5cad47dc39cd08316f2e57";
    var gasPrice = 9000000000;
    var gasLimit = 120000;
    var totalAmount = 10;
    var decimal = 6;

    var signValue = testERC20Sign.ethereumErc20CoinSign(privateKey, nonce, currentAccount, contractAddress, toAddress,  gasPrice,  gasLimit, totalAmount, decimal);
    console.log(signValue);
    
结果：

    0xf8aa4e850218711a008301d4c094fa3118b34522580c35ae27f6cf52da1dbb75628880b844a905
    9cbb000000000000000000000000e558be4e90b2ac96ae5cad47dc39cd08316f2e57000000000000
    00000000000000000000000000000000000000000000009896801ba07d9cd29d2af124c00714d604
    747c41dad42731d5c890dfade8217c6abba13899a064da50dce8079678a8eeaffb976957f1592332
    682f888e8d106db93d362bee93
    
### 4.ERC20批量转账签名

    const testERC20Sign = require('../sdk/sign/erc20Sign');

    var sendErc20Data =
        {
            "signMark":"ERC20",
            "privateKey":"a2506976294fc506f6969e8f914ae9371804b104163f07e8d0e96794d5b43189",
            "contractAddress":"0xfa3118b34522580c35ae27f6cf52da1dbb756288",
            "currentAccount":"0xc6328b3a137b3be3f01c35ecda4ecda375be7fdf",
            "gasPrice":9000000000,
            "gasLimit":90000,
            "nonce":81,
            "decimal":6,
            "signDta":[
                {
                    "toAddress":"0xe558be4e90b2ac96ae5cad47dc39cd08316f2e57",
                    "totalAmount":10
                },{
                    "toAddress":"0x69204ab30fa18fb6b5b9677e639cdaf8a7e9b587",
                    "totalAmount":10
                }
            ]
        }


    var signValue = testERC20Sign.MultiEthereumErc20CoinSign(sendErc20Data);
    console.log(signValue);
结果：

    { signCoin: 'ERC20',
      signDataArr:
       [ '0xf8aa51850218711a008301d4c094fa3118b34522580c35ae27f6cf52da1dbb75628880b8
    44a9059cbb000000000000000000000000e558be4e90b2ac96ae5cad47dc39cd08316f2e57000000
    00000000000000000000000000000000000000000000000000009896801ca0401192d543095f6b46
    08cfb64c682edb8598bdc10b8108c4229f774272ef1cdfa02f8ad180dcd8c5e99b45155444c72081
    fb2d101c42e73aa5ac4dc38778f671b2',
         '0xf8aa52850218711a008301d4c094fa3118b34522580c35ae27f6cf52da1dbb75628880b8
    44a9059cbb00000000000000000000000069204ab30fa18fb6b5b9677e639cdaf8a7e9b587000000
    00000000000000000000000000000000000000000000000000009896801ca0cf346f3a99a56adb66
    985be0d6fe5c08012542d96d96cf72eb89f7cf711667e5a06dd14c9c988b81eb7af5027514e20163
    67b89fd5bed9f619257ff3e816b9b62a' ] }
    
致谢：`bitcoinjs, ethereumjs`



# 以下附一则广告


## 有项目，来问我 

问我技术团队成立于2016年，是一支专门为有需求的人提供技术咨询和技术服务的团队。目前团队共有7名成员，分别为郭世江，苏镇，张迎春，吕方，徐世军，龙剑锋，吴哲。下面是团队中各成员的基本信息，目前团队完成的项目，团队的合作伙伴以及团队的联系方式。

### 团队简介
#### 郭世江
团队创始人，团队技术负责人，团队对外商务负责人；2016年毕业于黑龙江大学制药工程专业，2016年下半年进入中信银行，参与中信银行三方存管项目，中信银行B股，银衍项目的开发，主导中信银行保证证系统参数移置项目开发，独立设计开发华夏银行呼叫中心监控项目的中间转发层；2017年主导超球球场平台项目（包含从硬件底层到软件上层的一个大型项目）架构设计和开发；后来加入神州数字，区块链资深研究员，参与linkeye公链，linkeye征信链研发，主导linkeye钱包架构设计和开发，主导linkeye区块链浏览器项目的架构设计和开发；主导biwork项目的设计开发，主导设计开发家政服务超市后台和家政服务超市APP；在GitHub上著有《区块链钱包技术指南》一书，GitHub上译著《轻松玩转Docker》，GitHub上开源包含助记词生成，数字货币的地址私钥生成，私钥管理，交易签名等内容一套nodeJs区块链钱包开发库。

##### 参与的开源项目

###### linkeye区块链体系项：
https://github.com/linkeye

###### 个人github主页：
https://github.com/guoshijiang

###### 个人博客 
https://blog.csdn.net/jiang_xinxing

###### 个人公众号：
        
#### 苏镇

2016年毕业于黑龙江大学，多年的互联网从业经验，高级项目经理兼高级前端开发工程师。现为北京日升昌记有限责任公司的项目主管，主导过多个项目的设计与开发，主要负责产品的前端设计与开发和项目管理。

#### 吕方

高级Java开发工程，资深大数据开发工程师，曾在西安华为任职，后进入北京睿动体育，参与超级球场平台的设计与开发，现任汽车之家高级开发工程师，参与汽车之家风控项目的设计与开发。主要负责大数据的设计和开发，微服务层的设计和开发。

#### 张迎春

高级C++/golang/python开发工程师，高级爬虫工程师，2015年毕业于中北大学，参与中信银行三方存管、中信银行B股、银衍项目的设计和开发，北京文安智能科技的高级C++开发，负责后台服务器的设计和开发，参与文安智能科技繁星高密度视频分析集群项目的开发，在团队中主要负责数据抓取服务的设计与开发，项目的测试方案设计与执行。

#### 徐世军

高级项目经理，高级PHP开发工程师，主导迪安体检项目的设计与开发。团队搜米域名网站负责人，西南家政APP后台架构。精通PHP，ThinkPHP，YII，尤其擅长微信小程序开发。主要负责微信端的业务设计与开发。

#### 龙剑锋

高级前端开发工程师，5年的前端开发经验，精通H5、C3、JS、Node，Vue、React和electron等前端技术

#### 吴泽华

UI设计师，视觉交互设计师，拥有多年的互联网公司工作经验，超级球场项目，医宝网项目，协和医考通，医学人文和多伦多科技总设计师。


### 团队已完成的项目

#### 项目一：搜米域名网站

网站访问地址：www.soumi.com
 
项目介绍：搜米域名网站是为搜米网络（厦门）科技有限公司打造的一个域名信息平台，用户可以通过该网站查看自己喜欢的域名，留下自己的信息后，搜米公司的运营团队获取用户信息之后和用户联系。通过该平台，用户可以通过该平台检查域名是否被墙。当然，该平台也不只有这些功能，详情请进入网站查看。

#### 项目二.家政服务超市

app下载：
IOS版—appstore中可以直接下载 
Android版本—百度手机助手，安卓手机市场 

项目介绍：该项目是为贵州毕节家艺家政保洁服务有限公司打造的集家政，电商，招聘，培训为一体化的APP和网站平台，具体的详情可以下载app查看。


#### 项目三：某体检中心导引系统（Qt桌面应用）

该项目属于体检中心内部项目，没有任何公开的下载地址，在杭州和台州等多地体检中心已经上线该项目，该导引系统较简单，主要告知去体检的人已完成体检项目、未完成体检项目和各体检项目现有的排队人数。

#### 项目四：鑫汇云APP

下载地址：iOS—appstore 
安卓手机：应用宝，安卓市场等 

河北钢铁制造业生产销售一体化 以企业采购、销售、物流需求为中心，助力每家企业轻松实现互联网+，拥有企业自己的“交易+物流+大数据+管理平台”。打造一个全新的产业互联网平台，一种全新的工作方式。 

•采购：发布采购抢单，撮合竞价排名，报价动态查看，实时感知上游企业的价格行情 

•销售：精准复合报价，实时同步买家，掌握实时需求，动态同步下游企业的采购变化

•运输：实时指派物流，动态竞价排名，车辆实时同步，企业货物运输的一键调度派送 

•关系：通过加好友、生意圈、认证企业，可实时在线语音、文字、图片与企业实时沟通；

•财务：实时更新采购、销售、物流交易数据，系统分类统计历史交易、即时交易； 

•质检：实时上传质检报告，跟踪货物流向，实现产品质量朔源；

•优化：通过交易数据、交易频率、交易周期，分析用户撮合习惯和产品使用反馈，优化交易结果

•决策：让云计算依靠交易公式、数据模型，让交易决策变成一秒；

•效率：让原有的工作流程互联网化，大幅降低企业运营成本，全面提升升作效率；

•分享：随时随地发生的采购、销售、物流需求，随即导入电子名片，实时动态分向全世界 

•动态：实时掌控企业员工动态、每一笔新发生的采购、销售、物流交易事件、交易进度；

•管理：实现对集团所有供应商、采购商的管理分配，以及实时变更重要岗位的人员替换。


#### 项目五：智能护腿板上位机测试软件（Qt桌面应用）

智能护腿板上位机测试软件是团队为其他公司专门打造的护腿板测试桌面软件，桌面程序和软件之间使用的是串口通信机制，软件和智能终端之间的通信方式是TCP和UDP Socket通信。该软件提供了串口配置功能，录入ID功能，数据发送频率录入功能，通信数据对比功能和心率数据测试功能。ID有一套单独的标签算法，该算法由团队总工郭世江设计。

#### 项⽬六：智能终端上位机测试软件（Qt桌面应用）

智能终端上位机软件是团队专为体育公司打造的桌面测试软件，主要用于测试智能终端上的硬件设备，如：摄像头，电池，路由器，UWB电路板等设备的功能设备是否正常

#### 项目七：分布式文件系统

团队专门打造的分布式文件系统，主要用于存储小型文件，后台系统，不是可视化的产品 

#### 项目八：分布式计算系统

体育公司的分布式计算系统，对运动员的运动数据进行计算和入库。 加速度计算：个人平均速度，个人最快速度，团队平均速度，团队最快速度，团队内成员最快速度计算：个人平均加速度，个人最快加速度，团队平均加速度，团队最快加速度，团队内成员最快加速度； 运动轨迹计算：个人运动轨迹，团队运动轨迹；热力图计算：个人热力图，团队热力图；平滑计算：将个人和团队的运动轨迹做平滑处理，误差小于1米；（平滑算法由总工郭世江设计）后台系统，不是可视化的产品。

#### 项目九：区块链钱包

团队为杭州一家公司打造的一款移动端区块链HD钱包，支持单链，多链，支持多重签名方式数字资产托管；接入有BTC，ETH，ERC20 token和omni-USDT等币种，各地货币对应的币行情转换。

#### 项目十：巡宇鑫联盟小程序

为巡宇投资咨询公司打造的一款宣传式小程序项目


#### 项目十一：企业测评项目

正在开发中

目前正在洽谈中的项目有：智语文，素质宝宝，盛联盟APP

### 团队合作伙伴

* 毕节家艺家政保洁服务有限公司

* 云南三道文化传播有限公司

* 天津爱皓睿网络科技有限公司

* 北京启融科技有限公司

* 天津巡宇投资咨询服务有限公司

* 天津睿民新装饰工程有限公司




### 团队联系方式

* 电话：18210042149

* 电话：13611267041 

* 微信号：guo2012372 

* QQ: 1294928442 

* 邮箱：20123762@s.hlju.edu.cn


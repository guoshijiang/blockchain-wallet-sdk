const libConstVar = {};

libConstVar.paramsErr = {code:1000, message:"input params is null"};
libConstVar.noWord = {code:1001, message:"don't support this case"};
libConstVar.noSupport = {code:1002, message:"Temporarily does not support the situation you want"}
libConstVar.createDkErr = {code:1003, message:"create dk error"};
libConstVar.createKeystoreErr = {code:1004, message:"create keystore fail"};
libConstVar.inputParamErr = {code:1005, message:"input receiveOrChange param is error, you must input 0 or 1"};
libConstVar.childKeyErr = {code:1006, message:"input param childKey is null"};
libConstVar.unknownType = {code:1007, message:"unknown type,please input once again"};
libConstVar.serializedErr = {code:1008, message:"Serialized transaction fail"};
libConstVar.signMarkErr = {code:1009, message:"signParams.signMark param is null, please check it"};
libConstVar.LessValue = {code:1010, message:"Total less than fee"};
libConstVar.PriviteKeyNull = {code:1011, message:"privateKey is null"};
libConstVar.BitCoinSignFail = {code:1012, message:"bitcoin sign fail, please check it"};
libConstVar.EthSignFail = {code:1013, message:"eth sign fail, please check it"};
libConstVar.Erc20SignFail = {code:1014, message:"erc20 sign fail, please check it"};
libConstVar.OmniSignFail = {code:1015, message:"omni sign fail, please check it"};

module.exports = libConstVar;

const EC = require("elliptic").ec;

function isHexChar(c) {
  if (
    (c >= "A" && c <= "F") ||
    (c >= "a" && c <= "f") ||
    (c >= "0" && c <= "9")
  ) {
    return 1;
  }
  return 0;
}

function hexChar2byte(c) {
  var d = 0;
  if (c >= "A" && c <= "F") {
    d = c.charCodeAt(0) - "A".charCodeAt(0) + 10;
  } else if (c >= "a" && c <= "f") {
    d = c.charCodeAt(0) - "a".charCodeAt(0) + 10;
  } else if (c >= "0" && c <= "9") {
    d = c.charCodeAt(0) - "0".charCodeAt(0);
  }
  return d;
}

function hexStr2byteArray(str) {
  var byteArray = Array();
  var d = 0;
  var j = 0;
  var k = 0;

  for (let i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    if (isHexChar(c)) {
      d <<= 4;
      d += hexChar2byte(c);
      j++;
      if (0 === j % 2) {
        byteArray[k++] = d;
        d = 0;
      }
    }
  }
  return byteArray;
}

export const getRealPrivateKey = (privateKey) => {
  const com_priKeyBytes = hexStr2byteArray(privateKey);

  const ec = new EC("secp256k1");
  const key = ec.keyFromPrivate(com_priKeyBytes);

  const priKey = key.getPrivate();
  const priKeyHex = priKey.toString("hex");

  return priKeyHex;
};


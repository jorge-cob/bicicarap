import CryptoJS from 'rn-crypto-js';


function encryptDES(message, key) {
  return CryptoJS.DES.encrypt(message, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.NoPadding
    }).toString();
}

export function createHash(dni, bikeNumber) {
  const parsedFirstKey = CryptoJS.enc.Utf8.parse("BIKE2019");
  const parsedSecondKey = CryptoJS.enc.Utf8.parse("8FF527F9");
  let infoString = `${bikeNumber}#${String(bikeNumber).slice(-3)}#-3.6685398#40.3813740#D#${dni.toUpperCase()}`;
  if (infoString.length % 8 != 0) {
    let length = 8 - (infoString.length % 8);
    for (let i = 0; i < length; i++) {
      infoString = infoString + "#";
    }
  }
  const firstEncrypted = encryptDES(infoString, parsedFirstKey);
  const parsedFirstEncrypted = CryptoJS.enc.Base64.parse(firstEncrypted).toString();
  let infoEncryptedString = 'B' + parsedFirstEncrypted.toUpperCase();
  if (infoEncryptedString.length % 8 != 0) {
    const length2 = 8 - (infoEncryptedString.length % 8);
    for (var i2 = 0; i2 < length2; i2++) {
      infoEncryptedString = infoEncryptedString + "Z";
    }
  }
  const finalHashCode = encryptDES(infoEncryptedString, parsedSecondKey);
  return finalHashCode;
}

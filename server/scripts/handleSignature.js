const { secp256k1 } = require('ethereum-cryptography/secp256k1');
const { toHex, hexToBytes, utf8ToBytes } = require('ethereum-cryptography/utils');
const { keccak256 } = require('ethereum-cryptography/keccak');


async function handleSignature({signature, messageHash, publicKey}) {
    
    // const isSigned = secp256k1.verify(signature, messageHash, publicKey)
    // console.log(signature)
} 

module.exports = {handleSignature}
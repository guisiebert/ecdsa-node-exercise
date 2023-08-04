const { secp256k1 } = require('ethereum-cryptography/secp256k1');
const { toHex, hexToBytes, utf8ToBytes } = require('ethereum-cryptography/utils');
const { keccak256 } = require('ethereum-cryptography/keccak');


async function handleSignature({signature, messageHash, publicKey}) {
    const parsedSignature = new secp256k1.Signature(
        BigInt(signature.r),
        BigInt(signature.s),
        parseInt(signature.recovery)
    )
    
    const isSigned = secp256k1.verify(parsedSignature, messageHash, publicKey)
    return isSigned
} 

module.exports = {handleSignature}
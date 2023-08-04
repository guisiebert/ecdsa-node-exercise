const secp = require('ethereum-cryptography/secp256k1')
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils.js");


async function handleSignature(signedObject) {
    const signature = signedObject[0]
    const recoveryBit = signedObject[1]
    const hashedMsg = signedObject[2]
    const publicKey = secp.recoverPublicKey(
        hashedMsg, 
        signature, 
        recoveryBit
    )

    console.log(publicKey)
    // let publicAddress = ""

    // // console.log(publicKey)
    // return publicKey
} 

module.exports = {handleSignature}
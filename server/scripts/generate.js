const secp = require('ethereum-cryptography/secp256k1')
const { toHex } = require('ethereum-cryptography/utils')
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();
console.log('private Key: ', toHex(privateKey))

const publicKey = secp.getPublicKey(privateKey)
console.log('public Key: ', toHex(publicKey))

const publicAddress = keccak256(publicKey.slice(1)).slice(-20)
console.log('public address: ', toHex(publicAddress))

/* A FEW ADDRESSES:
1. 
private Key:  499484195840f84a29151056159d72e100560b3a6403855e0b83645d784a0709
public Key:  04ba200017bce5a7b10e78ccb7fd07a71e207abd369463f4e7eeb546b69b5413486bcdfdda96c5330b93d083473b2ce982ba5cfb8cdd3ed84de54cd07d64c90c03
public address:  a037c81dcf353d37ede4e2c3fd8002b93b74fd91


2.
private Key:  20dc358d76edc23501bbed0118106aa3bfd01fba78736da92f4aa6ff37528943
public Key:  040a35679329e0c5d43e42a17c2ff0d45d41f3f93b67b0036d3d56e8c9c33041bb38c16bf80ddf11a61498b3138f034752921c7b6426e3cc98f117aa29ea0e3418
public address:  4e07122ea8847e2be4e8a19d0096b0fb12ade813

3. 
private Key:  63ac9e07bcad49962be1e9aa28b28da9b690ee9d15f5e1d66690d7a3046826e5
public Key:  0412e6c3e8af6c1a8b59b4ebd855c6d1e3d2b103be4be10510df757efea7b478c73f13357cc373a8f0dfbbce0d1ad1b8dbc7477636315cf892a4ba4b04f65606f8
public address:  2c1cd8ebf1bc3cdc8d837871a0ceef4e4e2ca70e


Thanks */
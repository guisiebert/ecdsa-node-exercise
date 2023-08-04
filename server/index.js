const secp = require('ethereum-cryptography/secp256k1')
const { toHex } = require('ethereum-cryptography/utils')
const { keccak256 } = require("ethereum-cryptography/keccak");

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "a037c81dcf353d37ede4e2c3fd8002b93b74fd91": 100,
  "4e07122ea8847e2be4e8a19d0096b0fb12ade813": 50,
  "2c1cd8ebf1bc3cdc8d837871a0ceef4e4e2ca70e": 75,
  "04ba200017bce5a7b10e78ccb7fd07a71e207abd369463f4e7eeb546b69b5413486bcdfdda96c5330b93d083473b2ce982ba5cfb8cdd3ed84de54cd07d64c90c03": 101,
  "040a35679329e0c5d43e42a17c2ff0d45d41f3f93b67b0036d3d56e8c9c33041bb38c16bf80ddf11a61498b3138f034752921c7b6426e3cc98f117aa29ea0e3418": 51,
  "0412e6c3e8af6c1a8b59b4ebd855c6d1e3d2b103be4be10510df757efea7b478c73f13357cc373a8f0dfbbce0d1ad1b8dbc7477636315cf892a4ba4b04f65606f8": 76

};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.get('/new-wallet', (req, res) => {
  const privateKey = secp.utils.randomPrivateKey()
  const publicKey = secp.getPublicKey(privateKey)
  const publicAddress = keccak256(publicKey.slice(1)).slice(-20)


  const newWallet = {
    privateKey: toHex(privateKey),
    publicKey: toHex(publicKey),
    publicAddress: toHex(publicAddress),
  }

  console.log(newWallet)
  res.send({newWallet})
});

app.post("/send", (req, res) => {
  // TO-DO: get a signature from the client-side application
  // recover the public address from the signature

  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});



app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}


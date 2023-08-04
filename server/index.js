const secp = require('ethereum-cryptography/secp256k1')
const { toHex } = require('ethereum-cryptography/utils')
const { keccak256 } = require("ethereum-cryptography/keccak");

const {generateWallet} = require('./scripts/generate')
const {handleSignature} = require('./scripts/handleSignature')

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
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.get('/new-wallet', (req, res) => {
  const newWallet = generateWallet()
  res.send({newWallet})
});

app.post("/send", (req, res) => {
  // TO-DO: get a signature from the client-side application
  // recover the public address from the signature

  const { sender, recipient, amount, signature, } = req.body;
  handleSignature(signature)

  // 1. Send a signature into this route
  // 2. Find out the sender from the signature
  // 3. Remove "sender" from the req

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


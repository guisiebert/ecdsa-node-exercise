const { secp256k1 } = require('ethereum-cryptography/secp256k1');
const { toHex, hexToBytes } = require('ethereum-cryptography/utils');
const { keccak256 } = require('ethereum-cryptography/keccak');

const {generateWallet} = require('./scripts/generate')
const {handleSignature} = require('./scripts/handleSignature')

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "fdc8bfb4c60c49cff68d4992533adfa483a2b0a7": 100,
  "c0918ec7cd89e4c6e3fa74cf84828456738f67e8": 50,
  "450c8409847cde546713ed557fc45dce8527fa9e": 75,
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

app.post("/send", async (req, res) => {
  // TO-DO Remove "sender" from the req, and derive it from the public key

  // 1. Send a signature into this route
  const { sender, recipient, amount, signature } = req.body;

  // 2. Check if signature is valid
  const isValid = await handleSignature(signature)

  setInitialBalance(sender);
  setInitialBalance(recipient);

  // 3. If transaction is signed, send it.
  if (!isValid) {
    res.status(400).send({ message: "Incorrect private key" });
  } else if (balances[sender] < amount)  {
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


import { useState } from "react";
import server from "./server";
import { secp256k1 } from 'ethereum-cryptography/secp256k1';
import {toHex} from 'ethereum-cryptography/utils'
import {keccak256} from "ethereum-cryptography/keccak"
import { utf8ToBytes } from "ethereum-cryptography/utils.js";



function Transfer({ address, setBalance, privateKey, setPrivateKey}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [loggedAddress, setloggedAddress] = useState("")
  
  async function onPrivChange(evt) {    
    const input = evt.target.value;
    if (input.length != 64) {
      setPrivateKey(input);
      setloggedAddress("Invalid Private Key")
    } else {
      setPrivateKey(input);
      const publicKey = secp256k1.getPublicKey(input)
      const publicAddress = toHex(keccak256(publicKey.slice(1)).slice(-20))
      setloggedAddress(publicAddress)       
    }
  }
  
  const setValue = (setter) => (evt) => setter(evt.target.value);
  
  async function signTransaction() {
    let privKey = privateKey // hex string
    const message = "who care what the message is man"
    const messageHash =  toHex(keccak256(utf8ToBytes(message))) // hex string
    const publicKey =  toHex(secp256k1.getPublicKey(privKey)) // hex string
    const signature =  toHex(secp256k1.sign(messageHash, privKey))

    const signatureObjecto = {
      // signature: JSON.parse(JSON.stringify(signature, (key, value) => typeof value === 'bigint' ? value.toString() : value)),
      // signature: signature,
      messageHash,
      publicKey
    }

    
    return signatureObjecto
  }
  
  async function transfer(evt) {
    evt.preventDefault();
    
    
    try {
      // const signature = await signTransaction()
      // console.log(signature)

      const { data: { balance }, } = await server.post(`send`, {
        sender: loggedAddress,
        amount: parseInt(sendAmount),
        recipient,

        // signature: "oi"
        // signature: signature,

        // signature: JSON.parse(JSON.stringify(signature.signature, (key, value) => typeof value === 'bigint' ? value.toString() : value)),
        
        // messageHash: signature.messageHash,
        // publicKey: signature.publicKey
        // signature: signTransaction(),
      });

      setBalance(balance);

    } catch (ex) {
      console.log('ERRO')
      alert(await ex.response.data.message || "Deu ruim");
    }
  }

  
  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <label>
        Sign your transaction
        <input
          placeholder="Type a private key"
          value={privateKey}
          onChange={onPrivChange}
        ></input>
      </label>

      <div>
        Your address: {loggedAddress}
      </div> 

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;

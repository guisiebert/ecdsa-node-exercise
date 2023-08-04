import { useState } from "react";
import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1'
import {toHex} from 'ethereum-cryptography/utils'
import {keccak256} from "ethereum-cryptography/keccak"



function Transfer({ address, setBalance, privateKey, setPrivateKey}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [loggedAddress, setloggedAddress] = useState("")

  async function fetchBalance(address) {
    setloggedAddress(address)

    if (address) {
      const addressData = await server.get(`balance/${address}`);
      console.log(addressData)

      const { data: { balance },} = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }


  async function onPrivChange(evt) {    
    const input = evt.target.value;
    if (input.length != 64) {
      setPrivateKey(input);
      setloggedAddress("Invalid Private Key")
    } else {
        setPrivateKey(input);
        const publicKey = secp.getPublicKey(input)
        const publicAddress = toHex(keccak256(publicKey.slice(1)).slice(-20))
        setloggedAddress(publicAddress)
        fetchBalance(publicAddress)        
    }
  }

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: loggedAddress,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
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
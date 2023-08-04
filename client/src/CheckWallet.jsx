import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1'
// import * as keccak from 'ethereum-cryptography/keccak' // not a function error
import {keccak256} from "ethereum-cryptography/keccak"
import utils from 'ethereum-cryptography/utils'
import {toHex} from 'ethereum-cryptography/utils'
import { useState } from "react";


export function CheckWallet() {
  const [address, setAddress] = useState("")
  const [balance, setBalance] = useState(0)


  async function onAddressChange(evt) {
    const input = evt.target.value;
    fetchBalance(input)
  } 

  async function fetchBalance(address) {
    setAddress(address)

    if (address) {
      const addressData = await server.get(`balance/${address}`);
      console.log(addressData)

      const { data: { balance },} = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }


    return (
    <div className="container wallet">
      <h1>Check a Wallet</h1>
{/* 
      <label>
        Address
        <input placeholder="Type an address" value={address} onChange={onAddressChange}></input>
      </label> */}

      <label>
        Choose an Address
        <select name="address" id="address" placeholder="Type an address" value={address} onChange={onAddressChange}>
          <option value="null">Choose one...</option>
          <option value="a037c81dcf353d37ede4e2c3fd8002b93b74fd91">a037c81dcf353d37ede4e2c3fd8002b93b74fd91</option>
          <option value="4e07122ea8847e2be4e8a19d0096b0fb12ade813">4e07122ea8847e2be4e8a19d0096b0fb12ade813</option>
          <option value="2c1cd8ebf1bc3cdc8d837871a0ceef4e4e2ca70e">2c1cd8ebf1bc3cdc8d837871a0ceef4e4e2ca70e</option>
        </select>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

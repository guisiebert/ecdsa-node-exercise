import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1'
// import * as keccak from 'ethereum-cryptography/keccak' // not a function error
import {keccak256} from "ethereum-cryptography/keccak"
import utils from 'ethereum-cryptography/utils'
import {toHex} from 'ethereum-cryptography/utils'
import { useState } from "react";


function Wallet({ address, setAddress, balance, setBalance, allAddresses }) {

  async function onAddressChange(evt) {
    const input = evt.target.value;
    fetchBalance(input)
  } 

  async function fetchBalance(address) {
    setAddress(address)

    if (address) {
      const addressData = await server.get(`balance/${address}`);

      const { data: { balance },} = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }


    return (
    <div className="container wallet">
      <h1>Check Wallets</h1>

      {/* <label>
        Private Key
        <input placeholder="Type in a private key" value={privateKey} onChange={onPrivChange}></input>
      </label> */}

      <label>
        Choose an Address
        <select name="address" id="address" placeholder="Type an address" value={address} onChange={onAddressChange}>
          <option value="null">Choose one...</option>
          {allAddresses.map( address => {
            return (
              <option value={address.publicAddress}>{address.publicAddress} </option>
            )
          })}
        </select>
      </label>

      {/* <label>
        Address:
        <input placeholder="Type an address" value={address} onChange={onAddressChange}></input>
      </label> */}



      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;

import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import { CheckWallet } from "./CheckWallet";
import server from "./server";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [allAddresses, setAllAdresses] = useState([
    {
      publicAddress: "fdc8bfb4c60c49cff68d4992533adfa483a2b0a7",
      privateKey: "b82d71d17c9ef4152bb4b5129df071bb92c17e7082e5ab62f981b3e77e8c111c",
      publicKey: ""
    },
    {
      publicAddress: "c0918ec7cd89e4c6e3fa74cf84828456738f67e8",
      privateKey: "b4a4ce12641a62036311364c3cb5f67076ecc1428ee69ae6f0ce8e4750acc673",
      publicKey: ""
    },
    {
      publicAddress: "450c8409847cde546713ed557fc45dce8527fa9e",
      privateKey: "ca611ab8360187fd93d1d8b7e3e77abe3b624498747123123e2e023c704b5a6c",
      publicKey: ""
    }
  ])

  async function handleNewWallet() {
    const {newWallet} = await server.get('/new-wallet')
    .then(res => res.data)
    console.log(newWallet)

    setAllAdresses((old) => [...old, newWallet])

  }

  return (
    <main>
      <div className="app">
        {/* <CheckWallet/>  */}
        <Wallet
          balance={balance}
          setBalance={setBalance}
          address={address}
          setAddress={setAddress}
          allAddresses={allAddresses}
        />
        <Transfer 
          setBalance={setBalance} 
          address={address} 
          privateKey={privateKey} 
          setPrivateKey={setPrivateKey}
          allAddresses={allAddresses}
        />
 

      </div>
      <div className="Table">
        <table>
          <thead>
            <tr>
              <th>Public Address</th>
              <th>Private Key</th>
            </tr>
          </thead>
          <tbody>
            {allAddresses.map( address => {
              return (
                <tr key={address.publicAddress}>
                  <td> {address.publicAddress} </td>
                  <td> {address.privateKey} </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <button onClick={handleNewWallet}>Create new Wallet</button>
      </div>
    </main>
  );
}

export default App;

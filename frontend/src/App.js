import { useEffect, useState, createRef } from 'react';
import { Contract, ethers } from 'ethers'
import { getNetwork } from "@ethersproject/networks";


import DeSharePost from './artifacts/contracts/DeShare.sol/DeSharePost.json'

const dspAddress = "0x72611d0fc2062C0115156a2f240eDbDbd9A1F53b"

// Specify your own API keys
// Each is optional, and if you omit it the default
// API key for that service will be used.
const provider = new ethers.providers.Web3Provider(window.ethereum)
const contract = new ethers.Contract(dspAddress, DeSharePost.abi, provider);

function App() {
  const [bal, setBal] = useState(0)

  useEffect(() => {
    async function connectEth() {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      const address = await signer.getAddress()

      provider.getBalance(address).then((balance) => {
        // convert a currency unit from wei to ether
        const balanceInEth = ethers.utils.formatEther(balance)
        console.log(`balance: ${balanceInEth} ETH`)
        setBal(balanceInEth)
       })

    }
    connectEth()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <h2>your bal: {bal} </h2>
      </header>
    </div>
  );
}

export default App;

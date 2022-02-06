import { useState } from 'react'
import { ethers } from 'ethers'
import Navbar from './components/Navbar'
import Compose from './components/Compose'
import Feed from './components/Feed'
import Button from './components/Button'

import './App.css'

import DeSharePost from './artifacts/contracts/DeShare.sol/DeSharePost.json'
import DeShareMember from './artifacts/contracts/DeShare.sol/DeShareMember.json'

const dspAddress = "0x8C199F1c92c9ecea3FA7c182b5202ba6a5611396"
const dsmAddress = "0xBE806Cac1D25803fc97De268341040271CBf622c"

// Specify your own API keys
// Each is optional, and if you omit it the default
// API key for that service will be used.

function App() {
  const [wallet, setWallet] = useState({})
  const [contractP, setContractP] = useState()
  const [contractM, setContractM] = useState()

  const mintMember = async () => {
    try {
      await contractM.mintItem()
    } catch (err) {
      console.log(err.data.message)
    }
  }

  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    const address = await signer.getAddress()      
    setContractP(new ethers.Contract(dspAddress, DeSharePost.abi, signer))
    setContractM(new ethers.Contract(dsmAddress, DeShareMember.abi, signer))

    provider.getBalance(address).then((balance) => {
      // convert a currency unit from wei to ether
      const balanceInEth = ethers.utils.formatEther(balance)
      setWallet({...wallet, signer, address, balanceInEth})
      })
  }

  // const covalentjs = require('covalentjs')
  // const nftMetaData = covalentjs.classA.getExternalNFTMetadata(
  // 80001, 0x18Ea9baC375BbdB36d2045Fa2ce9762A573a0cD2, 1)

  return (
    <>
      <Navbar wallet={wallet} connectWallet={connectWallet} />
      <div className="App">
        <Compose wallet={wallet} contract={contractP} />
        <Feed/>
        <h2>your bal: {wallet.balanceInEth} </h2>
        <Button onClick={mintMember}>Mint Member</Button>
        {/* <p>{nftMetaData}</p> */}
      </div>
    </>
  );
}

export default App;

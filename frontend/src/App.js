import { useEffect, useState } from 'react';
import { ethers } from 'ethers'


import DeSharePost from './artifacts/contracts/DeShare.sol/DeSharePost.json'
import DeShareMember from './artifacts/contracts/DeShare.sol/DeShareMember.json'

const dspAddress = "0x72611d0fc2062C0115156a2f240eDbDbd9A1F53b"
const dsmAddress = "0xBE806Cac1D25803fc97De268341040271CBf622c"

// Specify your own API keys
// Each is optional, and if you omit it the default
// API key for that service will be used.
const provider = new ethers.providers.Web3Provider(window.ethereum)

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

  useEffect(() => {
    async function connectEth() {
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
    connectEth()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {wallet.address}
        </p>
        <h2>your bal: {wallet.balanceInEth} </h2>
        <button onClick={mintMember}>mint member token</button>
      </header>
    </div>
  );
}

export default App;

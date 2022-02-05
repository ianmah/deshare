import { useEffect, useState } from 'react';
import { ethers } from 'ethers'


import DeSharePost from './artifacts/contracts/DeShare.sol/DeSharePost.json'

const dspAddress = "0x72611d0fc2062C0115156a2f240eDbDbd9A1F53b"

// Specify your own API keys
// Each is optional, and if you omit it the default
// API key for that service will be used.
const provider = new ethers.providers.Web3Provider(window.ethereum)

function App() {
  const [wallet, setWallet] = useState({})
  const [contract, setContract] = useState()

  const mintMember = async () => {
    const res = await contract.setMemberContract('0xbe806cac1d25803fc97de268341040271cbf622c')
    console.log(res)
  }

  useEffect(() => {
    async function connectEth() {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      const address = await signer.getAddress()

      setContract(new ethers.Contract(dspAddress, DeSharePost.abi, signer))

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

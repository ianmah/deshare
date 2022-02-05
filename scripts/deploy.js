// async function main() {
//     // const HelloWorld = await ethers.getContractFactory("HelloWorld");
//     const DeShareNFT = await ethers.getContractFactory("DeShareNFT");
 
//     // Start deployment, returning a promise that resolves to a contract object
//     const contract = await DeShareNFT.deploy("asd", "0x7b41b332ee0fD0CaB0c920B18796DB25193CDD5d", "0x7b41b332ee0fD0CaB0c920B18796DB25193CDD5d");
//     // const hello_world = await DeShareNFT.deploy();
//     // const hello_world = await Address.deploy();
//     // const hello_world = await ERC721.deploy();
//     // const hello_world = await ERC721Enumerable.deploy();
//     console.log("Contract deployed to address:", contract.address);
//  }

async function main() {
  const baseTokenURI = "ipfs://xxx/";

  // Get owner/deployer's wallet address
  const [owner] = await hre.ethers.getSigners();

  // Get contract that we want to deploy
  const contractFactory = await hre.ethers.getContractFactory("Collectible");

  // Deploy contract with the correct constructor arguments
  const contract = await contractFactory.deploy(baseTokenURI);

  // Wait for this transaction to be mined
  await contract.deployed();

  // Get contract address
  console.log("Contract deployed to:", contract.address);

  // Reserve NFTs
  // let txn = await contract.reserveNFTs();
  // await txn.wait();
  // console.log("10 NFTs have been reserved");

  // // Mint 3 NFTs by sending 0.03 ether
  // txn = await contract.mintNFTs(3, { value: utils.parseEther('0.03') });
  // await txn.wait()

  // // Get all token IDs of the owner
  // let tokens = await contract.tokensOfOwner(owner.address)
  // console.log("Owner has tokens: ", tokens);

}
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });
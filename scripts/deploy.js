async function main() {
  
  const memberContractFactory = await hre.ethers.getContractFactory("DeShareMember");

  // Deploy contract with the correct constructor arguments
  const memberContract = await memberContractFactory.deploy();

  // Wait for this transaction to be mined
  await memberContract.deployed();

  // Get contract address
  console.log(`Member contract: https://mumbai.polygonscan.com/token/${memberContract.address}`,);



  const baseTokenURI = "ipfs://";

  // Get owner/deployer's wallet address
  // const [owner] = await hre.ethers.getSigners();

  // Get contract that we want to deploy
  const contractFactory = await hre.ethers.getContractFactory("DeSharePost");

  // Deploy contract with the correct constructor arguments
  const contract = await contractFactory.deploy(baseTokenURI);

  // Wait for this transaction to be mined
  await contract.deployed();

  // Get contract address
  console.log(`Post contract: https://mumbai.polygonscan.com/token/${contract.address}`,);


  // console.log("Verifying contract:", contract.address);
  // await hre.run("verify:verify", {
  //   address: contract.address,
  //   constructorArguments: [ baseTokenURI ],
  // });
  // console.log("Contract verified");


  // console.log("Verifying contract:", memberContract.address);
  // await hre.run("verify:verify", {
  //   address: memberContract.address,
  //   constructorArguments: [],
  // });
  // console.log("Contract verified");


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
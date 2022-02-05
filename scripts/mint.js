/* eslint no-use-before-define: "warn" */
// const fs = require("fs");
// const chalk = require("chalk");
require("dotenv").config();
const { config, ethers } = require("hardhat");
const { utils } = require("ethers");
const { NFTStorage, File } = require("nft.storage");
// const R = require("ramda");
// const ipfsAPI = require('ipfs-http-client');
// const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

// const { create } = require('ipfs-http-client')
// const ipfs = create('https://ipfs.infura.io:5001')

const { NFTSTORAGE_KEY } = process.env;
const client = new NFTStorage({ token: NFTSTORAGE_KEY });

// const delayMS = 1000 //sometimes xDAI needs a 6000ms break lol 😅

const main = async () => {
  // ADDRESS TO MINT TO:
  const toAddress = "0x7b41b332ee0fD0CaB0c920B18796DB25193CDD5d";

  //   console.log("\n\n 🎫 Minting to "+toAddress+"...\n");

  //   const { deployer } = await getNamedAccounts();
  //   const yourCollectible = await ethers.getContract("Collectible", deployer);

  const DeSharePost = await ethers.getContractFactory("DeSharePost");
  const yourCollectible = await DeSharePost.attach(
    "0x72611d0fc2062C0115156a2f240eDbDbd9A1F53b" // The deployed contract address
  );

  const tweet = {
    name: "tweet",
    description: "The first tweet on DeShare",
    image: new File(
      [
        `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`,
      ],
      "pinpie.jpg",
      { type: "image/jpg" }
    ),
  };
  console.log("Uploading post");
  //   const ipfs = create('https://ipfs.infura.io:5001')
  //   const uploaded = await ipfs.add(JSON.stringify(tweet))

  const metadata = await client.store(tweet);

  console.log(metadata.url);
  const metadataURI = metadata.url.replace(/^ipfs:\/\//, "");

  console.log("Minting tweet with IPFS URI (" + metadataURI + ")");
  const mintResult = await yourCollectible.mintItem(metadataURI, { gasLimit: 10000000 });
  console.log(mintResult);

  //await sleep(delayMS)

  // console.log("Transferring Ownership of YourCollectible to "+toAddress+"...")

  // await yourCollectible.transferOwnership(toAddress)

  // await sleep(delayMS)

  /*
  console.log("Minting zebra...")
  await yourCollectible.mintItem("0xD75b0609ed51307E13bae0F9394b5f63A7f8b6A1","zebra.jpg")
  */

  //const secondContract = await deploy("SecondContract")

  // const exampleToken = await deploy("ExampleToken")
  // const examplePriceOracle = await deploy("ExamplePriceOracle")
  // const smartContractWallet = await deploy("SmartContractWallet",[exampleToken.address,examplePriceOracle.address])

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */
};

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

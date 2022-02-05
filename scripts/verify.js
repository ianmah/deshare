const CONTRACT1 = '0xCab899ccfc5FDfC080920BE2Fd74AA4bdF35C9AE'
const CONTRACT2 = '0x58Ec1fb58D4C6FdDd390e0c9b939cd44C75b1956'

async function main() {
    const baseTokenURI = "ipfs://";
    console.log("Verifying contract:", CONTRACT1);
    await hre.run("verify:verify", {
      address: CONTRACT1,
      constructorArguments: [ baseTokenURI ],
    });
    console.log("Contract verified");
  
  
    console.log("Verifying contract:", CONTRACT2);
    await hre.run("verify:verify", {
      address: CONTRACT2,
      constructorArguments: [],
    });
    console.log("Contract verified");

  }
   
   main()
     .then(() => process.exit(0))
     .catch(error => {
       console.error(error);
       process.exit(1);
     });
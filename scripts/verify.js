const MEMBERCONTRACT = "0xBE806Cac1D25803fc97De268341040271CBf622c";
const POSTCONTRACT = "0x18Ea9baC375BbdB36d2045Fa2ce9762A573a0cD2";

async function main() {
  const baseTokenURI = "ipfs://";
  console.log("Verifying contract:", POSTCONTRACT);
  await hre.run("verify:verify", {
    address: POSTCONTRACT,
    constructorArguments: [MEMBERCONTRACT, baseTokenURI],
  });
  console.log("Contract verified");

  console.log("Verifying contract:", MEMBERCONTRACT);
  await hre.run("verify:verify", {
    address: MEMBERCONTRACT,
    constructorArguments: [],
  });
  console.log("Contract verified");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

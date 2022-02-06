const MEMBERCONTRACT = "0x3D41aE3d8dFC326dd77Ee44C249Be7fC068208B3";
const POSTCONTRACT = "0xA3b36ABBfb2436055E94614B31cdA05336893ec7";

async function main() {
  const baseTokenURI = "ipfs://";
  console.log("Verifying post contract:", POSTCONTRACT);
  await hre.run("verify:verify", {
    address: POSTCONTRACT,
    constructorArguments: [MEMBERCONTRACT, baseTokenURI],
  });
  console.log("Contract verified");
  console.log("Verifying member contract:", MEMBERCONTRACT);
  await hre.run("verify:verify", {
    address: MEMBERCONTRACT,
    constructorArguments: [baseTokenURI],
  });
  console.log("Contract verified");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

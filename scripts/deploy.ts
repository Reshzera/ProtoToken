import { ethers } from "hardhat";

async function main() {
  const ProtTokenContract = await ethers.deployContract("ProtoToken");

  await ProtTokenContract.waitForDeployment();

  console.log("ProtoToken deployed to:", await ProtTokenContract.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

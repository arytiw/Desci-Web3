const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const contractAddress = "0x3ab52778D2aD41B997AbD6313c6f833B47e50A43"; // Replace with your contract address
  const unlockTime = Math.floor(Date.now() / 1000) + 60; // Example future timestamp

  const Lock = await hre.ethers.getContractFactory("Lock");
  const lock = await Lock.attach(contractAddress);

  const time = await lock.unlockTime();
  console.log("Unlock time is:", time.toString());

  const balance = await hre.ethers.provider.getBalance(contractAddress);
  console.log("Contract balance is:", hre.ethers.formatEther(balance), "ETH");

  // Optional: Try to withdraw (will fail if unlock time hasn't passed)
  // const tx = await lock.withdraw();
  // await tx.wait();
  // console.log("Withdrawn successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

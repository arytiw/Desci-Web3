const hre = require("hardhat");

async function main() {
  const ResearchNFT = await hre.ethers.getContractFactory("ResearchNFT");
  const researchNFT = await ResearchNFT.deploy();

  console.log("Waiting for deployment...");
  await researchNFT.waitForDeployment(); // ✅ correct for Ethers v6

  console.log(`✅ ResearchNFT deployed to: ${researchNFT.target}`); // ✅ use .target instead of .address
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});

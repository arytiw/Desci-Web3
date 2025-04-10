require("dotenv").config();
const { ethers } = require("hardhat");



async function main() {
  const contractAddress = "0xa3B3017b182884c4B9010D6f3BB40DC56a0591d1"; // Replace with your actual contract address
  const metadataURI = "https://gateway.pinata.cloud/ipfs/QmVodzQ1VfFs7dX7hiwBjxeyc14sUfs7eBvWXMpUFBrQbM"; // Your IPFS Metadata URL

  const [deployer] = await ethers.getSigners();
  console.log("Minting with address:", deployer.address);

  const ResearchNFT = await ethers.getContractFactory("ResearchNFT");
  const contract = await ResearchNFT.attach(contractAddress);

  const tx = await contract.mintNFT(deployer.address, metadataURI);
  await tx.wait();
  console.log("✅ NFT minted!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

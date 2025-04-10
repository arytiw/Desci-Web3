import { ethers } from "./ethers-5.6.esm.min.js"; // or however you include ethers

const CONTRACT_ADDRESS = "0xE89a4DA1A3d198A1CcBfDFDf8D3959f2A793207f";  // Replace with your deployed address

const ABI = [
  "function mintNFT(address recipient, string memory tokenURI) public returns (uint256)",
  "function addReviewer(address reviewer) public",
  "function setReviewStatus(uint256 tokenId, string memory status) public",
];

export async function getContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
}

import { contractABI, contractAddress } from "../contracts/ResearchNFT.js";

async function mintNFT(metadataURL) {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      const tx = await contract.mintNFT(metadataURL);
      await tx.wait();
      alert("NFT Minted successfully!");
    } catch (err) {
      console.error("Minting failed:", err);
      alert("Error: " + err.message);
    }
  } else {
    alert("Please install MetaMask");
  }
}

// Export so you can use in HTML buttons
window.mintNFT = mintNFT;

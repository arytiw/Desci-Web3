import { contractABI, contractAddress } from "../contracts/ResearchNFT.js";

async function approvePaper(tokenId) {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      const tx = await contract.approvePaper(tokenId);  // replace with your actual function
      await tx.wait();
      alert("Paper approved!");
    } catch (err) {
      console.error("Approval failed:", err);
      alert("Error: " + err.message);
    }
  }
}

window.approvePaper = approvePaper;

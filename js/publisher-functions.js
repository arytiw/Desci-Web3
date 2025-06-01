import { ethers } from 'ethers';
import ResearchNFT from '../artifacts/contracts/ResearchNFT.sol/ResearchNFT.json';

const contractAddress = '0x...'; // Will be set after deployment

export async function initializePublisher() {
    if (!window.ethereum) throw new Error('MetaMask not found');
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, ResearchNFT.abi, signer);
}

export async function submitPaper(author, ipfsHash, metadata) {
    try {
        const contract = await initializePublisher();
        const metadataURI = `ipfs://${ipfsHash}`;
        
        const tx = await contract.submitPaper(author, ipfsHash, metadataURI);
        await tx.wait();
        
        return tx.hash;
    } catch (error) {
        console.error('Error submitting paper:', error);
        throw error;
    }
}

export async function checkPublisherStatus(address) {
    try {
        const contract = await initializePublisher();
        return await contract.isPublisher(address);
    } catch (error) {
        console.error('Error checking publisher status:', error);
        throw error;
    }
}

export async function getPaperDetails(tokenId) {
    try {
        const contract = await initializePublisher();
        const details = await contract.getPaperDetails(tokenId);
        return {
            ipfsHash: details[0],
            author: details[1],
            approvalCount: details[2].toNumber(),
            rejectionCount: details[3].toNumber(),
            reviewCount: details[4].toNumber(),
            status: details[5]
        };
    } catch (error) {
        console.error('Error getting paper details:', error);
        throw error;
    }
}

// Event listeners
export function setupPublisherEvents(contract) {
    contract.on('PaperSubmitted', (tokenId, author, ipfsHash) => {
        console.log('Paper submitted:', { tokenId: tokenId.toString(), author, ipfsHash });
        // Add your event handling logic here
    });

    contract.on('PaperStatusUpdated', (tokenId, newStatus) => {
        console.log('Paper status updated:', { tokenId: tokenId.toString(), newStatus });
        // Add your event handling logic here
    });
}

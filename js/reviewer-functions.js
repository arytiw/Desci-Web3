import { ethers } from 'ethers';
import ResearchNFT from '../artifacts/contracts/ResearchNFT.sol/ResearchNFT.json';

const contractAddress = '0x...'; // Will be set after deployment

export async function initializeReviewer() {
    if (!window.ethereum) throw new Error('MetaMask not found');
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, ResearchNFT.abi, signer);
}

export async function submitReview(tokenId, isApproved) {
    try {
        const contract = await initializeReviewer();
        const tx = await contract.submitReview(tokenId, isApproved);
        await tx.wait();
        return tx.hash;
    } catch (error) {
        console.error('Error submitting review:', error);
        throw error;
    }
}

export async function checkReviewerStatus(address) {
    try {
        const contract = await initializeReviewer();
        return await contract.isReviewer(address);
    } catch (error) {
        console.error('Error checking reviewer status:', error);
        throw error;
    }
}

export async function hasAlreadyReviewed(tokenId, reviewerAddress) {
    try {
        const contract = await initializeReviewer();
        return await contract.hasReviewed(tokenId, reviewerAddress);
    } catch (error) {
        console.error('Error checking review status:', error);
        throw error;
    }
}

export async function getReviewDecision(tokenId, reviewerAddress) {
    try {
        const contract = await initializeReviewer();
        return await contract.getReviewDecision(tokenId, reviewerAddress);
    } catch (error) {
        console.error('Error getting review decision:', error);
        throw error;
    }
}

// Event listeners
export function setupReviewerEvents(contract) {
    contract.on('ReviewSubmitted', (tokenId, reviewer, decision) => {
        console.log('Review submitted:', {
            tokenId: tokenId.toString(),
            reviewer,
            decision: decision.toString()
        });
        // Add your event handling logic here
    });

    contract.on('PaperStatusUpdated', (tokenId, newStatus) => {
        console.log('Paper status updated:', {
            tokenId: tokenId.toString(),
            newStatus: newStatus.toString()
        });
        // Add your event handling logic here
    });
}

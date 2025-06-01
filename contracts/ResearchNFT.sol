// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ResearchNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    // Counters
    Counters.Counter private _tokenIds;
    
    // Constants
    uint256 public constant REQUIRED_REVIEWS = 3;
    uint256 public constant APPROVAL_THRESHOLD = 2;
    
    // Enums
    enum PaperStatus { Pending, Approved, Rejected }
    enum ReviewDecision { None, Approve, Reject }
    
    // Structs
    struct Paper {
        string ipfsHash;
        address author;
        uint256 approvalCount;
        uint256 rejectionCount;
        uint256 reviewCount;
        PaperStatus status;
        mapping(address => bool) hasReviewed;
        mapping(address => ReviewDecision) reviewDecisions;
    }
    
    // State Variables
    mapping(uint256 => Paper) public papers;
    mapping(address => bool) public isReviewer;
    mapping(address => bool) public isPublisher;
    
    // Events
    event PaperSubmitted(uint256 indexed tokenId, address indexed author, string ipfsHash);
    event ReviewerAdded(address indexed reviewer);
    event ReviewerRemoved(address indexed reviewer);
    event PublisherAdded(address indexed publisher);
    event PublisherRemoved(address indexed publisher);
    event ReviewSubmitted(uint256 indexed tokenId, address indexed reviewer, ReviewDecision decision);
    event PaperStatusUpdated(uint256 indexed tokenId, PaperStatus newStatus);
    
    constructor() ERC721("DeSci Research NFT", "DSCI") Ownable(msg.sender) {}
    
    // Modifiers
    modifier onlyReviewer() {
        require(isReviewer[msg.sender], "Not an authorized reviewer");
        _;
    }
    
    modifier onlyPublisher() {
        require(isPublisher[msg.sender], "Not an authorized publisher");
        _;
    }
    
    // Publisher Management
    function addPublisher(address publisher) external onlyOwner {
        require(!isPublisher[publisher], "Already a publisher");
        isPublisher[publisher] = true;
        emit PublisherAdded(publisher);
    }
    
    function removePublisher(address publisher) external onlyOwner {
        require(isPublisher[publisher], "Not a publisher");
        isPublisher[publisher] = false;
        emit PublisherRemoved(publisher);
    }
    
    // Reviewer Management
    function addReviewer(address reviewer) external onlyOwner {
        require(!isReviewer[reviewer], "Already a reviewer");
        isReviewer[reviewer] = true;
        emit ReviewerAdded(reviewer);
    }
    
    function removeReviewer(address reviewer) external onlyOwner {
        require(isReviewer[reviewer], "Not a reviewer");
        isReviewer[reviewer] = false;
        emit ReviewerRemoved(reviewer);
    }
    
    // Paper Submission
    function submitPaper(address author, string memory ipfsHash, string memory metadataURI) 
        external 
        onlyPublisher 
        returns (uint256) 
    {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _safeMint(author, newTokenId);
        _setTokenURI(newTokenId, metadataURI);
        
        Paper storage paper = papers[newTokenId];
        paper.ipfsHash = ipfsHash;
        paper.author = author;
        paper.status = PaperStatus.Pending;
        
        emit PaperSubmitted(newTokenId, author, ipfsHash);
        return newTokenId;
    }
    
    // Review Functions
    function submitReview(uint256 tokenId, bool isApproved) external onlyReviewer {
        Paper storage paper = papers[tokenId];
        require(paper.author != address(0), "Paper does not exist");
        require(!paper.hasReviewed[msg.sender], "Already reviewed");
        require(paper.status == PaperStatus.Pending, "Paper not in review state");
        require(msg.sender != paper.author, "Author cannot review own paper");
        
        paper.hasReviewed[msg.sender] = true;
        paper.reviewCount++;
        
        if (isApproved) {
            paper.approvalCount++;
            paper.reviewDecisions[msg.sender] = ReviewDecision.Approve;
        } else {
            paper.rejectionCount++;
            paper.reviewDecisions[msg.sender] = ReviewDecision.Reject;
        }
        
        emit ReviewSubmitted(tokenId, msg.sender, isApproved ? ReviewDecision.Approve : ReviewDecision.Reject);
        
        // Check if we have enough reviews to make a decision
        if (paper.reviewCount >= REQUIRED_REVIEWS) {
            updatePaperStatus(tokenId);
        }
    }
    
    // Internal Functions
    function updatePaperStatus(uint256 tokenId) internal {
        Paper storage paper = papers[tokenId];
        
        if (paper.approvalCount >= APPROVAL_THRESHOLD) {
            paper.status = PaperStatus.Approved;
        } else if (paper.rejectionCount > (REQUIRED_REVIEWS - APPROVAL_THRESHOLD)) {
            paper.status = PaperStatus.Rejected;
        }
        
        emit PaperStatusUpdated(tokenId, paper.status);
    }
    
    // View Functions
    function getPaperDetails(uint256 tokenId) external view returns (
        string memory ipfsHash,
        address author,
        uint256 approvalCount,
        uint256 rejectionCount,
        uint256 reviewCount,
        PaperStatus status
    ) {
        Paper storage paper = papers[tokenId];
        require(paper.author != address(0), "Paper does not exist");
        
        return (
            paper.ipfsHash,
            paper.author,
            paper.approvalCount,
            paper.rejectionCount,
            paper.reviewCount,
            paper.status
        );
    }
    
    function hasReviewed(uint256 tokenId, address reviewer) external view returns (bool) {
        return papers[tokenId].hasReviewed[reviewer];
    }
    
    function getReviewDecision(uint256 tokenId, address reviewer) external view returns (ReviewDecision) {
        return papers[tokenId].reviewDecisions[reviewer];
    }
    
    function getPaperStatus(uint256 tokenId) external view returns (PaperStatus) {
        return papers[tokenId].status;
    }
}

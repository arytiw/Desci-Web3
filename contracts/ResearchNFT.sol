// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ResearchNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    mapping(uint256 => string) public reviewStatus;
    mapping(address => bool) public isReviewer;

    constructor() ERC721("ResearchNFT", "RSC") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        tokenCounter += 1;
        return newTokenId;
    }

    // 🧑‍⚖️ Reviewer Management
    function addReviewer(address reviewer) public onlyOwner {
        isReviewer[reviewer] = true;
    }

    function removeReviewer(address reviewer) public onlyOwner {
        isReviewer[reviewer] = false;
    }

    modifier onlyReviewer() {
        require(isReviewer[msg.sender], "Not authorized reviewer");
        _;
    }

    // ✅ Review Function
    function setReviewStatus(uint256 tokenId, string memory status) public onlyReviewer {
        require(ownerOf(tokenId) != address(0), "Token does not exist");

        reviewStatus[tokenId] = status;
    }

    // Optional: getter is already public by default
}

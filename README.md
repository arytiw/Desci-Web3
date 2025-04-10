# 🧬 DeSci Web3 Publishing Platform

A fully decentralized Web3-based platform to **publish**, **review**, and **explore** scientific research papers as NFTs on the blockchain — powered by Ethereum, IPFS, and MetaMask.

## 🚀 Overview

This project is a submission for the [Name of Hackathon or Course Project]. It aims to revolutionize the traditional research publishing model by making it **transparent**, **tamper-proof**, and **open-access** using Web3 technology.

Researchers can **mint their work as NFTs**, reviewers can **approve or reject submissions**, and students or the public can **browse approved papers** — all through an intuitive frontend connected to **blockchain smart contracts** and **IPFS**.

---

## 🛠️ Tech Stack

| Layer             | Technology                         |
|------------------|------------------------------------|
| **Frontend**      | HTML, Bootstrap 5, Vanilla JS       |
| **Smart Contracts**| Solidity, Ethereum (Sepolia Testnet), Hardhat |
| **Wallet Integration** | MetaMask                         |
| **Decentralized Storage** | IPFS via [Pinata](https://pinata.cloud)       |
| **NFT Standard** | ERC721 (via OpenZeppelin)          |

---

## 👤 Roles & Workflow

### 👨‍🔬 Publisher (Researcher)
- Uploads research PDF + metadata to IPFS via Pinata
- Pays **0.001 ETH** gas fee to mint it as an NFT via smart contract
- Waits for peer review approval

### 🧪 Reviewer
- Views all uploaded research submissions
- Approves or rejects each paper
- Updates metadata status via Pinata API

### 🎓 Student / Public
- Views only **approved** research papers
- Can sort papers by title, author, or date

---

## 💡 Key Features

- ✅ Web3 wallet login via MetaMask
- 📥 Upload research papers to IPFS
- 🔐 Store metadata securely on-chain
- 🧾 Mint research papers as NFTs
- 📤 Role-based dashboards (Publisher / Reviewer / Researcher)
- ✅ Approve/reject submissions before public view
- 🌐 Fully decentralized & censorship-resistant

---

## 📂 Project Structure

```
project-root/
│
├── contracts/                  # Smart contract (ResearchNFT.sol)
├── scripts/                    # Deployment and interaction scripts
├── frontend/
│   ├── templates/              # HTML pages (login, register, dashboards)
│   └── static/css/             # Neon Brutalism CSS theme
├── .env                        # Env vars for Pinata keys, Wallet
├── hardhat.config.js           # Hardhat setup
├── package.json                # Node dependencies
└── README.md                   # You are here
```

---

## 🔧 Prerequisites

- [Node.js](https://nodejs.org/)
- [MetaMask Extension](https://metamask.io/)
- [Pinata Account](https://app.pinata.cloud/)
- [Sepolia Testnet ETH](https://sepoliafaucet.com/)
- [Git](https://git-scm.com/)

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/desci-web3.git
cd desci-web3
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file at the root:

```env
PRIVATE_KEY=your_private_key_here
PINATA_API_KEY=your_pinata_key_here
PINATA_SECRET_API_KEY=your_pinata_secret_key_here
```

### 4. Compile Smart Contract

```bash
npx hardhat compile
```

### 5. Deploy to Sepolia Testnet

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Copy the deployed **contract address** for use in frontend.

---

## 🌐 Frontend Usage

> The frontend is a static HTML/JS app. You can open it directly or use a local server.

### 1. Serve the frontend locally

```bash
cd frontend
python3 -m http.server 8000
# Or use Live Server extension in VS Code
```

Visit: [http://localhost:8000/templates/login.html](http://localhost:8000/templates/login.html)

### 2. Roles & Navigation

- Register as **Publisher**, **Reviewer**, or **Researcher**
- Connect MetaMask wallet
- Perform role-specific actions via your dashboard

---

## 🧪 Sample Usage Flow

1. **Publisher** uploads paper → Mint NFT → Pay 0.001 ETH
2. **Reviewer** sees submission → Approves/Rejects via dashboard
3. **Researcher** sees only approved papers → Can sort & view PDFs

---

## 🧠 Smart Contract: ResearchNFT.sol

```solidity
function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256);
```

- Only the contract owner (backend/admin) can mint
- Stores paper metadata as `tokenURI` (points to IPFS JSON)

---

## 🖼️ NFT Metadata Example

```json
{
  "name": "Quantum Biology Research",
  "description": "Exploring quantum effects in living systems.",
  "author": "Dr. A Sharma",
  "status": "approved",
  "pdf": "https://gateway.pinata.cloud/ipfs/QmXYZ.../paper.pdf"
}
```

---

## 🎨 UI Design: Neon Brutalism

- High-contrast neon colors
- Minimalistic, grid-based layouts
- Strong UX differentiation between roles
- Responsive for mobile and desktop

---

## ⚖️ License

MIT License. Free to use, fork, and expand upon.

---

## 🙌 Acknowledgements

- [Pinata](https://www.pinata.cloud/) for IPFS services
- [OpenZeppelin](https://openzeppelin.com/) for ERC721 contracts
- [Hardhat](https://hardhat.org/) for local blockchain dev
- [MetaMask](https://metamask.io/) for wallet integration
- [Ethereum Sepolia Faucet](https://sepoliafaucet.com/)

---

## 📣 Contact

Built with ❤️ by [Your Name / Team Name]  
For questions, reach out at: [your.email@example.com] or open an [Issue](https://github.com/yourusername/desci-web3/issues)

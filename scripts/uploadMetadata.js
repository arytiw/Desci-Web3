require('dotenv').config();
const axios = require('axios');

async function uploadMetadata() {
  const metadata = {
    name: "Decentralized Science Research",
    description: "This NFT represents a peer-reviewed research paper on decentralized science publishing.",
    image: "ipfs://QmbMjX8hoXEt3tKY8aLLJmhm25Gr91obhcyuFAS3Px1uSm", // 👈 Your PDF CID
    attributes: [
      {
        trait_type: "Field",
        value: "DeSci"
      },
      {
        trait_type: "Year",
        value: "2025"
      },
      {
        trait_type: "Reviewer Approved",
        value: "Yes"
      }
    ]
  };

  try {
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      metadata,
      {
        headers: {
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_API_SECRET
        }
      }
    );

    console.log("✅ Metadata uploaded successfully!");
    console.log("🔗 Metadata CID:", response.data.IpfsHash);
    console.log("🌍 Metadata URL:", `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`);
  } catch (error) {
    console.error("❌ Error uploading metadata:", error.message);
  }
}

uploadMetadata(); // 👈 This runs the upload

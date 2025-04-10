// scripts/uploadToPinata.js
require("dotenv").config();
const axios = require("axios");

const pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecretApiKey = process.env.PINATA_API_SECRET;

console.log("Pinata API Key:", pinataApiKey);
console.log("Pinata Secret Key:", pinataSecretApiKey);


async function uploadMetadata() {
  const metadata = {
    name: "Decentralized Science Research",
    description: "Research on blockchain-based decentralized publishing.",
    attributes: [
      {
        trait_type: "Field",
        value: "DeSci",
      },
      {
        trait_type: "Published",
        value: "2025",
      },
    ],
  };

  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  try {
    const res = await axios.post(url, metadata, {
      headers: {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    });

    console.log("✅ Metadata uploaded to IPFS");
    console.log("🌍 IPFS Hash:", res.data.IpfsHash);
  } catch (err) {
    console.error("❌ Error uploading to Pinata:", err);
  }
}

uploadMetadata();

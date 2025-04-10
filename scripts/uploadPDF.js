// scripts/uploadPDF.js
require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

async function uploadFileToPinata() {
  const filePath = "EVS1.pdf"; // 🧠 Your PDF file path
  const data = new FormData();
  data.append("file", fs.createReadStream(filePath));

  const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
    maxContentLength: "Infinity",
    headers: {
      ...data.getHeaders(),
      pinata_api_key: process.env.PINATA_API_KEY,
      pinata_secret_api_key: process.env.PINATA_API_SECRET,
    },
  });

  console.log("✅ File uploaded:", `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`);
  return res.data.IpfsHash;
}

uploadFileToPinata().catch(console.error);

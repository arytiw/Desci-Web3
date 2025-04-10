require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

console.log("INFURA_URL:", process.env.INFURA_URL || "Missing ❌");
console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY ? "Loaded ✅" : "Missing ❌");

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.28", // Match your contract's pragma
      },
    ],
  },
  networks: {
    sepolia: {
      url: process.env.INFURA_URL, // From your .env
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};

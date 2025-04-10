import { getContract } from "./contract.js";

document.getElementById("approveBtn").addEventListener("click", async () => {
  const tokenId = document.getElementById("tokenId").value;
  const status = "Approved";  // you can use "Rejected" as well

  const contract = await getContract();
  const tx = await contract.setReviewStatus(tokenId, status);
  await tx.wait();
  alert("Review status set successfully!");
});

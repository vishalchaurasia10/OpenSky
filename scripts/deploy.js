const hre = require("hardhat");

async function main() {
  const Upload = await hre.ethers.getContractFactory("Upload");
  const upload = await Upload.deploy();
  const Nft = await hre.ethers.getContractFactory("NFT");
  const nft = await Nft.deploy();
  const Share = await hre.ethers.getContractFactory("Share");
  const share = await Share.deploy();

  await nft.deployed();
  // await nft.deployed();
  // await share.deployed();

  console.log("NFT Library deployed to:", nft.address);
  console.log("Upload Library deployed to:", upload.address);
  console.log("Share Library deployed to:", share.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
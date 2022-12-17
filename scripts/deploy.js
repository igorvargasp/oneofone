const { ethers } = require("hardhat");

async function main() {
  const auction = await ethers.getContractFactory("Auction");
  const auctionContract = await auction.deploy(
    "0xdD56af0D29aeA87EEc23b108f1890AB2A19BcD8E",
    "teste",
    0,
    "teste",
    "teste"
  );
  console.log("Auction deployed to:", auctionContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//0xfd3E5C401068F1d71afe79Ab35f8b99874FA11C8 deployed

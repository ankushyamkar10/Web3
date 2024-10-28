const hre = require("hardhat");

async function main() {

    const NFTContractFactory = await hre.ethers.getContractFactory(
      "NFTMarketplace"
    );
    const NFTContract = await NFTContractFactory.deploy();

    await NFTContract.waitForDeployment();
    console.log("Transactions address: ", NFTContract.target);
    
}

const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  runMain();
  

//   0x746EBac593845cd795D79Df650B70E961C83752e
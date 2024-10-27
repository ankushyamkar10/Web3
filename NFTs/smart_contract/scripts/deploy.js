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
  

//   0x05668629FDF653D7D684a33A5B36FCc6F2B6731E
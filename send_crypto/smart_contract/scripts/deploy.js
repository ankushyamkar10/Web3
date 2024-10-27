const hre = require('hardhat');

const main = async () => {
  const transactionsFactory = await hre.ethers.getContractFactory("Transactions");
  const transactionsContract = await transactionsFactory.deploy();

  // Wait for the deployment to be completed
  await transactionsContract.waitForDeployment();

  console.log("Transactions address: ", transactionsContract.target); // Use .target instead of .address in ethers v6
};

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

require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  paths:{
    sources : "./contracts",
    artifacts : "./artifacts"
  },
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/-cRAeZTK6EQK4eWKF2L7zDJUqhMyvOAg",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};

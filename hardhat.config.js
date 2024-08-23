require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()
// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    matic: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    baseGoerli: {
      url: `${process.env.BASE_GOERLI_ALCHEMY_API_URL}`,
      accounts: {
        mnemonic,
      },
    },
  },
};

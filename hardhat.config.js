const dotenv = require("dotenv");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
dotenv.config();
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
      compilers: [
          {
              version: "0.8.4",
              settings: {
                  optimizer: {
                      enabled: true,
                      runs: 500,
                  },
              },
          },
          {
              version: "0.7.6",
              settings: {
                  optimizer: {
                      enabled: true,
                      runs: 500,
                  },
              },
          },
          {
              version: "0.4.23",
              settings: {
                  optimizer: {
                      enabled: true,
                      runs: 500,
                  },
              },
          },
      ],
  },
  networks: {
    localhost: {
        chainId: 31337, // Chain ID should match the hardhat network's chainid
        forking: {
            url: `https://mainnet.infura.io/v3/7fc5b156ba264dc7a266365c52d9e6c7`,
        },
        loggingEnabled: true,
    },
    hardhat: {
        forking: {
            url: `https://mainnet.infura.io/v3/7fc5b156ba264dc7a266365c52d9e6c7`,
        },
    },
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 21,
    outputFile: "./gasReporting.md",
    noColors: true,
  },
};

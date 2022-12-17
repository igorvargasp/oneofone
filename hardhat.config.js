const { default: getConfig } = require("next/config");

/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: "https://eth-goerli.alchemyapi.io/v2/JauDXZnKCrkY2TTR9DZtrJwWAFCldVlr",
      accounts: [
        `0x94649442a4ad3dc7c2756f91401b66a3c04859d94164b55e615b9100d96da697`,
      ],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "RG4JJ4GNR5NY44PYUVHWN42H8CPY3ARP8P",
  },
};

require("@nomicfoundation/hardhat-toolbox");
require('hardhat-deploy')
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork:"hardhat",
  networks:{
    hardhat:{
      chainId:31337,
      blockConfirmations:1
    },
    localhost:{
      chainId:31337,
      blockConfirmations:1
    },
    goerli:{
      chainId:5,
      url: process.env.GOERLI_RPC_URL,
      blockConfirmations:5,
      accounts:[process.env.PRIVATE_KEY]
    },
    ['Polygon zkEVM Testnet']:{
      chainId:1422,
      url: process.env.POLYGON_RPC_URL,
      blockConfirmations:5,
      accounts:[process.env.PRIVATE_KEY]
    }
  },
  namedAccounts:{
    deployer:{
      default:0
    },
    player:{
      default:1
    }
  },
  etherscan: {
    apiKey: {
      goerli:process.env.ETHERSCAN_API_KEY
    }
  },
  mocha: {
    timeout: 40000
  }
};

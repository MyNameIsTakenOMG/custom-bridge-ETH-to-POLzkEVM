// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// const hre = require("hardhat");

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//   const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

//   const lockedAmount = hre.ethers.utils.parseEther("1");

//   const Lock = await hre.ethers.getContractFactory("Lock");
//   const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//   await lock.deployed();

//   console.log(
//     `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
//   );
// }

require('dotenv').config()
const abis = require('../contracts-abis.json')
const addresses = require('../contracts-addresses.json')
const { ethers } = require('hardhat')

const main = async()=>{
  // mint some eth tokens
  const private_key = process.env.PRIVATE_KEY
  const alchemyGoerliProvider = new ethers.providers.AlchemyProvider('goerli',process.env.ALCHEMY_API_KEY)
  const ethBridge = new ethers.Contract(addresses.EthBridge,abis.EthBridgeAbi,alchemyGoerliProvider)
  const polygonZkEVMProvider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_RPC_URL)
  const polSigner = new ethers.Wallet(private_key, polygonZkEVMProvider)
  const polBridge = new ethers.Contract(addresses.PolBridge,abis.PolBridgeAbi,polSigner)
  console.log('listening on eth bridge...')
  ethBridge.on('EthMint', (to, amount)=>{
    console.log('eth mint event')
    console.log('to: ', to.toString())
    console.log('amount: ', amount.toString())
  })
  ethBridge.on('EthBurn',async(to,amount)=>{
    console.log('eth burn event')
    console.log('to: ', to.toString())
    console.log('amount: ', amount.toString())
    // call polbridge to mint tokens on Polygon zkEVM testnet
    const tx = await polBridge.callMint(polSigner.address, amount)
    const txReceipt = await tx.wait()
    console.log('tx receipt:', txReceipt)
    console.log('token transferred successfully: ')
  })
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

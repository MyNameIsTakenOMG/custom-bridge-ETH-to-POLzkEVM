const { ethers } = require('ethers')
const addresses = require('../contracts-addresses.json')
const abis = require('../contracts-abis.json')
 
require('dotenv').config()

const transferToken = async()=>{
    const private_key = process.env.PRIVATE_KEY
    const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_RPC_URL)
    const signer = new ethers.Wallet(private_key,provider)
    const ethBridge = new ethers.Contract(addresses.EthBridge,abis.EthBridgeAbi,signer)
    console.log('signer address: ', signer.address)
    // mint tokens on ethereum
    const tx = await ethBridge.callMint(signer.address, BigInt(100*1e18),{gasLimit:5000000})
    await tx.wait()
    console.log('minted 100 tokens')
    // burn tokens on ethereum
    const tx1 = await ethBridge.callBurn(signer.address, BigInt(100*1e18),{gasLimit:5000000})
    await tx1.wait()
    console.log('burned 100 tokens')
}

transferToken()
.catch(err=>{
    console.log(err)
    process.exit(1)
})
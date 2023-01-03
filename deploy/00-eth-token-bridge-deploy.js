const { network } = require("hardhat")
const {verify} = require('../utils/verify')
const fs = require('fs')

module.exports = async({getNamedAccounts, deployments})=>{
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()
    const ethTokenArgs = []
    log('starting eth token deployment-------------------')
    const ethTokenResult = await deploy('EthToken',{
        from:deployer,
        log:true,
        args:ethTokenArgs,
        waitConfirmations: network.config.blockConfirmations
    })
    log('finished eth token deployment----------------')
    log('starting veifying eth token-----------------')
    await verify(ethTokenResult.address, ethTokenArgs)
    log('done veifying eth token-----------------')
    log('starting eth bridge deployment----------------')
    const ethBridgeResult = await deploy('EthBridge',{
        from:deployer,
        log:true,
        args:[ethTokenResult.address],
        waitConfirmations: network.config.blockConfirmations
    })
    log('finished eth bridge deployment----------------')
    log('starting eth bridge verify-------------------')
    await verify(ethBridgeResult.address,[ethTokenResult.address])
    log('done eth bridge verify----------------')
    const addresses = {
        EthToken:ethTokenResult.address,
        EthBridge:ethBridgeResult.address
    }
    console.log('addresses:', addresses)
    fs.writeFileSync('contracts-addresses.json', JSON.stringify(addresses), 'utf8', err=>{
        if(err) throw err;
    })
    let addr = fs.readFileSync('contracts-addresses.json','utf8');
    addr = JSON.parse(addr);
    console.log('addr: ',addr)
}

module.exports.tags = ['eth']
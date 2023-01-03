const { network } = require("hardhat")
const fs = require('fs')

module.exports = async({getNamedAccounts,deployments})=>{
    const {deploy,log} = deployments
    const {deployer} = await getNamedAccounts()
    const polTokenArgs = []
    log('started pol token deployment-----------------------')
    const polTokenResult = await deploy('PolToken',{
        from: deployer,
        args:polTokenArgs,
        log:true,
        waitConfirmations: network.config.blockConfirmations
    })
    log('finished pol token deployment--------------------')
    log('starting pol bridge deployment--------------------')
    const polBridgeResult = await deploy('PolBridge',{
        from: deployer,
        args:[polTokenResult.address],
        log:true,
        waitConfirmations: network.config.blockConfirmations
    })
    log('finished pol bridge deployment--------------------')
    let addresses = fs.readFileSync('contracts-addresses.json', 'utf8')
    addresses = JSON.parse(addresses)
    addresses.PolToken = polTokenResult.address
    addresses.PolBridge = polBridgeResult.address
    console.log('addresses:', addresses)
    fs.writeFileSync('contracts-addresses.json', JSON.stringify(addresses), 'utf8', err=>{
        if(err) throw err;
    })
}

module.exports.tags = ['pol']
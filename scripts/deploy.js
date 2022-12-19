const { ethers } = require('hardhat')
const fs = require('fs')

async function main() {
  const base_uri = 'https://ipfs.io/ipfs/QmTWbe9wDns7aqZQNCuWh5PqybGbBF91kngC5Zf8qmCoyg/'
  // const base_uri= 'https://gateway.pinata.cloud/ipfs/QmQSDnUffJHfoMESiohHCoqGvGZi7tqtWEGTY56ddNzQnA/';
  
  const Contract = await ethers.getContractFactory('Avatar')
  const contract = await Contract.deploy('AVATR NFT', 'AVT', base_uri)

  await contract.deployed()

  const address = JSON.stringify({ address: contract.address }, null, 4)
  fs.writeFile('./src/abis/contractAddress.json', address, 'utf8', (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Deployed contract address', contract.address)
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
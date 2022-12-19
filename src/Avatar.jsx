import React from 'react'
import abi from './abis/src/contracts/Avatar.sol/Avatar.json'
import address from './abis/contractAddress.json'

import { getGlobalState, setGlobalState } from './store/index'
import { ethers } from 'ethers'



const { ethereum } = window
const contractAddress = address.address
const contractAbi = abi.abi
const opensea_uri = `https://testnets.opensea.io/assets/goerli/${contractAddress}/`



//1. Retrieving contract from chain
const getEtheriumContract = () => {
    const connectedAccount = getGlobalState('connectedAccount')

    if (connectedAccount) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractAbi, signer)

        return contract
    } else {
        return getGlobalState('contract')
    }
}


//   2.
// Checking connection status
const isWallectConnected = async () => {
    try {
        if (!ethereum) return alert('Please install Metamask')
        const accounts = await ethereum.request({ method: 'eth_accounts' })

        //if chainId is changed
        window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload()
        })

        window.ethereum.on('accountsChanged', async () => {
            setGlobalState('connectedAccount', accounts[0])
            await isWallectConnected()
        })

        //there must be one metamask account
        if (accounts.length) {
            setGlobalState('connectedAccount', accounts[0])
        } else {
            alert('Please connect wallet.')
            console.log('No accounts found.')
        }
    } catch (error) {
        reportError(error)
    }
}


//3 . connect wallet function

const connectWallet = async () => {
    try {
        if (!ethereum) return alert('Please install Metamask')
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        setGlobalState('connectedAccount', accounts[0])
    } catch (error) {
        reportError(error)
    }
}

//4.Minting NFT Function
const payToMint = async () => {
    try {
        if (!ethereum) return alert('Please install Metamask')
        const connectedAccount = getGlobalState('connectedAccount')
        const contract = getEtheriumContract()
        const amount = ethers.utils.parseEther('0.001')


        //from smart contract
        await contract.payToMint({
            from: connectedAccount,
            value: amount._hex,
        })

        // await contract.loadNfts()
        window.location.reload()

    } catch (error) {
        reportError(error)
    }
}

//5. loading NFTs 
const loadNfts = async () => {
    try {
        if (!ethereum) return alert('Please install Metamask')

        const contract = getEtheriumContract()
        const nfts = await contract.getAllNFTs() // get all nft details

        // console.log(structuredNfts(nfts));
        setGlobalState('nfts', structuredNfts(nfts))
    } catch (error) {
        reportError(error)
    }
}


//error reporting function
const reportError = (error) => {
    console.log(error.message)
    throw new Error('No ethereum object.')
}

// 6.Restructuring function
const structuredNfts = (nfts) =>
    nfts
        .map((nft) => ({
            id: Number(nft.id),
            url: opensea_uri + nft.id,
            buyer: nft.buyer,
            imageURL: nft.imageURL,
            cost: parseInt(nft.cost._hex) / 10 ** 18,
            timestamp: new Date(nft.timestamp.toNumber()).getTime(),
        }))
        .reverse()


// Exporting Interface Functions
export {
    isWallectConnected,
    connectWallet,
    payToMint,
    loadNfts
}





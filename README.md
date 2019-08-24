# Udacity Blockchain Capstone

The capstone project is to build a decentralized real estate marketplace.

## Live deployment

1. The contract ([SolnSquareVerifier](./eth-contracts/contracts/SolnSquareVerifier.sol)) is deployed on Rinkeby ETH test network at [0xF8E09031c37a62c47Aa85bD6c5dC5B45FB8058DE](https://rinkeby.etherscan.io/address/0xF8E09031c37a62c47Aa85bD6c5dC5B45FB8058DE)

2. The deployment log is in [rinkeby_deployment.txt](./rinkeby_deployment.txt)

3. 10 tokens [were minted](https://rinkeby.etherscan.io/address/0xF8E09031c37a62c47Aa85bD6c5dC5B45FB8058DE#events) using different proofs generated via Zokrates

4. OpenSea marketplace has been setup for deployed contract & can be viewed at https://rinkeby.opensea.io/assets/unidentified-contract-112

5. 5 properties have been put for sale & sold to [0xfb46d5153b469aacabb71106a5ea5efd0719eb79](https://rinkeby.opensea.io/accounts/0xfb46d5153b469aacabb71106a5ea5efd0719eb79)

## Install

To install, download or clone the repo, then:

    npm install
    truffle compile

## Test

To run truffle tests:

    truffle test

## Deploying

- Create a .env file (in [eth-contracts](./eth-contracts)) with `MNEMONIC` & [Infura](https://infura.io) `ENDPOINT_KEY`
- `truffle compile`
- `truffle migrate --network rinkeby`

## Zokrates

Refer to the [Zokrates howto](./zokrates/howto.md)

## Dependencies

* NodeJS (v10.16.0)
* Truffle (v5.0.32)
* Ganache-cli (v6.6.0, core v2.7.0)
* Web3.js (v1.2.1)
* Solidity (solc-js v0.5.11)

## Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)

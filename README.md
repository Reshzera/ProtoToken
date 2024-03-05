# ProtoToken Solidity Project

## Project Overview

ProtoToken is an ERC-20 like smart contract implemented in Solidity. It represents a basic token system with standard token functionalities, including transferring tokens, approving expenditure, and handling allowances. The token has a fixed supply and no additional tokens can be created post-deployment.

## Features

- ERC-20 like token functionalities.
- Fixed token supply upon deployment.
- Functions to handle balance inquiries, token transfers, approvals, and allowances.

## Installation

Follow these steps to get started with the ProtoToken project:

1. Clone the repository to your local machine.
2. Install dependencies with `npm install` or `yarn install`.
3. Create a `.env` file to store your private keys and network information securely.

## Usage

You can use the following npm scripts to interact with the smart contract:

- `npm run compile`: Compiles the smart contract.
- `npm run test`: Executes the test suite with coverage analysis.
- `npm run start`: Starts a local development node.
- `npm run deploy:sepolia`: Deploys the contract to the Sepolia testnet.
- `npm run deploy:dev`: Deploys the contract to a local development network.

## Contract Functions

- `balanceOf`: Queries the balance of a given address.
- `transfer`: Transfers tokens to a given address.
- `approve`: Approves another address to spend a specified amount of tokens on your behalf.
- `allowance`: Returns the remaining number of tokens that an allowance holder is allowed to spend on behalf of an owner.
- `transferFrom`: Transfers tokens from one address to another using an allowance.

## Requirements

- Node.js
- A package manager like npm or yarn
- Hardhat for Ethereum development tasks

## Configuration

The smart contract can be configured for various networks. This can be set in the `hardhat.config.js` file using the network details and private keys stored in your `.env` file.

## Contributing

If you're interested in contributing to the project, please fork the repository, create a feature branch, and submit a pull request for review.

## License

This project is licensed under the terms of the MIT license.

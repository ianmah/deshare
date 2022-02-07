# deShare

Our team members, being brand new to web3, wanted to remake a web2 product we love in web3.

Enter deShare, a sharing platform that is completely decentralized, onchain. It is deployed via smart contracts on the Polygon network.

deShare works off of two NFTs, deShare Posts and deShare Members.

To create a post, a user must hold a deShare Member NFT. This is to prevent bot wallets from creating spam posts. As well, only members may upvote posts, also to prevent bots from spamming the upvotes.

For now member tokens can be minted by anyone, but before deploying to mainnet we would like to iron out our token economics first. We ideated many ways to distribute deShare Member NFTs, but for now we think a random lottery could work - every week, our smart contract could choose a random selection of wallets that are allowed to invite 3 members.

### How it's made

Writing contract to contract interaction in our first days using Solidity was a fun challenge but we pulled it off. 

Our Posts NFTs have a few additional features to ERC721 - upvotes (which emit custom log events with the updated vote count to enable dApps to quickly get updated vote counts, and custom user created post metadata)

Our frontend was completely built from scratch, first designed in Figma, then built in React. Our React app is deployed on Firebase, and uses ethers.js to interact with the blockchain. We only use ethers to write to smart contracts, ie minting member tokens and minting posts. 

When a user creates a new post, this first uploads the post title and description to an ipfs storage. Then the metadata uri is used to mint a deShare Post (using ethers.js)

To display all the posts efficiently without needing to read directly from the blockchain, we used Covalent. We take advantage of the Class-A/Get-NFT-token-IDs-for-contract/ endpoint (and the starting/ending block to display newer posts) and the Class-A/Get-NFT-external-metadata-for-contract/ endpoint to get the posts name and description. We also wanted to use Class-A/Get-log-events-by-topic-hash(es)/ to view our custom Upvote event (has newest upvote count) emitted from our smart contract, but the endpoint was not working (the decoded info was null)

## Getting Started

You will need Metamask installed on Google Chrome, connected to Polygon Mumbai network

`npm install` to install all dependencies

`npx hardhat compile` to compile smart contract

`npx hardhat run scripts/deploy.js --network polygon_mumbai` to deploy smart contract

`npx hardhat run scripts/verify.js --network polygon_mumbai` to verify smart contract





## Frontend

`npx hardhat compile` to compile smart contracts

copy the `artifacts/` folder to `frontend/src`

`cd frontend`

`npm install` install deps

`npm start` run react app at http://localhost:3000/

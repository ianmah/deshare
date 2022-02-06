const fs = require('fs');
const { NFTStorage, File } = require("nft.storage");

require("dotenv").config();
const { NFTSTORAGE_KEY } = process.env;
const client = new NFTStorage({ token: NFTSTORAGE_KEY });

// async function test() {
//     const data = await fs.promises.readFile('./scripts/assets/post.png')
//     console.log(data)
// }
// test()

async function main() {
    const metadata = await client.store({
        name: "deShareMember",
        description: "deShare is a decentralized sharing platform, for sharing stories, projects, or whatever you wish.",
        image: new File(
            [await fs.promises.readFile('./scripts/assets/post.png')],
            'post.png',
            {
              type: 'image/png',
            }
          ),
    })
    console.log('IPFS URL for the metadata:', metadata.url)
    console.log('metadata.json contents:\n', metadata.data)
    console.log(
      'metadata.json contents with IPFS gateway URLs:\n',
      metadata.embed()
    )
    const metadataURI = metadata.url.replace(/^ipfs:\/\//, "");
    console.log(metadataURI)
  }

main()


//        bafyreie3pxhmo2glhz6knocut227hgyy5o2jumj5uslyle6bwjnc2ujyhi/metadata.json
// ipfs://bafyreie3pxhmo2glhz6knocut227hgyy5o2jumj5uslyle6bwjnc2ujyhi/metadata.json
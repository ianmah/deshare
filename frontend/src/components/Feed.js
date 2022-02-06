import { useEffect, useState } from 'react'
import styled from 'styled-components'
import UpIcon from './UpIcon'
import { ADDR_POST, ADDR_MEMBER } from '../constants'

const Post = styled.div`
    margin-top: 1em;
    background: #fff;
    padding: 1.5em;
    overflow: auto;
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(145, 55, 236, 0.19);
    font-size: 1em;
    font-size: 13px;
    display: flex;
    flex-direction: row;
`

const PostTitle = styled.h2`
    font-size: 18px;
    margin: 0;
    font-weight: normal;
`

const Feed = ({ contract }) => {
    const [nfts, setNfts] = useState([])

    useEffect(() => {
        if (nfts.length > 0) { return }
        (async () => {
            // const url = new URL(`https://api.covalenthq.com/v1/80001/events/address/${address}/`);
            let url = new URL(`https://api.covalenthq.com/v1/80001/tokens/${ADDR_POST}/nft_token_ids/`);
            url.search = new URLSearchParams({
                key: process.env.REACT_APP_COVALENT_KEY
            })
            let resIds = await (await fetch(url)).json()
            const tokenCount = resIds.data.items.length
            const newNfts = []

            for (let i = 1; i < tokenCount + 1; i++) {
                const urlPath = new URL(`https://api.covalenthq.com/v1/80001/tokens/${ADDR_POST}/nft_metadata/${i}/`);
                urlPath.search = new URLSearchParams({
                    key: process.env.REACT_APP_COVALENT_KEY
                })
                const res = await (await fetch(urlPath)).json()
                Object.values(res.data.items).forEach((item) => {
                    console.log(item)
                    newNfts.unshift({
                        ...item.nft_data[0].external_data,
                        ...item.nft_data[0]
                    })
                })

            }
            setNfts(newNfts)
        })();
    }, [nfts.length])

    return (
        <>
            {
                nfts.map(nft => (
                    <Post key={nft.token_id}>
                        <div style={{ marginRight: '1em' }}>
                            <UpIcon/>
                        </div>
                        <div>
                            <PostTitle>{String(nft.name)}</PostTitle>
                            <p>{String(nft.description)}</p>
                            Posted by: {nft.original_owner}
                        </div>
                    </Post>
                ))
            }
        </>
    )
}

export default Feed
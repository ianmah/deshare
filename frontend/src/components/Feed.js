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

            const url = new URL(`https://api.covalenthq.com/v1/80001/tokens/${ADDR_POST}/nft_metadata/1/`);
            url.search = new URLSearchParams({
                key: process.env.REACT_APP_COVALENT_KEY
            })
            const res = await (await fetch(url)).json()
            const newNfts = Object.values(res.data.items).map((item) => {
                // console.log(item.nft_data[0])
                return {
                    ...item.nft_data[0].external_data,
                    ...item.nft_data[0]
                }
            })
            console.log(newNfts)
            setNfts(newNfts)
        })();
    }, [nfts.length])

    return (
        <>
            {
                nfts.map(nft => (
                    <Post key={nft.name}>
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
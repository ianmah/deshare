import { useEffect, useState } from 'react'
import styled from 'styled-components'
// import Button from './Button'

const Container = styled.div`
    background: #fff;
    padding: 1em;
    overflow: auto;
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(145, 55, 236, 0.19);
`

const Feed = ({ contract }) => {
    const [nfts, setNfts] = useState([])

    const address = '0xa3b36abbfb2436055e94614b31cda05336893ec7'

    const url = new URL(`https://api.covalenthq.com/v1/80001/tokens/${address}/nft_metadata/1/`);
    url.search = new URLSearchParams({
        key: process.env.REACT_APP_COVALENT_KEY
    })

    // console.log(address)

    useEffect(() => {
        (async () => {
            const res = await (await fetch(url)).json()
            console.log(res.data.items)
        })();
    }, [])

    return (
        <Container>
            hi
        </Container>
    )
}

export default Feed
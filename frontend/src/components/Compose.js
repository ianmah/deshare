import { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'
import { create } from 'ipfs-http-client'

const client = create('https://ipfs.infura.io:5001/api/v0')

const Container = styled.div`
    background: #fff;
    padding: 1em;
    overflow: auto;
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(145, 55, 236, 0.19);
`

const StyledInput = styled.textarea`
    box-sizing: border-box;
    resize: none;
    font-size: 1em;
    height: ${p => p.height || 3}em;
    width: 100%;
    padding-bottom: 1em;
`
const StyledButton = styled(Button)`
    float: right;
`

const Compose = ({ contract }) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async () => {
        if (!name || !description) {
            alert('please fill out fields')
            return
        }
        
        const metadata = await client.add(JSON.stringify({
            name,
            description,
            image: "ipfs://bafybeianea3jwwkzbjolf2fkb2qk2qfhi3f73yoegqtdnsa55lcdvixezm/post.png"
        }))

        console.log(metadata.path)
        await contract.mintItem(metadata.path)
        setName('')
        setDescription('')
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <StyledInput
                    value={name}
                    placeholder="Title"
                    style={{ overflow: 'hidden' }}
                    height={2}
                    onChange={e => setName(e.target.value)}
                />
                <StyledInput
                    value={description}
                    placeholder="What's happening?"
                    onChange={e => setDescription(e.target.value)}
                />
            </form>
            <hr/>
            <StyledButton onClick={handleSubmit}>Post</StyledButton>
        </Container>
    )
}

export default Compose
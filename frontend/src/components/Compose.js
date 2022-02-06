import styled from 'styled-components'
import Button from './Button'

const Container = styled.div`
    background: #fff;
    padding: 1em;
    overflow: auto; 
    border-radius: 15px;
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

const Navbar = ({  }) => {
    return (
        <Container>
            <StyledInput placeholder="Title" style={{ overflow: 'hidden' }} height={2} />
            <StyledInput placeholder="What's happening?" />
            <hr/>
            <StyledButton>Post</StyledButton>
        </Container>
    )
}

export default Navbar
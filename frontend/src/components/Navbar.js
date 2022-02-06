import styled from 'styled-components'
import Button from './Button'

const Container = styled.div`
    background: #fff;
    height: 48px;
    display: flex;
    align-items: center;
    padding: 1em;
`

const StyledImg = styled.img`
    height: 36px;
`

const Title = styled.h1`
    font-size: 24px;
    padding-left: 8px;
`

const AddressContainer = styled.p`
    background: #e4baff;
    border-radius: 15px;
    padding: 0.5em;
    color: #672491;
    margin-left: auto;
`

const StyledButton = styled(Button)`
    margin-left: auto;
`

const Navbar = ({ wallet, connectWallet }) => {
    return (
        <Container>
            <StyledImg src="/deshare.png"/>
            <Title>DeShare</Title>
            {
                wallet.address ? 
                <AddressContainer>
                    {wallet.address}
                </AddressContainer> :
                <StyledButton onClick={connectWallet}>Connect Wallet</StyledButton>
            }
        </Container>
    )
}

export default Navbar
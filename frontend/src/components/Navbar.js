import styled from 'styled-components'

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

export default ({ wallet }) => {
    return (
        <Container>
            <StyledImg src="/deshare.png"/>
            <Title>DeShare</Title>
            <AddressContainer>
                {wallet.address}
            </AddressContainer>
        </Container>
    )
}
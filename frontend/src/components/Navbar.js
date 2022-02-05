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

export default () => {
    return (
        <Container>
            <StyledImg src="/deshare.png"/>
            <Title>DeShare</Title>
        </Container>
    )
}
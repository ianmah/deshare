import styled from 'styled-components'

const StyledButton = styled.button`
    padding: 1em;
    background: #c673fb;
    color: white;
    border-radius: 15px;
    font-size: 0.8em;

    &:hover {
        background: #d99cff;
        cursor: pointer;
    }
`

export default ({ children, ...props }) => {
    return (
        <StyledButton {...props} >
            {children}
        </StyledButton>
    )
}
import styled from 'styled-components'

const StyledButton = styled.button`
    padding: 1em;
    background: #5726AE;
    color: white;
    border-radius: 10px;
    font-size: 0.8em;
    transition: all 100ms;

    &:hover {
        background: #6826DD;
        cursor: pointer;
        box-shadow: 0px 2px 3px rgba(87, 38, 174, 0.39);
    }
`

const Button = ({ children, ...props }) => {
    return (
        <StyledButton {...props} >
            {children}
        </StyledButton>
    )
}

export default Button
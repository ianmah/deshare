import React from 'react'
import styled from 'styled-components'

const StyledSvg = styled.svg`
    height: 32px;
    width: 32px;
    transition: all 150ms;
    &:hover {
        cursor: pointer;
        fill: #6826DD;
        transform: translateY(-2px);
        filter: drop-shadow( 0px 4px 2px rgba(87, 38, 174, 0.3));
    }
`

const SVG = ({ color }) => {
    return <StyledSvg data-icon="angle-up" class="svg-inline--fa fa-angle-up fa-w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path></StyledSvg>
}

export default SVG
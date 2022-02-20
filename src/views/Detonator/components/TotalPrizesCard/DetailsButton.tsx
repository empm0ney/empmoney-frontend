import React from 'react'
import styled from 'styled-components'
import ChevronDownIcon from '../../../../components/icons/ChevronDown'
import { Text } from '../../../../components/Text'

export interface DetailsButtonProps {
  onClick?: () => void
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (pointer:none), (pointer:coarse) {
    display: none;
  }

  svg {
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const DetailsButton: React.FC<DetailsButtonProps> = ({ onClick }) => {
  return (
    <Wrapper onClick={() => onClick()}>
      <Text color="#155aca" bold>
        Details
      </Text>
      <ChevronDownIcon />
    </Wrapper>
  )
}

export default DetailsButton

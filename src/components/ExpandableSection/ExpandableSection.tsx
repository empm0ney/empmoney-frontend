import React from 'react'
import styled from 'styled-components'
import ChevronDown from '../icons/ChevronDown'
import { Text } from '../Text'
import ChevronUp from '../icons/ChevronUp'

export interface ExpandableSectionProps {
  expanded?: boolean
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #1d48b6;

  svg {
    fill: #1d48b6;
  }
`

const ExpandableSection: React.FC<ExpandableSectionProps> = ({ expanded }) => {
  return (
    <Wrapper aria-label="Hide or show expandable content">
      <Text color='#1d48b6' bold>
        {expanded ? 'Hide' : 'Details'}
      </Text>
      {expanded ? <ChevronUp /> : <ChevronDown />}
    </Wrapper>
  )
}

ExpandableSection.defaultProps = {
  expanded: false,
}

export default ExpandableSection

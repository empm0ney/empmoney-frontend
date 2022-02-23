import React from 'react'
import styled from 'styled-components'
import CardValue from './CardValue'
import { Text } from '../../../components/Text'

export interface PrizeGridProps {
  totalUsers?: string | number
  totalDeposited?: string | number
  totalRewards?: string | number
  largestPrize?: string | number
  largestDeposit?: string | number
  largestDepositor?: string
  glassPrice?: string | number
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, auto);
`

const RightAlignedText = styled(Text)`
  text-align: right;
`

const Copy = styled.div`
  :hover {
    cursor: pointer;
  }
`

const GridItem = styled.div<{ marginBottom?: string }>`
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '4px')};
`

const parseAddr = (addr: string) => {
  return addr === '0x' || addr === 'None'
    ? addr
    : `${addr.substring(0, 5)}...${addr.substring(addr.length - 3, addr.length)}`
}

const copy = (text: string) => {
  if (text) {
    const el = document.createElement('textarea')
    el.value = text
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    alert('Copied to clipboard.')
  }
}

const PrizeGrid: React.FC<PrizeGridProps> = ({
  totalUsers = '0',
  totalDeposited = '0',
  totalRewards = '0',
  largestPrize = '0',
  largestDeposit = '0',
  largestDepositor = 'None',
  glassPrice = '0',
}) => {
  return (
    <Grid>
      {/* 4 matches row */}
      <GridItem style={{marginTop: '-1rem'}}>
        <Text bold fontSize="18px">
          Total Deposited
        </Text>
      </GridItem>
      <GridItem style={{marginTop: '-1rem'}}>
        <RightAlignedText>
          <CardValue value={+(totalDeposited)} fontSize="18px" decimals={2} bold={false} />
          <CardValue color='rgb(189,189,189)' value={+totalDeposited * +glassPrice} fontSize="11px" decimals={0} bold={false} prefix="~$" />
        </RightAlignedText>
      </GridItem>
      {/* 2 matches row */}
      <GridItem>
        <Text bold fontSize="18px">
          Total Claimed
        </Text>
      </GridItem>
      <GridItem>
        <RightAlignedText>
          <CardValue value={Number(totalRewards)} fontSize="18px" decimals={2} bold={false} />
          <CardValue color='rgb(189,189,189)' value={+totalRewards * +glassPrice} fontSize="11px" decimals={0} bold={false} prefix="~$" />
        </RightAlignedText>
      </GridItem>
      <GridItem>
        <Text bold fontSize="18px">
          Largest Prize
        </Text>
      </GridItem>
      <GridItem>
        <RightAlignedText>
          <CardValue value={Number(largestPrize)} fontSize="18px" decimals={2} bold={false} />
          <CardValue color='rgb(189,189,189)' value={+largestPrize * +glassPrice} fontSize="11px" decimals={0} bold={false} prefix="~$" />
        </RightAlignedText>
      </GridItem>
      <GridItem >
        <Text bold fontSize="18px">
          Largest Deposit
        </Text>
      </GridItem>
      <GridItem >
        <RightAlignedText>
          <CardValue value={Number(largestDeposit)} fontSize="18px" decimals={2} bold={false} />
          <Text color='rgb(189,189,189)' fontSize="11px">{parseAddr(largestDepositor)} 💰 ~${(+largestDeposit * +glassPrice).toFixed(0)}</Text>
        </RightAlignedText>
      </GridItem>
      <GridItem marginBottom='0'>
        <Text bold fontSize="18px">
          Total Users
        </Text>
      </GridItem>
      <GridItem marginBottom='0'>
        <RightAlignedText>
          <CardValue value={Number(totalUsers)} fontSize="18px" decimals={0} bold={false} />
        </RightAlignedText>
      </GridItem>
    </Grid>
  )
}

export default PrizeGrid

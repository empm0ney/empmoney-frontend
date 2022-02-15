import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { getDisplayBalance, getBalance, formatBalance, getFullDisplayBalance } from '../../utils/formatBalance'
import { useSortedUsers, useTotalDeposited } from '../../hooks/useDetonator'
import HowItWorks from './components/HowItWorks'
import { BaseLayout } from '../../components/layout'
import { Text } from '../../components/Text'
import { Flex } from '../../components/Flex'
import { CardContent, Card, Button } from '@material-ui/core'
import { Heading } from '../../components/Heading'
import BigNumber from 'bignumber.js'

const Cards = styled(BaseLayout) <{ isMobile?: boolean }>`
  align-items: start;
  margin-bottom: 32px;
  & > div {
    grid-column: ${(props) => (props.isMobile ? 'span 12' : 'span 12')};
  }
`
const StyledCard = styled(Card) <{ isMobile?: boolean }>`
  padding: ${(props) => (props.isMobile ? 'initial' : '2rem')};
`

const StyledText = styled(Text) <{ isMobile?: boolean }>`
  font-size: ${(props) => (props.isMobile ? '11px' : '18px')};
`
const CardHeading = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`
const UserStats = styled.div`
  display: flex;
  flex-direction: column;
`
const RightAlignedText = styled(Text) <{ isMobile?: boolean }>`
  text-align: right;
  font-size: ${(props) => (props.isMobile ? '11px' : '18px')};
`

const GridItem = styled.div<{ marginBottom?: string }>`
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '16px')};
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(auto, auto);
`

const RankingPage: React.FC = () => {
  const { account } = useWallet()
  const [val, setVal] = useState(100)
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const isMobile = width <= 768;

  const sortedUsers = useSortedUsers()
  const totalDeposited = useTotalDeposited()
  const userRank =
    sortedUsers.length > 0 && account && sortedUsers.findIndex((u) => u.address.toLowerCase() === account.toLowerCase()) + 1
  const userShare = userRank && totalDeposited && (+sortedUsers[userRank - 1].total_deposits / +totalDeposited) * 100

  const formatAmount = (amnt: number) =>
    amnt ? getFullDisplayBalance(new BigNumber(amnt)) : 0
  const trimAddr = (addr: string) =>
    addr ? `${addr.substring(0, 5)}...${addr.substring(addr.length - 3, addr.length)}` : ''

  const TopDepositors = (count?: number) => {
    if (!sortedUsers || !sortedUsers[0] || !totalDeposited) return null
    const sortedUsersSlice = count > 0 ? sortedUsers.slice(0, count) : sortedUsers

    return (
      <>
        <Grid style={{ maxHeight: '29rem', overflowY: 'auto' }}>
          <GridItem marginBottom="16px">
            <StyledText isMobile={isMobile} bold>
              Rank
            </StyledText>
          </GridItem>
          <GridItem marginBottom="16px">
            <StyledText isMobile={isMobile} bold>
              User
            </StyledText>
          </GridItem>
          <GridItem marginBottom="16px">
            <StyledText isMobile={isMobile} bold>
              Total Deposited
            </StyledText>
          </GridItem>
          <GridItem marginBottom="16px">
            <StyledText isMobile={isMobile} bold>
              Total Claimed
            </StyledText>
          </GridItem>
          <GridItem marginBottom="16px">
            <StyledText isMobile={isMobile} bold>
              Share
            </StyledText>
          </GridItem>
          {sortedUsersSlice.map((u, i) => {
            return (
              <>
                <GridItem marginBottom="16px">
                  <StyledText isMobile={isMobile} >{`#${i + 1}`}</StyledText>
                </GridItem>
                <GridItem marginBottom="16px">
                  <StyledText isMobile={isMobile} >{`${trimAddr(u?.address)}`}</StyledText>
                </GridItem>
                <GridItem marginBottom="16px">
                  <StyledText isMobile={isMobile} >{formatAmount(+u?.total_deposits)}</StyledText>
                </GridItem>
                <GridItem marginBottom="16px">
                  <StyledText isMobile={isMobile} >{formatAmount(+u?.total_withdraws_scaled)}</StyledText>
                </GridItem>
                <GridItem marginBottom="16px">
                  <StyledText isMobile={isMobile} >{((+u.total_deposits / +totalDeposited) * 100).toFixed(3)}%</StyledText>
                </GridItem>
              </>
            )
          })}
        </Grid>
      </>
    )
  }

  return (
    <>
      <Cards isMobile={isMobile}>
        <Flex>
          <span style={{ margin: 'auto auto' }} />
          <Button className="shinyButton" onClick={() => { setVal(100) }}>Top 100</Button>
          <span style={{ marginRight: '16px' }} />
          <Button className="shinyButton" onClick={() => { setVal(500) }}>Top 500</Button>
          <span style={{ marginRight: '16px' }} />
          <Button className="shinyButton" onClick={() => { setVal(1000) }}>Top 1000</Button>
          <span style={{ margin: 'auto auto' }} />
        </Flex>
        <StyledCard isMobile={isMobile}>
          <CardContent>
            <CardHeading style={{ marginBottom: '4px' }}>
              <Heading size={isMobile ? 'lg' : 'xl'}>Leaderboard</Heading>
              <UserStats>
                <RightAlignedText isMobile={isMobile} bold>
                  Your Rank: #{userRank > 0 ? userRank : '⏳'}
                </RightAlignedText>
                <RightAlignedText isMobile={isMobile} bold>
                  Your Share: {userShare ? userShare.toFixed(3) : '⏳'}%
                </RightAlignedText>
              </UserStats>
            </CardHeading>
          </CardContent>
          <div>{TopDepositors(val)}</div>
        </StyledCard>
      </Cards>
      <HowItWorks />
    </>
  )
}

export default RankingPage

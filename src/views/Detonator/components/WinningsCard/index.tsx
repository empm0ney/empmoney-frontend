import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Card from '../../../../components/Card'
import { Text } from '../../../../components/Text'
import {
  useGetUserInfo, useWhaleTax,
} from '../../../../hooks/useDetonator'
import { formatBalance, getBalance, getFullDisplayBalance } from '../../../../utils/formatBalance'
import ExpandableSection from '../../../../components/ExpandableSection'
import CardValue from '../CardValue'
import { Heading } from '../../../../components/Heading'
import CardFooter from '../../../../components/Card/CardFooter'
import useLpStats from '../../../../hooks/useLpStats'
import CardBody from '../CardBody'
import BigNumber from 'bignumber.js'

const StyledCard = styled(Card)`
  // margin-top: 24px;
`

const CardHeading = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`

const Right = styled.div`
  display: flex;
`

const Left = styled.div`
  display: flex;
`

const StyledImage = styled.div`
  margin-bootom: 16px;
  height: 50px;
  width: 25px;
  background-position center center;
  background-size: 35px;
  background-repeat: no-repeat;
  // background-image: 
`
const PrizeCountWrapper = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
`
const ExpandingWrapper = styled.div<{ showFooter: boolean }>`
  height: ${(props) => (props.showFooter ? '100%' : '0px')};
  display: ${(props) => (props.showFooter ? 'initial' : 'none')};
`
const RightAlignedText = styled(Text)`
  text-align: right;
`
const GridItem = styled.div<{ marginBottom?: string }>`
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '16px')};
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, auto);
`
const Icon = styled.div<{ isMobile?: boolean }>`
  // margin-top: ${(props) => (props.isMobile ? '0' : '8px')};;
  margin-top: 0px;
  font-size: 38px;
`

const WinningsCard = () => {
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

  const [showFooter, setShowFooter] = useState(false)
  const empEthLpStats = useLpStats('EMP-ETH-LP');
  const lpPrice = useMemo(() => (empEthLpStats ? Number(empEthLpStats.priceOfOne).toFixed(2) : null), [empEthLpStats]);

  const whaleTax = useWhaleTax()
  const user = useGetUserInfo()
  const numReferrals = user.num_referrals ? user.num_referrals.toString() : 0
  const lotteryWinnings = user.lottery_winnings ? getFullDisplayBalance(new BigNumber(user.lottery_winnings.toString()).times(95 - whaleTax.toNumber()).div(100)) : 0
  const largestWinnings = user.largest_winnings ? getFullDisplayBalance(new BigNumber(user.largest_winnings.toString()).times(95 - whaleTax.toNumber()).div(100)) : 0
  const referralRewards = user.referral_rewards ? getFullDisplayBalance(new BigNumber(user.referral_rewards.toString()).times(95 - whaleTax.toNumber()).div(100)) : 0
  const totalWinnings = lotteryWinnings && largestWinnings && referralRewards
    ? getFullDisplayBalance((new BigNumber(user.lottery_winnings.toString()).plus(user.largest_winnings.toString()).plus(user.referral_rewards.toString())).times(95 - whaleTax.toNumber()).div(100))
    : 0

  const parseAddr = (addr: string) => {
    return `${addr.substring(0, 5)}...${addr.substring(addr.length - 3, addr.length)}`
  }

  // const pastRandomWinners = useGetPastRandomWinners()
  // const pastRandomWinnerTrim = `${pastRandomWinners.map(x => parseAddr(x)).join(', ')}`

  return (
    <>
      <div style={{ marginTop: '24px' }}>{' '}</div>
      <StyledCard>
        {/* <div > */}
        <CardBody onClick={() => setShowFooter(!showFooter)}>
          <CardHeading style={{ marginBottom: '-13px' }}>
            <Left>
              <Icon isMobile={isMobile}>💎</Icon>
              <PrizeCountWrapper>
                <Text bold fontSize="14px" color="#1d48b6">
                  Your Winnings
                </Text>
                <Heading size="lg"><div style={{ color: 'white' }}><CardValue value={+totalWinnings} fontSize="24px" decimals={2} bold /></div></Heading>
                <CardValue value={+totalWinnings * +lpPrice} fontSize="14px" decimals={2} bold={false} color="rgb(189,189,189)" prefix="~$" />
              </PrizeCountWrapper>
            </Left>
            <Right>
              <ExpandableSection expanded={showFooter} />
            </Right>
          </CardHeading>
        </CardBody>
        {/* </div> */}
        <ExpandingWrapper showFooter={showFooter}>
          <CardFooter>
            <Grid>
              <GridItem>
                <Text bold fontSize="18px">
                  Largest Rewards
                </Text>
              </GridItem>
              <GridItem marginBottom="0">
                <RightAlignedText>
                  <CardValue value={+largestWinnings} decimals={2} fontSize="18px" bold={false} />
                  <CardValue color='rgb(189,189,189)' value={+largestWinnings * +lpPrice} fontSize="11px" decimals={2} bold={false} prefix="~$"/>
                </RightAlignedText>
              </GridItem>
              <GridItem>
                <Text bold fontSize="18px">
                  Lottery Rewards
                </Text>
              </GridItem>
              <GridItem marginBottom="0">
                <RightAlignedText>
                  <CardValue value={+lotteryWinnings} decimals={2} fontSize="18px" bold={false} />
                  <CardValue color='rgb(189,189,189)' value={+lotteryWinnings * +lpPrice} fontSize="11px" decimals={2} bold={false} prefix="~$"/>
                </RightAlignedText>
              </GridItem>
              <GridItem marginBottom="0">
                <Text bold fontSize="18px" marginBottom="0">
                  Referral Rewards
                </Text>
              </GridItem>
              <GridItem marginBottom="0">
                <RightAlignedText marginBottom="0">
                  <CardValue value={+referralRewards} decimals={2} fontSize="18px" bold={false} />
                  <CardValue color='rgb(189,189,189)' value={+referralRewards * +lpPrice} fontSize="11px" decimals={2} bold={false} prefix="~$"/>
                </RightAlignedText>
              </GridItem>
              <GridItem marginBottom="0">
                <Text bold fontSize="18px" marginBottom="0">
                  Num Referrals
                </Text>
              </GridItem>
              <GridItem marginBottom="0">
                <RightAlignedText fontSize="18px" marginBottom="0">
                  <CardValue value={+numReferrals} decimals={0} fontSize="18px" bold={false} />
                </RightAlignedText>
              </GridItem>
              {/* <GridItem marginBottom="0">
              <Text bold fontSize="18px">
                Previous Winners
              </Text>
            </GridItem>
            <GridItem marginBottom="0" style={{marginTop: '2rem'}}>
              <RightAlignedText fontSize="11px">{pastRandomWinnerTrim}</RightAlignedText>
            </GridItem> */}
            </Grid>
          </CardFooter>
        </ExpandingWrapper>
      </StyledCard>
    </>
  )
}

export default WinningsCard

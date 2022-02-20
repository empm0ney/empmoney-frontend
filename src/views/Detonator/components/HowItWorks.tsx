import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Heading } from '../../../components/Heading'
import { Text } from '../../../components/Text'
import { Link } from '../../../components/Link'
import { usePastLargestWinner, usePastRandomWinners } from '../../../hooks/useDetonator'
import { useCurrentTime } from '../../../hooks/useTimer'
import { getLotteryRewardTime } from '../helpers/CountdownHelpers'
import { Button } from '@material-ui/core'

const LayoutWrapper = styled.div`
  max-width: 500px;
  margin: 8px auto 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
`

const Row = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`

const StyledHeading = styled(Heading)`
  margin: 16px 0;
  text-align: center;
`

const StyledImage = styled.div<{ isMobile?: boolean }>`
  align-self: center;
  height: 90px;
  background-position: center center;
  width: ${(props) => (props.isMobile ? '100px' : '130px')};
  background-size: ${(props) => (props.isMobile ? '70px' : '115px')};
  background-repeat: no-repeat;
  background-image: url('./detonator.png');
`
const StyledText = styled(Text)`
  margin-left: 0px; 
  margin-right: 0px;
  font-size: 14px; 
  color: rgb(189,189,189);
  // @media (pointer:none), (pointer:coarse) {
  //   margin-left: 4px; 
  //   margin-right: 4px;
  //   font-size: 16px; 
  // }
`

const StyledLink = styled(Link)`
  align-self: center;
  // margin-top: 16px;
`

const StlyedList = styled.div<{ isMobile?: boolean }>`
  // overflow-y: scroll; 
  // max-height: 10rem; 
  margin-top: 16px; 
  text-align: left;
  margin-left: ${(props) => (props.isMobile ? '12px' : '64px')};
  max-width: ${(props) => (props.isMobile ? '100%' : '26rem')};
`

const Address = styled(Text) <{ isMobile?: boolean }>`
  font-size: ${(props) => (props.isMobile ? '12px' : '14px')};
  color: rgb(189,189,189);
`

const HowItWorks = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const time = useCurrentTime()
  const timeSinceLaunch = time && time / 1000 - 1631505600
  const timeSinceLaunchFormat = timeSinceLaunch && getLotteryRewardTime(timeSinceLaunch)
  const pastLargestWinner = usePastLargestWinner(1)
  const pastRandomWinners = usePastRandomWinners()

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

  return (
    <LayoutWrapper>
      <Heading size="lg" as="h3" style={{ marginTop: '24px' }}>Yesterday's Winners</Heading>
      {(!!pastLargestWinner && pastLargestWinner !== '0x0000000000000000000000000000000000000000') || pastRandomWinners.length > 0 ?
        <StlyedList isMobile={isMobile}>
          <Address isMobile={isMobile}>💰 {pastLargestWinner}</Address>
          {pastRandomWinners.map((x, i) => (<Address isMobile={isMobile} key={i}>🎲 {x}</Address>))}
        </StlyedList>
        : <StyledText marginTop="8px">TBD</StyledText>}
      <Row>
        <StyledImage isMobile={isMobile} />
        <LayoutWrapper>
          <StyledHeading size="lg" as="h3" color="secondary">
            How It Works
          </StyledHeading>
          <StyledText>
            Deposit EMP-ETH LP for burst rewards, instant rewards, daily largest prize, and entry into the daily lottery!
          </StyledText>
          <StyledText>
            💰 DAILY LARGEST DEPOSITOR 💰
          </StyledText>
          <StyledText>
            🎲 DAILY RANDOM DEPOSITOR 🎲
          </StyledText>
          {/* <StyledText>
            If you miss out on the lottery, you will earn  along with various additional rewards.
          </StyledText> */}
          <StyledText>
            Unclaimed rewards are reclaimed by the contract at the end of the day for future rewards.
          </StyledText>
        </LayoutWrapper>
        <StyledImage isMobile={isMobile} />
      </Row>
      <Row>
        <div>{' '}</div>
        <Button className="shinyButton" style={{ width: '8rem' }} onClick={() => window.open('https://pancakeswap.finance/add/0x2170ed0880ac9a755fd29b2688956bd959f933f8/0x3b248CEfA87F836a4e6f6d6c9b42991b88Dc1d58')}>
          EMP-ETH LP
        </Button>
        <div>{' '}</div>
      </Row>
      {/* <Heading size="lg" as="h3" color="secondary">Time Since Launch</Heading> */}
      {/* <StyledText style={{marginTop: '4px'}}>{timeSinceLaunchFormat}</StyledText> */}
      <Text color='rgb(189,189,189)' fontSize="11px" style={{ marginLeft: '5rem', marginRight: '5rem', marginTop: '18px' }}>
        Distribution: 90% reward pool, 6% all depositors (based on total deposits), 3% referrer, 1% Treasury.
      </Text>
      {/* <StyledLink href="https://ourglass2021.gitbook.io/our-glass/the-game">Read more</StyledLink> */}
    </LayoutWrapper>
  )
}

export default HowItWorks


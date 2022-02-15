import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Text } from '../../../components/Text'
import { Link } from '../../../components/Link'
import { yellow } from '../../../theme/colors'
import { Heading } from '../../../components/Heading'
import Container from '../../../components/layout/Container'
import LotteryProgress from './LotteryProgress'

const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })<{ isMobile?: boolean }>`
  color: #155aca;
  margin-bottom: 24px;
  text-align: ${(props) => (props.isMobile ? 'center' : 'left')};
`

const Blurb = styled(Text)<{ isMobile?: boolean }>`
  color: white;
  font-size: 20px;
  font-weight: 600;
  text-align: ${(props) => (props.isMobile ? 'center' : 'left')};
`
const SmallBlurb = styled(Text)`
  color: rgb(189,189,189);
  font-size: 11px;
  font-weight: 1;
`

const StyledHero = styled.div`
  // padding-bottom: 40px;
  // padding-top: 40px;
`

const StyledContainer = styled(Container)<{ isMobile?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
  margin-bottom: ${(props) => (props.isMobile ? '1.5rem' : '1rem')};
`

const LeftWrapper = styled.div`
  flex: 1;
  padding-right: 0;

  @media (pointer:none), (pointer:coarse) {
    padding-right: 24px;
  }

  padding-right: 32px;
`

const RightWrapper = styled.div<{ isMobile?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding-left: 0;
  margin-top: ${(props) => (props.isMobile ? '16px' : '0px')};
`
const StyledLink = styled(Link)`
  align-self: center;
  margin-top: 8px;
`

const Hero = () => {
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

  return (
    <StyledHero>
      <StyledContainer isMobile={isMobile}>
        <LeftWrapper>
          <Title isMobile={isMobile}>Detonator</Title>
          <Blurb isMobile={isMobile}>Deposit your EMP-ETH LP</Blurb>
          <Blurb isMobile={isMobile}>Into the pool and earn back 365%</Blurb>
          {/* <SmallBlurb style={{ paddingTop: '0.5rem' }}>
            Disclaimer: This is a decentralized social experiment | Use at your own risk!
          </SmallBlurb> */}
          {/* <StyledLink href="https://ourglass2021.gitbook.io/our-glass/the-game">Read more</StyledLink> */}
        </LeftWrapper>
        <RightWrapper isMobile={isMobile}>
          <LotteryProgress />
        </RightWrapper>
      </StyledContainer>
    </StyledHero>
  )
}

export default Hero

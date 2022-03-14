import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { BaseLayout } from '../../components/layout'
import { useGetUserInfoTotals, useTotalRewards } from '../../hooks/useDetonator'
import YourPrizesCard from './components/YourPrizesCard'
import UnlockWalletCard from './components/UnlockWalletCard'
import TicketCard from './components/TicketCard'
import TotalPrizesCard from './components/TotalPrizesCard'
import HowItWorks from './components/HowItWorks'
import LotteryCard from './components/LotteryCard'
import WinningsCard from './components/WinningsCard'

const Cards = styled(BaseLayout)<{ isMobile?: boolean }>`
  align-items: start;
  margin-bottom: 0px;
  // padding-left: ${(props) => (props.isMobile ? 'initial' : '64px')};
  // padding-right: ${(props) => (props.isMobile ? 'initial' : '64px')};

  & > div {
    grid-column: ${(props) => (props.isMobile ? 'span 12' : 'span 6')};
  }
`

const SecondCardColumnWrapper = styled.div<{ isAWin?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.isAWin ? 'column' : 'column-reverse')};
  margin-bottom: 0;
`
const FirstCardColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const NextDrawPage: React.FC = () => {
  const { account } = useWallet()
  const [width, setWidth] = useState(window.innerWidth);
  const userTotals = useGetUserInfoTotals()
  const isAWin = userTotals && userTotals.total_deposits && Number(userTotals.total_deposits) > 0;

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
    <>
      <Cards isMobile={isMobile}>
        <div>
          <FirstCardColumnWrapper>
            <TotalPrizesCard />
            <LotteryCard />
            <WinningsCard />
          </FirstCardColumnWrapper>
        </div>
        <SecondCardColumnWrapper isAWin={isAWin}>
          {!account ? (
            <UnlockWalletCard />
          ) : (
            <>
              <YourPrizesCard />
              <TicketCard isSecondCard={isAWin} />
            </>
          )}
        </SecondCardColumnWrapper>
      </Cards>
      {/* <LargestQualifiedCard /> */}
      <HowItWorks />
      {/* legacy page content */}
      {/* <WinningNumbers /> */}
    </>
  )
}

export default NextDrawPage

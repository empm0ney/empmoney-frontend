import React, { useEffect, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { ButtonMenu, ButtonMenuItem } from '../../components/ButtonMenu'
import { useCurrentTime } from '../../hooks/useTimer'
import RankingPage from './RankingPage'
import Hero from './components/Hero'
import NextDrawPage from './NextDrawPage'
import StartTimer from './components/StartTimer'
import Page from '../../components/Page'
import HomeImage from '../../assets/img/background2.jpg';
import useWallet from 'use-wallet'
import UnlockWallet from '../../components/UnlockWallet'
import BannerAd from '../../assets/img/hydro-whales.jpg';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #08090d;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
`

const Detonator: React.FC = () => {
  const time = useCurrentTime()
  const [activeIndex, setActiveIndex] = useState(0)
  const { account } = useWallet();
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

  const startTime = 0 // 1645056900

  const handleClick = (index: number) => {
    setActiveIndex(index)
  }

  if (time && time / 1000 >= startTime) {
    // 6/25/2021 6pm (EST)
    return (
      <>
        <Page>
          <BackgroundImage />
          {!!account ? (<>
            <div style={{ textAlign: 'center', marginTop: '-48px', marginBottom: '2rem' }}>
              <a href="https://hydrowhalesclub.com" target="_blank">
                <img src={BannerAd} alt="emp-logo" style={{ width: isMobile ? '100%' : '60%', maxHeight: '82px' }} />
              </a>
            </div>
            <Hero />
            <Wrapper>
              <ButtonMenu activeIndex={activeIndex} onClick={handleClick} size="sm" variant="subtle">
                <ButtonMenuItem>Detonator</ButtonMenuItem>
                <ButtonMenuItem>Ranking</ButtonMenuItem>
              </ButtonMenu>
            </Wrapper>
            {/* <Divider /> */}
            {activeIndex === 0 ? <NextDrawPage /> : <RankingPage />}
          </>)
            : <UnlockWallet />
          }
        </Page>
      </>
    )
  }

  return (
    <>
      <StartTimer startTime={startTime} />
    </>
  )
}

export default Detonator

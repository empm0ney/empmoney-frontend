import React from 'react'
import styled, { keyframes } from 'styled-components'
import Card from '../../../../components/Card'
import CardContent from '../../../../components/CardContent'
import { getBalance } from '../../../../utils/formatBalance'
import { useTotalRewards } from '../../../../hooks/useDetonator'
import PrizesWonContent from './PrizesWonContent'

const RainbowLight = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`
const StyledOutline = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(225, 225, 225, 1) 10%,
    rgba(200, 200, 200, 1) 20%,
    rgba(175, 175, 175, 1) 30%,
    rgba(150, 150, 150, 1) 40%,
    rgba(125, 125, 125, 1) 50%,
    rgba(100, 100, 100, 1) 60%,
    rgba(75, 75, 75, 1) 70%,
    rgba(50, 50, 50, 1) 80%,
    rgba(25, 25, 25, 1) 90%,
    rgba(0, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 3s linear infinite;
  border-radius: 32px;
  filter: blur(10px);
  position: absolute;
  top: -4px;
  right: -4px;
  bottom: -4px;
  left: -4px;
  z-index: -1;
`
const Wrapper = styled.div<{ isDisabled: boolean }>`
  ${(props) =>
    props.isDisabled 
    ? `
    margin-top: 24px;
    background-color: unset;
    box-shadow: unset;
    position: relative;
    background: #10131e;
    border-radius: 32px;
    box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
    border: 1px solid #10131e;
    @media (pointer:none), (pointer:coarse) {
      margin-top: 24px;
    }
    ` : `
    margin-bottom: 24px;
    position: relative;
    background: #10131e;
    border-radius: 32px;
    box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
    `}
`

const YourPrizesCard: React.FC = () => {
  const rewards = useTotalRewards()

  const winnings = getBalance(rewards)
  const isAWin = winnings > 0

  return (
    <Wrapper isDisabled={!isAWin}>
      {isAWin && <StyledOutline />}
    <Card>
      <CardContent><PrizesWonContent /></CardContent>
    </Card>
    </Wrapper>
  )
}

export default YourPrizesCard

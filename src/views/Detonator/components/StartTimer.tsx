import React from 'react'
import styled from 'styled-components'
import { useCurrentTime } from '../../../hooks/useTimer'
import { getLotteryDrawStep, getLotteryRewardTime, getStep } from '../helpers/CountdownHelpers'
import {Text} from '../../../components/Text'
import {Progress} from '../../../components/Progress'

const ProgressWrapper = styled.div`
  display: block;
  margin: 33% auto auto 25%;
  height: 100%;
  position absolute;
  width: 50%;
`

const TopTextWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const BottomTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const StyledPrimaryText = styled(Text)`
  margin-right: 16px;
`
const StartTimer = ({ startTime }: { startTime: number }) => {
  const time = useCurrentTime()
  const secondsToStart = time && startTime - (time / 1000)
  const timeUntilLotteryDraw = getLotteryRewardTime(secondsToStart, true)

  return (
    <ProgressWrapper>
      <Progress primaryStep={getLotteryDrawStep(secondsToStart)} secondaryStep={getStep()} showProgressBunny />
      <TopTextWrapper>
        <StyledPrimaryText fontSize="20px" bold color='white'>
           {timeUntilLotteryDraw}
        </StyledPrimaryText>
      </TopTextWrapper>
      <BottomTextWrapper>
        <Text color='rgb(189,189,189)'>⚡ Until Launch ⚡</Text>
      </BottomTextWrapper>
    </ProgressWrapper>
  )
}

export default StartTimer

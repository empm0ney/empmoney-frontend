import moment from 'moment'
import React from 'react'
import styled from 'styled-components'
import { Progress } from '../../../components/Progress'
import { Text } from '../../../components/Text'
import { useLotteryTime } from '../../../hooks/useDetonator'
import ProgressCountdown from './ProgressCountdown'
import { getLotteryDrawStep, getLotteryRewardTime, getStep } from '../helpers/CountdownHelpers'

const ProgressWrapper = styled.div`
  display: block;
  width: 100%;
`

const TopTextWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const BottomTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const StyledPrimaryText = styled(Text)`
  margin-right: 16px;
`
const LotteryProgress = () => {
  // const secondsToReward = useTimeToReward()
  // const time = useCurrentTime()
  // const rewardTime = useLargestTime()
  const lotteryTime = useLotteryTime()

  // const secondsToLargest = rewardTime && +rewardTime - Date.now() / 1000
  const secondsToLottery = lotteryTime && +lotteryTime - (Date.now() / 1000)
  // const timeUntilLargestDraw = secondsToLargest && getLotteryRewardTime(secondsToLargest > 0 ? secondsToLargest : 0, true)
  const timeUntilLotteryDraw = secondsToLottery && getLotteryRewardTime(secondsToLottery > 0 ? secondsToLottery : 0, true)

  return (
    <ProgressWrapper>
      <Progress primaryStep={getLotteryDrawStep(secondsToLottery)} secondaryStep={getStep()} showProgressBunny />
      <TopTextWrapper>
        <StyledPrimaryText fontSize="20px" bold color="white">
          <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={new Date(+lotteryTime * 1000)} description="" />
        </StyledPrimaryText>
      </TopTextWrapper>

      <BottomTextWrapper>
        <Text color="rgb(189, 189, 189)">
          Daily Draw @ 12:00am UTC<br />
        </Text>
        {/* <StyledPrimaryText color="rgb(189, 189, 189)">
          Day Ends {timeUntilLotteryDraw}
        </StyledPrimaryText> */}
      </BottomTextWrapper>
    </ProgressWrapper>
  )
}

export default LotteryProgress

import React, { useMemo } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import Card from '../../../../components/Card'
import { Text } from '../../../../components/Text'
import CardContent from '../../../../components/CardContent'
import { useDayDeposits, useDayDripEstimate, useGetUserInfo, useReferralRewards, useTotalDeposited, useWhaleTax } from '../../../../hooks/useDetonator'
import { useCurrentTime } from '../../../../hooks/useTimer'
import { formatBalance, getBalance, getFullDisplayBalance } from '../../../../utils/formatBalance'
import { getLotteryRewardTime } from '../../helpers/CountdownHelpers'
import TicketActions from './TicketActions'
import { Heading } from '../../../../components/Heading'
import CardValue from '../CardValue'
import useLpStats from '../../../../hooks/useLpStats'

interface CardProps {
  isSecondCard?: boolean
}

const StyledCard = styled(Card) <CardProps>`
  ${(props) =>
    props.isSecondCard
      ? `  
        margin-top: 16px;

        @media (pointer:none), (pointer:coarse) {
          margin-top: 24px;
        }
        `
      : ``}
`
const CardHeader = styled.div`
  align-items: center;
  display: flex;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
`
const Row = styled.div`
  display: flex;
`

const TicketCard: React.FC<CardProps> = ({ isSecondCard = false }) => {
  const time = useCurrentTime()
  const empEthLpStats = useLpStats('EMP-ETH-LP');
  const lpPrice = useMemo(() => (empEthLpStats ? Number(empEthLpStats.priceOfOne).toFixed(2) : null), [empEthLpStats]);
  const user = useGetUserInfo()
  const deposits = user.total_deposits_scaled && +user.total_deposits_scaled > 0 ? getFullDisplayBalance(new BigNumber(user.total_deposits_scaled.toString())) : '0'
  // const numReferrals = user.num_referrals ? user.num_referrals.toString() : '0'
  // const dayDeposits = user && rewardTime && +user.deposit_time >= +rewardTime - 86400 ? formatBalance(getBalanceNumber(user.day_deposits) * 1.111111111111111111) : '0'

  // const dayDeposits = getFullDisplayBalance(useDayDeposits())
  // const withdraws = user.total_withdraws ? +getFullDisplayBalance(new BigNumber(user.total_withdraws.toString()).times(0.8)) : 0
  const withdrawsScaled = user.total_withdraws_scaled && +user.total_withdraws_scaled > 0 ? getFullDisplayBalance(new BigNumber(user.total_withdraws_scaled.toString())) : 0

  const whaleTax = useWhaleTax()
  const dayDripEstimate = getFullDisplayBalance(useDayDripEstimate().times(0.8).times(whaleTax.gt(0) ? (100 - whaleTax.toNumber()) / 100 : 1))

  // const instantRewards = useDistributionRewards()
  // const instantRewardsFormat = instantRewards ? formatBalance(getBalanceNumber(instantRewards) * 0.9) : '0'

  const totalDeposits = useTotalDeposited()
  const share = user.total_deposits_scaled && totalDeposits.gt(0) ? new BigNumber(user.total_deposits_scaled.toString()).div(totalDeposits).times(100).toString() : 0

  const timeSinceDeposit = user.deposit_time && time && time / 1000 - +user.deposit_time
  const timeSinceDepositFormat = timeSinceDeposit && +user.deposit_time > 0 ? `${getLotteryRewardTime(timeSinceDeposit)}` : '⏳'
  const timeSinceClaim = user.claim_time && time && time / 1000 - +user.claim_time
  const timeSinceClaimFormat = timeSinceClaim && +user.claim_time > 0 ? `${getLotteryRewardTime(timeSinceClaim)}` : '⏳'

  return (
    <StyledCard isSecondCard={isSecondCard}>
      <CardContent>
        <CardHeader>
          {/* <IconWrapper>
            <Image src="images/glass/tickets.png" alt="tickets" width={200} height={150} responsive />
            <TicketRound />
          </IconWrapper> */}
          <Column>
            <Text bold marginLeft="10px" fontSize="14px" color="#155aca">
              You've Deposited
            </Text>
            <div style={{marginLeft: "10px"}}>
              <CardValue value={+deposits} decimals={4} fontSize="24px" lineHeight={1.1} bold />
            </div>
            <div style={{ marginLeft: "12px" }}>
              <CardValue color='rgb(189,189,189)' value={+deposits * +lpPrice} fontSize="11px" decimals={2} bold={false} prefix="~$" />
            </div>
            <Text bold marginLeft="10px" fontSize="14px" color="#155aca">
              Last Deposit
            </Text>
            <Heading marginLeft="10px" size="lg">
              <div style={{ color: 'white' }}>{timeSinceDepositFormat}</div>
            </Heading>
            <br />
            <Text bold marginLeft="10px" fontSize="14px" color="#155aca">
              Est Daily Burst
            </Text>
            <div style={{marginLeft: "10px"}}>
              <CardValue value={+dayDripEstimate} decimals={4} lineHeight={1.1} fontSize="24px" bold />
            </div>
          </Column>
          <span style={{ margin: 'auto auto' }} />
          <Column style={{ textAlign: 'right' }}>
            <Text bold marginRight="10px" fontSize="14px" color="#155aca">
              You've Claimed
            </Text>
            <div style={{marginRight: "10px"}}>
              <CardValue value={+withdrawsScaled} decimals={4} lineHeight={1.1} fontSize="24px" bold />
            </div>
            <div style={{ marginRight: "12px" }}>
              <CardValue color='rgb(189,189,189)' value={+withdrawsScaled * +lpPrice} fontSize="11px" decimals={2} bold={false} prefix="~$" />
            </div>
            {/* <br /> */}
            <Text bold marginRight="10px" fontSize="14px" color="#155aca">
              Last Claim
            </Text>
            <Heading marginRight="10px" size="lg">
              <div style={{ color: 'white' }}>{timeSinceClaimFormat}</div>
            </Heading>
            <br />
            <Text bold marginRight="10px" fontSize="14px" color="#155aca">
              Share
            </Text>
            <div style={{marginRight: "10px"}}>
              <CardValue value={+share} postfix="%" decimals={3} lineHeight={1.1} fontSize="24px" bold />
            </div>
          </Column>
        </CardHeader>
        <TicketActions />
      </CardContent>
    </StyledCard>
  )
}

export default TicketCard

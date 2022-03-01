import React, { useMemo } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import Card from '../../../../components/Card'
import { Text } from '../../../../components/Text'
import CardContent from '../../../../components/CardContent'
import { useDayDripEstimate, useDepositMultiplier, useGetUserInfo, useTotalDeposited, useWhaleTax } from '../../../../hooks/useDetonator'
import { useCurrentTime } from '../../../../hooks/useTimer'
import { getFullDisplayBalance } from '../../../../utils/formatBalance'
import { getLotteryRewardTime } from '../../helpers/CountdownHelpers'
import TicketActions from './TicketActions'
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
  const maxPayout = user.total_deposits_scaled && +user.total_deposits_scaled > 0 ? getFullDisplayBalance(new BigNumber(user.total_deposits_scaled.toString()).times(3.65)) : '0'
  const depositMultiplier = useDepositMultiplier().div(10000);
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
  const burstApr = useDayDripEstimate().times(0.8).times(whaleTax.gt(0) ? (100 - whaleTax.toNumber()) / 100 : 1).times(365).div(deposits).times(100)
  const burstAprFormat = burstApr.isNaN() ? 0 : getFullDisplayBalance(burstApr)

  // const timeSinceDeposit = user.deposit_time && time && time / 1000 - +user.deposit_time
  // const timeSinceDepositFormat = timeSinceDeposit && +user.deposit_time > 0 ? `${getLotteryRewardTime(timeSinceDeposit)}` : '⏳'
  // const timeSinceClaim = user.claim_time && time && time / 1000 - +user.claim_time
  // const timeSinceClaimFormat = timeSinceClaim && +user.claim_time > 0 ? `${getLotteryRewardTime(timeSinceClaim)}` : '⏳'

  return (
    <StyledCard isSecondCard={isSecondCard}>
      <CardContent>
        <CardHeader>
          {/* <IconWrapper>
            <Image src="images/glass/tickets.png" alt="tickets" width={200} height={150} responsive />
            <TicketRound />
          </IconWrapper> */}
          <Column>
            <Text bold marginLeft="10px" fontSize="14px" color="#1d48b6">
              You've Deposited
            </Text>
            <div style={{ marginLeft: "10px" }}>
              <CardValue value={+deposits} decimals={2} fontSize="24px" lineHeight={1.1} bold />
            </div>
            <div style={{ marginLeft: "10px" }}>
              <CardValue color='rgb(189,189,189)' value={+deposits * +lpPrice} fontSize="11px" decimals={2} bold={false} prefix="~$" />
            </div>
            <Text bold marginLeft="10px" fontSize="14px" color="#1d48b6">
              Max Payout
            </Text>
            <div style={{ marginLeft: "10px" }}>
              <CardValue value={+maxPayout} decimals={2} lineHeight={1.1} fontSize="24px" bold />
            </div>
            <div style={{ marginLeft: "10px" }}>
              <CardValue color='rgb(189,189,189)' value={+maxPayout * +lpPrice} fontSize="11px" decimals={2} bold={false} prefix="~$" />
            </div>
            <Text bold marginLeft="10px" fontSize="14px" color="#1d48b6">
              Multiplier
            </Text>
            <div style={{ marginLeft: "10px" }}>
              <CardValue value={depositMultiplier.gt(0) ? depositMultiplier.toNumber() : 1} decimals={2} lineHeight={1.1} fontSize="24px" bold />
            </div>
            {/* <div style={{ marginLeft: "10px" }}>
              <CardValue color='rgb(189,189,189)' value={0 * +lpPrice} postfix=" / 100" fontSize="11px" decimals={2} bold={false} prefix="+$" />
            </div> */}
          </Column>
          <span style={{ margin: 'auto auto' }} />
          <Column style={{ textAlign: 'right' }}>
            <Text bold marginRight="10px" fontSize="14px" color="#1d48b6">
              You've Claimed
            </Text>
            <div style={{ marginRight: "10px" }}>
              <CardValue value={+withdrawsScaled} decimals={2} lineHeight={1.1} fontSize="24px" bold />
            </div>
            <div style={{ marginRight: "10px" }}>
              <CardValue color='rgb(189,189,189)' value={+withdrawsScaled * +lpPrice} fontSize="11px" decimals={2} bold={false} prefix="~$" />
            </div>
            <Text bold marginRight="10px" fontSize="14px" color="#1d48b6">
              Daily Burst
            </Text>
            <div style={{ marginRight: "10px" }}>
              <CardValue value={+dayDripEstimate} decimals={2} lineHeight={1.1} fontSize="24px" bold />
              {/* <CardValue value={+burstAprFormat} lineHeight={1.1} fontSize="24px" decimals={0} bold postfix="% APR" /> */}
            </div>
            <div style={{ marginRight: "10px" }}>
              <CardValue color='rgb(189,189,189)' value={+dayDripEstimate * +lpPrice} fontSize="11px" decimals={2} bold={false} prefix="~$" />
              {/* <CardValue color='rgb(189,189,189)' value={+burstAprFormat} fontSize="11px" decimals={0} bold={false} postfix="% APR" /> */}
            </div>
            <Text bold marginRight="10px" fontSize="14px" color="#1d48b6">
              Share
            </Text>
            <div style={{ marginRight: "10px" }}>
              <CardValue value={+share} postfix="%" decimals={2} lineHeight={1.1} fontSize="24px" bold />
            </div>
          </Column>
        </CardHeader>
        <TicketActions />
      </CardContent>
    </StyledCard>
  )
}

export default TicketCard

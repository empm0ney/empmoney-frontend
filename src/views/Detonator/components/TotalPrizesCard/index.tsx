import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import Card from '../../../../components/Card'
import { Text } from '../../../../components/Text'
import { formatBalance, getBalance, getFullDisplayBalance } from '../../../../utils/formatBalance'
import { useGetContractInfo, useLargestDayDepositor, useLargestDeposit, usePoolBalance } from '../../../../hooks/useDetonator'
import ExpandableSection from '../../../../components/ExpandableSection'
import PrizeGrid from '../PrizeGrid'
import CardBody from '../CardBody'
import CardFooter from '../../../../components/Card/CardFooter'
import useLpStats from '../../../../hooks/useLpStats'
import { Heading } from '../../../../components/Heading'
import CardValue from '../CardValue'

const CardHeading = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`

const Right = styled.div`
  display: flex;

  // @media (pointer:none), (pointer:coarse) {
  //   display: none;
  // }
`

const Left = styled.div`
  display: flex;
`

const StyledImage = styled.div`
  height: 60px;
  width: 60px;
  background-position top center;
  background-size: 67px;
  background-repeat: no-repeat;
  background-image: url('/animated-pair.gif') 
`

const PrizeCountWrapper = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
`

const StyledCardValue = styled(CardValue)`
  all: inherit;
`

const ExpandingWrapper = styled.div<{ showFooter: boolean }>`
  height: ${(props) => (props.showFooter ? '100%' : '0px')};
  display: ${(props) => (props.showFooter ? 'initial' : 'none')};

  // @media (pointer:none), (pointer:coarse) {
  //   height: 100%;
  // }
`

const TotalPrizesCard = () => {
  const [showFooter, setShowFooter] = useState(window.innerWidth > 768)

  const contractInfo = useGetContractInfo()
  const totalUsers = contractInfo && contractInfo._total_users
  const totalRewards =
    (contractInfo._total_withdrawn_scaled && 
      getBalance(new BigNumber(contractInfo._total_withdrawn_scaled.toString()))) ||
      (contractInfo._total_withdrawn &&
        getBalance(new BigNumber(contractInfo._total_withdrawn.toString()).times('0.8')))

  const poolBalance = usePoolBalance()
  const poolBalanceFormat = poolBalance && getBalance(poolBalance)
  const totalDeposited =
    contractInfo._total_deposited &&
    getBalance(new BigNumber(contractInfo._total_deposited.toString()))

  const largestPrize = poolBalance && getFullDisplayBalance(poolBalance.times('0.01'))
  const empEthLpStats = useLpStats('EMP-ETH-LP');
  const lpPrice = useMemo(() => (empEthLpStats ? Number(empEthLpStats.priceOfOne).toFixed(2) : null), [empEthLpStats]);

  // const largestDepositor = useLargestDayDepositor()
  // const largestDeposit = getFullDisplayBalance(useLargestDeposit())

  return (
    <Card>
      <CardBody onClick={() => setShowFooter(!showFooter)}>
        <CardHeading>
          <Left>
            <StyledImage />
            <PrizeCountWrapper>
              <Text fontSize="14px" color="#1d48b6" bold>
                Pool Balance
              </Text>
              <Heading size="lg"><CardValue value={poolBalanceFormat} fontSize="24px" decimals={2} bold> EMP-ETH LP</CardValue></Heading>
              <CardValue value={poolBalanceFormat * +lpPrice} fontSize="14px" decimals={2} bold={false} color="rgb(189,189,189)" prefix="~$" />
            </PrizeCountWrapper>
          </Left>
          <Right>
            <ExpandableSection expanded={showFooter} />
          </Right>
        </CardHeading>
      </CardBody>
      <ExpandingWrapper showFooter={showFooter}>
        <CardFooter>
          <PrizeGrid
            totalUsers={totalUsers}
            totalDeposited={totalDeposited ? totalDeposited.toString() : '0'}
            totalRewards={totalRewards ? totalRewards.toString() : '0'}
            // largestPrize={largestPrize ? largestPrize.toString() : '0'}
            // largestDeposit={largestDeposit ? largestDeposit.toString() : '0'}
            // largestDepositor={largestDepositor && largestDepositor !== '0x0000000000000000000000000000000000000000' ? largestDepositor.toString() : 'None'}
            glassPrice={lpPrice ? lpPrice.toString() : '0'}
          />
        </CardFooter>
      </ExpandingWrapper>
    </Card>
  )
}

export default TotalPrizesCard

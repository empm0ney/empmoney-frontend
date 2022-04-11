import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Card from '../../../../components/Card'
import { Text } from '../../../../components/Text'
import { useLargestDayDepositor, useLargestDeposit, usePoolBalance, useTopDayDeposits } from '../../../../hooks/useDetonator'
import { formatBalance, getBalance, getFullDisplayBalance } from '../../../../utils/formatBalance'
import ExpandableSection from '../../../../components/ExpandableSection'
import CardValue from '../CardValue'
import { Heading } from '../../../../components/Heading'
import CardFooter from '../../../../components/Card/CardFooter'
import useLpStats from '../../../../hooks/useLpStats'
import CardBody from '../CardBody'
import BigNumber from 'bignumber.js'

const StyledCard = styled(Card)`
  // margin-top: 24px;
`
const CardHeading = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`

const Right = styled.div`
  display: flex;
`

const Left = styled.div`
  display: flex;
`
const PrizeCountWrapper = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
`
const ExpandingWrapper = styled.div<{ showFooter: boolean }>`
  height: ${(props) => (props.showFooter ? '100%' : '0px')};
  display: ${(props) => (props.showFooter ? 'initial' : 'none')};
`
const RightAlignedText = styled(Text)`
  text-align: right;
`
const GridItem = styled.div<{ marginBottom?: string }>`
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '16px')};
`
const Grid = styled.div<{ numRows: number }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(${(props) => props.numRows}, auto);
`
const Icon = styled.div<{ isMobile?: boolean }>`
  // margin-top: ${(props) => (props.isMobile ? '0' : '8px')};;
  margin-top: 0px;
  font-size: 38px;
`

const LargestCard = () => {
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

  const formatBalance = (balance: any) => {
    return getFullDisplayBalance(new BigNumber(balance.toString()));
  }

  const [showFooter, setShowFooter] = useState(true)
  // const topUsers = useTopDayDeposits();
  const largestDepositor = useLargestDayDepositor();
  const largestDeposit = useLargestDeposit();
  const largestPrize = formatBalance(usePoolBalance().times(1).div(100));

  const empEthLpStats = useLpStats('EMP-ETH-LP');
  const lpPrice = useMemo(() => (empEthLpStats ? Number(empEthLpStats.priceOfOne).toFixed(2) : null), [empEthLpStats]);

  const parseAddr = (addr: string) => {
    return `${addr.substring(0, 5)}...${addr.substring(addr.length - 3, addr.length)}`
  }

  return (
    <>
      <div style={{ marginTop: '24px' }}>{' '}</div>
      <StyledCard>
        {/* <div > */}
        <CardBody onClick={() => setShowFooter(!showFooter)}>
          <CardHeading style={{ marginBottom: '-13px' }}>
            <Left>
              <Icon isMobile={isMobile}>🏅</Icon>
              <PrizeCountWrapper>
                <Text bold fontSize="14px" color="#1d48b6">
                  Top Deposit Prize
                </Text>
                <Heading size="lg"><div style={{ color: 'white' }}><CardValue value={largestPrize ? Number(largestPrize) : 0} fontSize="24px" decimals={2} bold /></div></Heading>
                <CardValue value={largestPrize ? Number(largestPrize) * Number(lpPrice) : 0} fontSize="14px" decimals={2} bold={false} color="rgb(189,189,189)" prefix="~$" />
              </PrizeCountWrapper>
            </Left>
            <Right>
              <ExpandableSection expanded={showFooter} />
            </Right>
          </CardHeading>
        </CardBody>
        {/* </div> */}
        <ExpandingWrapper showFooter={showFooter}>
          <CardFooter>
            {!!largestDepositor && largestDeposit.gt(0) &&
              <Grid numRows={1}>
                <GridItem>
                  <Text bold fontSize="18px">
                    {parseAddr(largestDepositor)} 🥇
                  </Text>
                </GridItem>
                <GridItem marginBottom="0">
                  <RightAlignedText>
                    <CardValue value={Number(formatBalance(largestDeposit))} decimals={2} fontSize="18px" bold={false} />
                    <CardValue color='rgb(189,189,189)' value={Number(formatBalance(largestDeposit)) * +lpPrice} fontSize="11px" decimals={2} bold={false} prefix="~$" />
                  </RightAlignedText>
                </GridItem>
              </Grid>
            }
            {/* <Grid numRows={topUsers.length}>
              {topUsers.length > 0 &&
                <>
                  <GridItem>
                    <Text bold fontSize="18px">
                    🥇 {parseAddr(topUsers[0].address)}
                    </Text>
                  </GridItem>
                  <GridItem marginBottom="0">
                    <RightAlignedText>
                      <CardValue value={Number(formatBalance(topUsers[0].day_deposits))} decimals={2} fontSize="18px" bold={false} />
                      <CardValue color='rgb(189,189,189)' value={Number(formatBalance(topUsers[0].day_deposits)) * +lpPrice} fontSize="11px" decimals={2} bold={false} prefix="~$" />
                    </RightAlignedText>
                  </GridItem>
                </>
              }
              {topUsers.length > 1 &&
                <>
                  <GridItem>
                    <Text bold fontSize="18px">
                    🥈 {parseAddr(topUsers[1].address)}
                    </Text>
                  </GridItem>
                  <GridItem marginBottom="0">
                    <RightAlignedText>
                      <CardValue value={Number(formatBalance(topUsers[1].day_deposits))} decimals={2} fontSize="18px" bold={false} />
                      <CardValue color='rgb(189,189,189)' value={Number(formatBalance(topUsers[1].day_deposits)) * +lpPrice} fontSize="11px" decimals={2} bold={false} prefix="~$" />
                    </RightAlignedText>
                  </GridItem>
                </>
              }
              {topUsers.length > 2 &&
                <>
                  <GridItem>
                    <Text bold fontSize="18px">
                    🥉 {parseAddr(topUsers[0].address)}
                    </Text>
                  </GridItem>
                  <GridItem marginBottom="0">
                    <RightAlignedText>
                      <CardValue value={Number(formatBalance(topUsers[2].day_deposits))} decimals={2} fontSize="18px" bold={false} />
                      <CardValue color='rgb(189,189,189)' value={Number(formatBalance(topUsers[2].day_deposits)) * +lpPrice} fontSize="11px" decimals={2} bold={false} prefix="~$" />
                    </RightAlignedText>
                  </GridItem>
                </>
              }
            </Grid> */}
          </CardFooter>
        </ExpandingWrapper>
      </StyledCard>
    </>
  )
}

export default LargestCard

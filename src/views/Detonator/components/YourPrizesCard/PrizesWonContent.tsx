import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Heading } from '../../../../components/Heading'
import { Text } from '../../../../components/Text'
import ReactTooltip from 'react-tooltip';
import { getBalance, getDisplayBalance, getFullDisplayBalance } from '../../../../utils/formatBalance'
import { useClaimLottery, useCompoundLottery, useWhaleTax } from '../../../../hooks/useDetonator'
import { useTotalRewards } from '../../../../hooks/useDetonator'
import CardValue from '../CardValue'
import Loading from '../Loading'
import useLpStats from '../../../../hooks/useLpStats'
import { Button } from '@material-ui/core';
import BigNumber from 'bignumber.js';

const WinningsWrapper = styled.div`
  display: flex;
  align-items: baseline;
`

const IconWrapper = styled.div`
  margin-bottom: 16px;

  svg {
    width: 80px;
    height: 80px;
  }
`

const StyledCardActions = styled.div`
  // margin-top: ${(props) => props.theme.spacing[3]}px;
  display: flex;
  width: 100%;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`
const StyledImage = styled.div`
  // margin-top: 0.25rem;
  height: 143px;
  width: 150px;
  background-position center center;
  background-size: 150px;
  background-repeat: no-repeat;
  background-image: url('./animated-pair.gif');
    
  animation-name: pulse;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  transition: transform 0.2s;
`

const Pulse = styled.div`
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`

const StyledButton = styled(Button)`
  margin-top: 16ppx;
`

const Label = styled.div`
  color: rgb(189,189,189);
  font-size: 14px;
`

const PrizesWonContent: React.FC = () => {
  const [requestedClaim, setRequestedClaim] = useState(false)
  const [requestedCompound, setRequestedCompound] = useState(false)
  const rewards = useTotalRewards()
  const whaleTax = useWhaleTax()
  const rewardsAfterFee = getFullDisplayBalance(rewards.times(new BigNumber(80).minus(whaleTax)).div(100))
  const { onClaim } = useClaimLottery()
  const { onCompound } = useCompoundLottery()
const empEthLpStats = useLpStats('EMP-ETH-LP');
  const lpPrice = useMemo(() => (empEthLpStats ? Number(empEthLpStats.priceOfOne).toFixed(2) : null), [empEthLpStats]);
  // const dailyDrip = useDayDripEstimate()
  // const dailyDripFormat = dailyDrip && formatBalance(getBalanceNumber(dailyDrip.times(FEE_RATIO)))

  const handleClaim = useCallback(async () => {
    try {
      setRequestedClaim(true)
      const txHash = await onClaim()
      // user rejected tx or didn't go thru
      if (txHash) {
        setRequestedClaim(false)
      }
    } catch (e) {
      console.error(e)
      setRequestedClaim(false)
    }
  }, [onClaim, setRequestedClaim])
  
  const handleCompound = useCallback(async () => {
    try {
      setRequestedCompound(true)
      const txHash = await onCompound()
      // user rejected tx or didn't go thru
      if (txHash) {
        setRequestedCompound(false)
      }
    } catch (e) {
      console.error(e)
      setRequestedCompound(false)
    }
  }, [onCompound, setRequestedCompound])

  return (
    <StyledCardContentInner>
      <Pulse />
      <ReactTooltip effect="solid" clickable type="info" />
      <StyledImage />
      <Heading as="h3" size="lg" color="secondary" style={{ marginTop: '12px' }}>
        YOUR REWARDS!
      </Heading>
      {/* {claimLoading && <Loading />} */}
      {/* {!claimLoading && ( */}
      <>
        <WinningsWrapper>
          <Heading color="white" as="h4" size="xl" style={{ marginRight: '6px' }}>
            <CardValue value={+rewardsAfterFee} decimals={4} />
          </Heading>
        </WinningsWrapper>
        <Label>~${(+rewardsAfterFee * +lpPrice).toFixed(2)}</Label>
        {/* <Label style={{ marginTop: '8px', fontWeight: 'bold' }}>Est Daily Drip: {dailyDripFormat}</Label> */}
      </>
      {/* )} */}
      <span style={{ marginTop: '16px' }} />
      <StyledCardActions>
        <Button fullWidth className="shinyButtonSecondary" onClick={handleClaim}>
          Claim
        </Button>
        <span style={{ margin: '0 8px' }} />
        {/* <span style={{ marginTop: '16px' }} /> */}
        <Button fullWidth className="shinyButtonSecondary" onClick={handleCompound} data-tip="15% Savings">
          Compound
        </Button>
      </StyledCardActions>
    </StyledCardContentInner>
  )
}

export default PrizesWonContent

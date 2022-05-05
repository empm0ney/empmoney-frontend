import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
import ProgressCountdown from './ProgressCountdown';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useEthStats from '../../../hooks/useEthStats';
import useUserEthStake from '../../../hooks/useUserEthStake';
import useTimeToUnlock from '../../../hooks/useTimeToUnlock';
import usePendingPayoutEth from '../../../hooks/usePendingPayoutEth';
import CardIcon from '../../../components/CardIcon';
import useEpochEth from '../../../hooks/useEpochEth';
import useExitEth from '../../../hooks/useExitEth';
import ReactTooltip from 'react-tooltip';
import { BigNumber } from 'ethers';

const Harvest: React.FC = () => {
  const user = useUserEthStake();
  const ethPrice = useEthStats();
  const timeToUnlock = useTimeToUnlock();
  // const timeToLock = useEthUnlockTime();
  const epoch = useEpochEth();
  const canClaimReward = timeToUnlock.eq(0) && user.last_epoch.lt(epoch.epoch);

  const numEpochs = user.last_epoch.lt(epoch.epoch)
    ? epoch.epoch.sub(user.last_epoch).toNumber() :
    1;
  const principal = user.current_balance;
  let compoundInterest = BigNumber.from(0);
  let compoundInterestNext = BigNumber.from(0);

  // AUTO COMPOUNDS INTEREST
  for (let i = 0; i < numEpochs; i++) {
    compoundInterest = compoundInterest.add(
      (principal.add(compoundInterest)).mul(1900).div(10000)
    );
  }
  for (let i = 0; i < numEpochs + 1; i++) {
    compoundInterestNext = compoundInterestNext.add(
      (principal.add(compoundInterestNext)).mul(1900).div(10000)
    );
  }

  const showNextEarnings = compoundInterestNext.gt(0) && user.last_epoch.lt(epoch.epoch) && epoch.epoch.lt(4);
  const displayEarnings = showNextEarnings && !epoch.unlocked 
    ? compoundInterestNext
    : compoundInterest;

  // const expectedPayout = principal.add(compoundInterest);
  // const pendingPayout = usePendingPayoutEth();

  // const nextUnlockTime = timeToUnlock.eq(0) 
  //   ? timeToLock.toNumber() + (Date.now() / 1000) + 7776000
  //   : timeToUnlock.toNumber();

  const { onExit } = useExitEth();

  return (
    <Box>
      <ReactTooltip effect="solid" clickable type="dark" />
      <Card>
        <CardContent>
          <StyledCardContentInner>
            <StyledCardHeader>
              <CardIcon>
                <div style={{ fontSize: '42px' }}>{canClaimReward ? '🔓' : '🔒'}</div>
                {/* <TokenSymbol symbol="ETH" /> */}
              </CardIcon>
              <Value value={getDisplayBalance(displayEarnings)} />
              <Label text={`≈ $${(Number(getDisplayBalance(displayEarnings, 18, 2)) * Number(ethPrice)).toFixed(2)}`} variant="yellow" />
              <Label text="ETH Earned" variant="yellow" />
            </StyledCardHeader>
            {showNextEarnings && epoch.unlocked &&
              <CardContent style={{ marginBottom: '-3rem' }}>
                <Label text="Next Quarter Earnings" variant="primary" />
                <Typography style={{ textAlign: 'center' }}>{getDisplayBalance(compoundInterestNext)} ETH</Typography>
              </CardContent>
            }
            <StyledCardActions>
              <Button
                onClick={() => onExit(false)}
                className={!canClaimReward ? 'shinyButtonDisabled' : 'shinyButton'}
                disabled={!canClaimReward}
              // data-tip={getLotteryRewardTime(nextUnlockTime * 1000)}
              >
                Claim & Withdraw
              </Button>
            </StyledCardActions>
          </StyledCardContentInner>
        </CardContent>
      </Card>
      {/* <Box mt={2} style={{ color: '#FFF' }}>
        {canClaimReward ? (
          ''
        ) : (
          <Card>
            <CardContent>
              <Typography style={{ textAlign: 'center' }}>Claim possible in</Typography>
              <ProgressCountdown hideBar={true} base={from} deadline={to} />
            </CardContent>
          </Card>
        )}
      </Box> */}
    </Box>
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Harvest;

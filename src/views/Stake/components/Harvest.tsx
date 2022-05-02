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

const Harvest: React.FC = () => {
  // const {onReward} = useHarvestFromBoardroom();
  const user = useUserEthStake();
  const ethPrice = useEthStats();
  const timeToUnlock = useTimeToUnlock();
  // const timeToLock = useEthUnlockTime();
  const epoch = useEpochEth();
  const canClaimReward = timeToUnlock.eq(0) && user.last_epoch.lt(epoch.epoch);
  const pendingPayout = usePendingPayoutEth();
  const expectedPayout = user.current_balance.mul(119).div(100);
  const interest = canClaimReward ? pendingPayout.sub(user.current_balance) : expectedPayout.sub(user.current_balance);
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
              <Value value={getDisplayBalance(interest)} />
              <Label text={`≈ $${(Number(getDisplayBalance(interest, 18, 2)) * Number(ethPrice)).toFixed(2)}`} variant="yellow" />
              <Label text="ETH Earned" variant="yellow" />
            </StyledCardHeader>
            <StyledCardActions>
              {/* <CardContent>
                <Typography style={{ textAlign: 'center' }}>Claim possible in</Typography>
                <ProgressCountdown hideBar={true} base={moment().toDate()} deadline={unlockTime} />
              </CardContent> */}
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

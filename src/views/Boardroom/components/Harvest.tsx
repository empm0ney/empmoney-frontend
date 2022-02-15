import React, {useMemo} from 'react';
import styled from 'styled-components';

import {Box, Button, Card, CardContent, Typography} from '@material-ui/core';

import TokenSymbol from '../../../components/TokenSymbol';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
import CardIcon from '../../../components/CardIcon';
import useClaimRewardTimerBoardroom from '../../../hooks/boardroom/useClaimRewardTimerBoardroom';
import useClaimRewardCheck from '../../../hooks/boardroom/useClaimRewardCheck';
import ProgressCountdown from './ProgressCountdown';
import useHarvestFromBoardroom from '../../../hooks/useHarvestFromBoardroom';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';
import useEmpStats from '../../../hooks/useEmpStats';
import {getDisplayBalance} from '../../../utils/formatBalance';

const Harvest: React.FC = () => {
  const version = 0;
  const empStats = useEmpStats();
  const {onReward} = useHarvestFromBoardroom(version);
  const earnings = useEarningsOnBoardroom(version);
  const canClaimReward = useClaimRewardCheck(version);

  const tokenPriceInDollars = useMemo(
    () => (empStats ? Number(empStats.priceInDollars).toFixed(2) : null),
    [empStats],
  );

  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

  const {from, to} = useClaimRewardTimerBoardroom(version);

  return (
    <Box>
      <Card>
        <CardContent>
          <StyledCardContentInner>
            <StyledCardHeader>
              <CardIcon>
                <TokenSymbol symbol="EMP" />
              </CardIcon>
              <Value value={getDisplayBalance(earnings)} />
              <Label text={`≈ $${earnedInDollars}`} variant="yellow" />
              <Label text="EMP Earned" variant="yellow" />
            </StyledCardHeader>
            <StyledCardActions>
              <Button
                onClick={onReward}
                className={earnings.eq(0) || !canClaimReward ? 'shinyButtonDisabled' : 'shinyButton'}
                disabled={earnings.eq(0) || !canClaimReward}
              >
                Claim Reward
              </Button>
            </StyledCardActions>
          </StyledCardContentInner>
        </CardContent>
      </Card>
      <Box mt={2} style={{color: '#FFF'}}>
        {canClaimReward ? (
          ''
        ) : (
          <Card>
            <CardContent style={{textAlign: 'center'}}>
              <Typography>Claim possible in</Typography>
              <ProgressCountdown hideBar={true} base={from} deadline={to} description="Claim available in" />
              <Label text={'Manually unlocked after epoch #7'} variant="yellow" />
            </CardContent>
          </Card>
        )}
      </Box>
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

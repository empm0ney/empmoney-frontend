import React, { useMemo } from 'react';
import { useWallet } from 'use-wallet';
import styled from 'styled-components';
import Stake from './components/Stake';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Card, CardContent, Typography, Grid } from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';

import { createGlobalStyle } from 'styled-components';

import HomeImage from '../../assets/img/background2.jpg';
import useTotalStakedEth from '../../hooks/useTotalStakedEth';
import { getDisplayBalance } from '../../utils/formatBalance';
import ProgressCountdown from './components/ProgressCountdown';
import moment from 'moment';
import useTimeToUnlock from '../../hooks/useTimeToUnlock';
import useTimeToLock from '../../hooks/useTimeToLock';
import useEthMax from '../../hooks/useEthMax';
import { Flex } from '../../components/Flex';
import Harvest from './components/Harvest';
import Spacer from '../../components/Spacer';
import { BigNumber } from 'ethers';
import StartTimer from '../Detonator/components/StartTimer';
import useUnlockTime from '../../hooks/useUnlockTime';

const BackgroundImage = createGlobalStyle`
body {
  background: url(${HomeImage}) repeat !important;
  background-size: cover !important;
  background-color: #08090d;
}
`;

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    },
  },
}));

const Staking = () => {
  const classes = useStyles();
  const { account } = useWallet();
  const totalBalance = getDisplayBalance(useTotalStakedEth(), 18, 2);
  const untilUnlockTime = useTimeToUnlock();
  const untilLockTime = useTimeToLock();
  const unlockTime = new Date(untilUnlockTime.mul(1000).add(BigNumber.from(Date.now())).toNumber())
  const lockTime = new Date(untilLockTime.mul(1000).add(BigNumber.from(Date.now())).toNumber())
  const maxBalance = getDisplayBalance(useEthMax(), 18, 0);
  const startTime = 1 // useUnlockTime(0).mul(1000).toNumber();

  return (
    <Page>
      <BackgroundImage />
      {!!account ? (
        <>
          {startTime > 0 && Date.now() > startTime ?
          <>
          <Typography align="center" color="textPrimary" variant="h3" gutterBottom>
            Ethereum Staking
          </Typography>

          <Box mt={5}>
            <Grid container justify="center" spacing={3}>
              <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card className={classes.gridItem}>
                  <CardContent style={{ textAlign: 'center' }}>
                    <Typography style={{ textTransform: 'uppercase', color: '#1d48b6' }}>Unlock Period</Typography>
                    <Flex style={{ flex: 1, justifyContent: 'center', flexDirection: 'column' }}>
                      {untilUnlockTime.eq(0)
                        ? <b>- Now -</b>
                        : <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={unlockTime} />
                      }
                      {/* <div>-</div> */}
                      {untilUnlockTime.eq(0)
                        ? <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={lockTime} />
                        : <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={new Date(unlockTime.getTime() + (432000 * 1000))} />
                      }
                    </Flex>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card className={classes.gridItem}>
                  <CardContent style={{ textAlign: 'center' }}>
                    <Typography style={{ textTransform: 'uppercase', color: '#1d48b6' }}>Lock Period</Typography>
                    <Flex style={{ flex: 1, justifyContent: 'center', flexDirection: 'column' }}>
                      {untilLockTime.eq(0)
                        ? <b >- Now -</b>
                        : <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={lockTime} />
                      }
                      {/* <div>-</div> */}
                      {untilLockTime.eq(0)
                        ? <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={unlockTime} />
                        : <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={new Date(lockTime.getTime() + (7776000 * 1000))} />
                      }
                    </Flex>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card className={classes.gridItem}>
                  <CardContent style={{ textAlign: 'center' }}>
                    <Typography style={{ textTransform: 'uppercase', color: '#1d48b6' }}>APR || APY</Typography>
                    <Typography>76% || 100%</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={2} lg={2}>
                <Card className={classes.gridItem}>
                  <CardContent style={{ textAlign: 'center' }}>
                    <Typography style={{ textTransform: 'uppercase', color: '#1d48b6' }}>ETH Staked</Typography>
                    <Typography>{totalBalance} / {maxBalance} MAX</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Box mt={4}>
              <StyledBoardroom>
                <StyledCardsWrapper>
                  <StyledCardWrapper>
                    <Stake />
                  </StyledCardWrapper>

                  <Spacer />

                  <StyledCardWrapper>
                    <Harvest />
                  </StyledCardWrapper>
                </StyledCardsWrapper>
              </StyledBoardroom>
            </Box>
            <Box mt={4}>
              <StyledBoardroom>
                <StyledCardsWrapper>
                  <StyledCardWrapper>
                    <Box>
                      <Card style={{ padding: '8px 24px' }}>
                        <CardContent style={{ textAlign: 'center' }}>
                          <h2>Details</h2>
                          <p>
                            Stake your BEP-20 ETH to earn <b style={{ textDecorationLine: 'underline' }}>19% fixed</b> on your principal per quarter (90 days).
                          </p>
                          <p>
                            Interest is paid in BEP-20 ETH and is claimable along with your principal after the 90 day <b style={{ textDecorationLine: 'underline' }}>Lock Period</b> completes.
                          </p>
                          {/* <p>
                            If you decide to abstain from claiming throughout the 5 day "Unlock Period" (after lock period), your principal & interest is automatically compounded and is again claimable after the next lock period.
                          </p> */}
                          <p>
                            A 5 day <b style={{ textDecorationLine: 'underline' }}>Unlock Period</b> will open after the lock period where you can claim your principal & earned interest.
                          </p>
                          <p>
                            Alternatively, if you do not claim during the unlock period, your principal & interest will automatically be reinvested in the next 90 day lock period for compounded yield.
                          </p>
                          <i style={{ color: '#bdbdbd', fontSize: '12px' }}>
                            Users have the ability to "Emergency Withdraw" during the lock period. However, this will incur a 50% fee and loss of any interest gained.
                          </i>
                        </CardContent>
                      </Card>
                    </Box>
                  </StyledCardWrapper>
                </StyledCardsWrapper>
              </StyledBoardroom>
            </Box>
          </Box>
          </>
          : 
          <StartTimer startTime={startTime / 1000} />
        }
        </>
      ) : (
        <UnlockWallet />
      )}
    </Page>
  );
};

const StyledBoardroom = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default Staking;

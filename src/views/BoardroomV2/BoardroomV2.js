import React, { useMemo } from 'react';
import { useWallet } from 'use-wallet';
import moment from 'moment';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import { makeStyles } from '@material-ui/core/styles';
import config from '../../config';

import { Box, Card, CardContent, Button, Typography, Grid } from '@material-ui/core';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';

import useRedeemOnBoardroom from '../../hooks/useRedeemOnBoardroom';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import { getDisplayBalance } from '../../utils/formatBalance';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useFetchBoardroomAPR from '../../hooks/useFetchBoardroomAPR';

import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useTotalStakedOnBoardroom from '../../hooks/useTotalStakedOnBoardroom';
import useClaimRewardCheck from '../../hooks/boardroom/useClaimRewardCheck';
import useWithdrawCheck from '../../hooks/boardroom/useWithdrawCheck';
import ProgressCountdown from './components/ProgressCountdown';
import { createGlobalStyle } from 'styled-components';

import HomeImage from '../../assets/img/background.png';
import LaunchCountdown from '../../components/LaunchCountdown';
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #10131e;
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

const BoardroomV2 = () => {
  const version = 1;
  const classes = useStyles();
  const { account } = useWallet();
  const { onRedeem } = useRedeemOnBoardroom(version);
  const stakedBalance = useStakedBalanceOnBoardroom(version);
  const currentEpoch = useCurrentEpoch(version).add(8);
  const cashStat = useCashPriceInEstimatedTWAP(version);
  const totalStaked = useTotalStakedOnBoardroom(version);
  const boardroomAPR = useFetchBoardroomAPR(version);
  const canClaimReward = useClaimRewardCheck(version);
  const canWithdraw = useWithdrawCheck(version);
  const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  const { to } = useTreasuryAllocationTimes(version);
  const esharesActive = Date.now() >= config.boardroomLaunchesAt.getTime();

  return (
    <Page>
      <BackgroundImage />
      {!!account ? (
        !esharesActive ? <LaunchCountdown deadline={config.boardroomLaunchesAt} description='Home' descriptionLink='/' />
          : <>
            <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
              Boardroom
            </Typography>
            <Box mt={5}>
              <Grid container justify="center" spacing={3}>
                <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                  <Card className={classes.gridItem}>
                    <CardContent style={{ textAlign: 'center' }}>
                      <Typography style={{ textTransform: 'uppercase', color: '#155aca' }}>Next Epoch</Typography>
                      <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                  <Card className={classes.gridItem}>
                    <CardContent align="center">
                      <Typography style={{ textTransform: 'uppercase', color: '#155aca' }}>Current Epoch</Typography>
                      <Typography>{Number(currentEpoch)}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                  <Card className={classes.gridItem}>
                    <CardContent align="center">
                      <Typography style={{ textTransform: 'uppercase', color: '#155aca' }}>
                        EMP PEG <small>(TWAP)</small>
                      </Typography>
                      <Typography>{scalingFactor} ETH</Typography>
                      <Typography>
                        <small>per 4,000 EMP</small>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                  <Card className={classes.gridItem}>
                    <CardContent align="center">
                      <Typography style={{ textTransform: 'uppercase', color: '#155aca' }}>APR</Typography>
                      <Typography>{boardroomAPR.toFixed(2)}%</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={2} lg={2}>
                  <Card className={classes.gridItem}>
                    <CardContent align="center">
                      <Typography style={{ textTransform: 'uppercase', color: '#155aca' }}>ESHARES Staked</Typography>
                      <Typography>{getDisplayBalance(totalStaked)}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* <Grid container justify="center">
              <Box mt={3} style={{ width: '600px' }}>
                <Alert variant="filled" severity="warning">
                  <b> Boardroom smart contract has been updated! </b><br />
                  If you have ESHARE in the previous Boardroom, visit here to retrieve it:<br />
                  <a href="https://61aadb35c5a5c50007c2a61b--emp-money.netlify.app/boardroom">https://61aadb35c5a5c50007c2a61b--emp-money.netlify.app/boardroom</a><br /><br />
                </Alert>

              </Box>
            </Grid> */}

              <Box mt={4}>
                <StyledBoardroom>
                  <StyledCardsWrapper>
                    <StyledCardWrapper>
                      <Harvest />
                    </StyledCardWrapper>
                    <Spacer />
                    <StyledCardWrapper>
                      <Stake />
                    </StyledCardWrapper>
                  </StyledCardsWrapper>
                </StyledBoardroom>
              </Box>

              {/* <Grid container justify="center" spacing={3}>
            <Grid item xs={4}>
              <Card>
                <CardContent align="center">
                  <Typography>Rewards</Typography>

                </CardContent>
                <CardActions style={{justifyContent: 'center'}}>
                  <Button color="primary" variant="outlined">Claim Reward</Button>
                </CardActions>
                <CardContent align="center">
                  <Typography>Claim Countdown</Typography>
                  <Typography>00:00:00</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent align="center">
                  <Typography>Stakings</Typography>
                  <Typography>{getDisplayBalance(stakedBalance)}</Typography>
                </CardContent>
                <CardActions style={{justifyContent: 'center'}}>
                  <Button>+</Button>
                  <Button>-</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid> */}
            </Box>

            {/* <Box mt={5}>
              <Grid container justify="center" spacing={3} mt={10}>
                <Button
                  disabled={!canClaimReward || earnings.lt(1e18)}
                  onClick={onCompound}
                  className={
                     !canClaimReward || earnings.lt(1e18)
                      ? 'shinyButtonDisabledSecondary'
                      : 'shinyButtonSecondary'
                  }
                >
                  Compound
                </Button>
              </Grid>
            </Box> */}
            <Box mt={5}>
              <Grid container justify="center" spacing={3} mt={10}>
                <Button
                  disabled={stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)}
                  onClick={onRedeem}
                  className={
                    stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)
                      ? 'shinyButtonDisabledSecondary'
                      : 'shinyButtonSecondary'
                  }
                >
                  Claim &amp; Withdraw
                </Button>
              </Grid>
            </Box>
            {/* <Box mt={5}>
              <Grid container justify="center" spacing={3}>
                <Alert variant="outlined" severity="info" style={{ width: "20rem" }}>
                  Please remove funds from <a href="/boardroom">BoardroomV1</a>
                </Alert>
              </Grid>
            </Box> */}
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
    width: 80%;
  }
`;

export default BoardroomV2;

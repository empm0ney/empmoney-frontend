import React, { useMemo } from 'react';
import { useWallet } from 'use-wallet';
import styled from 'styled-components';
import Stake from './components/Stake';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Card, CardContent, Typography, Grid } from '@material-ui/core';
import { roundAndFormatNumber } from '../../0x';

import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';

import { createGlobalStyle } from 'styled-components';

import HomeImage from '../../assets/img/background2.jpg';
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
  const xbombBalance = 0
  const xbombRate = Number(xbombBalance / 1000000000000000000).toFixed(4);
  const xbombAPR = { TVL: 0 }
  const xbombPrintApr = 0

  const xbombPrintAprNice = useMemo(() => (xbombPrintApr ? Number(xbombPrintApr).toFixed(2) : null), [xbombPrintApr]);

  const stakedTotalBombBalance = 0;
  const bombTotalStaked = Number(stakedTotalBombBalance / 1000000000000000000).toFixed(0);
  const xbombTVL = useMemo(() => (xbombAPR ? Number(xbombAPR.TVL).toFixed(0) : null), [xbombAPR]);

  return (
    <Page>
      <BackgroundImage />
      {!!account ? (
        <>
          <Typography align="center" color="textPrimary" variant="h3" gutterBottom>
            Ethereum Staking
          </Typography>
          <Grid container justify="center">
            <Box mt={3} style={{ width: '600px' }}>
              <Alert variant="outlined" severity="info">
                <b>3 month lock period</b>
              </Alert>
            </Box>
          </Grid>

          <Box mt={5}>
            <Grid container justify="center" spacing={3}>
              <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card className={classes.gridItem}>
                  <CardContent >
                    <Typography style={{ textTransform: 'uppercase', color: '#1d48b6' }}> =</Typography>
                    <Typography>{Number(xbombRate)} EMP</Typography>
                  </CardContent>
                </Card>
              </Grid>
              {/* <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card className={classes.gridItem}>
                  <CardContent >
                    <Typography style={{ textTransform: 'uppercase', color: '#1d48b6' }}>
                      BOMB PEG <small>(TWAP)</small>
                    </Typography>
                    <Typography>{scalingFactor} BTC</Typography>
                    <Typography>
                      <small>per 10,000 BOMB</small>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid> */}
              {/* <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card className={classes.gridItem}>
                  <CardContent >
                    <Typography style={{ textTransform: 'uppercase', color: '#1d48b6' }}>Historic APR</Typography>
                    <Typography>{xbombYearlyAPR}%</Typography>
                  </CardContent>
                </Card>
              </Grid> */}
              <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card className={classes.gridItem}>
                  <CardContent >
                    <Typography style={{ textTransform: 'uppercase', color: '#1d48b6' }}>APR (Minted BOMB)</Typography>
                    <Typography>{xbombPrintAprNice}%</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={2} lg={2}>
                <Card className={classes.gridItem}>
                  <CardContent >
                    <Typography style={{ textTransform: 'uppercase', color: '#1d48b6' }}>BOMB Staked</Typography>
                    <Typography>{roundAndFormatNumber(Number(bombTotalStaked), 0)}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card className={classes.gridItem}>
                  <CardContent >
                    <Typography style={{ textTransform: 'uppercase', color: '#1d48b6' }}>xBOMB TVL</Typography>
                    <Typography>${roundAndFormatNumber(Number(xbombTVL), 2)}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Box mt={4}>
              <StyledBoardroom>
                <StyledCardsWrapper>
                  {/* <StyledCardWrapper>
                    <Harvest />
                  </StyledCardWrapper> */}
                  {/* <Spacer /> */}

                  <StyledCardWrapper>
                    <Stake />
                  </StyledCardWrapper>
                </StyledCardsWrapper>
              </StyledBoardroom>
            </Box>
            <Box mt={4}>
              <StyledBoardroom>
                <StyledCardsWrapper>
                  {/* <StyledCardWrapper>
                    <Harvest />
                  </StyledCardWrapper> */}
                  {/* <Spacer /> */}
                  <StyledCardWrapper>
                    <Box>
                      <Card>
                        <CardContent>
                          <h2>More Info</h2>
                          {/* <p><strong>We are currently depositing 10,000 BOMB per week into the staking pool until our BTC Single Staking service is launched.</strong></p> */}
                          <p>xBOMB will be the governance token required to cast votes on protocol decisions.</p>
                          <p>
                            20% of all BOMB minted will be deposited into the xBOMB smart contract, increasing the
                            amount of BOMB that can be redeemed for each xBOMB. Rewards will be deposited at random
                            times to prevent abuse.
                          </p>
                          <p>
                            Functionality will be developed around xBOMB including using it as collateral to borrow
                            other assets.
                          </p>
                          <p>Reward structure subject to change based on community voting.</p>
                        </CardContent>
                      </Card>
                    </Box>
                  </StyledCardWrapper>
                </StyledCardsWrapper>
              </StyledBoardroom>
            </Box>
            {/* <Grid container justify="center" spacing={3}>
            <Grid item xs={4}>
              <Card>
                <CardContent >
                  <Typography>Rewards</Typography>

                </CardContent>
                <CardActions style={{justifyContent: 'center'}}>
                  <Button color="primary" variant="outlined">Claim Reward</Button>
                </CardActions>
                <CardContent >
                  <Typography>Claim Countdown</Typography>
                  <Typography>00:00:00</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent >
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
          {/* 
          <Box mt={5}>
            <Grid container justify="center" spacing={3} mt={10}>
              <Button
                disabled={stakedBombBalance.eq(0) || (!canWithdraw && !canClaimReward)}
                onClick={onRedeem}
                className={
                  stakedBombBalance.eq(0) || (!canWithdraw && !canClaimReward)
                    ? 'shinyButtonDisabledSecondary'
                    : 'shinyButtonSecondary'
                }
              >
                Claim &amp; Withdraw
              </Button>
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

export default Staking;

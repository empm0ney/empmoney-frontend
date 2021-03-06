import React from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Bank from '../Bank';

import { Box, Container, Typography, Grid } from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import FarmCard from './FarmCard';
import { createGlobalStyle } from 'styled-components';

import useBanks from '../../hooks/useBanks';

import HomeImage from '../../assets/img/background2.jpg';
import LaunchCountdown from '../../components/LaunchCountdown';
import config from '../../config';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #08090d;
  }
`;

const Farm = () => {
  const [banks] = useBanks();
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const esharesActive = true // Date.now() >= config.esharesLaunchesAt.getTime();
  const activeBanks = banks.filter((bank) => !bank.finished && (esharesActive || bank.sectionInUI !== 2));

  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <BackgroundImage />
          {!!account ? (
            <Container maxWidth="lg">
              {/* <Typography color="textYellow" align="center" variant="h3" gutterBottom>
                Farm
              </Typography> */}

              <Box mt={5}>
                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 2 && !bank.closedForStaking).length === 0}>
                  <Typography color="textPrimary" align="center" variant="h4" gutterBottom>
                    Earn ESHARE by staking PancakeSwap LP
                  </Typography>
                  {/* <Alert variant="filled" severity="info">
                    <h4>
                      Farms started November 25th 2021 and will continue running for 1 full year.</h4>



                  </Alert> */}
                  <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 2 && !bank.closedForStaking)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <FarmCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>

                <div hidden={activeBanks.filter((bank) => bank.closedForStaking && bank.sectionInUI === 2).length === 0}>
                  <Typography color="textPrimary" align="center" variant="h4" gutterBottom style={{ marginTop: '48px' }}>
                    Inactive Farms
                  </Typography>
                  {/* <Alert variant="filled" severity="info" style={{marginTop: '30px'}}>
                    Inactive Farms
                  </Alert> */}
                  <Grid container spacing={3} style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                    {activeBanks
                      .filter((bank) => bank.closedForStaking && bank.sectionInUI === 2)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <FarmCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>

                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 0).length === 0}>
                  <Typography color="textPrimary" align="center" variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                    Earn EShare By Staking EMP
                  </Typography>
                  <Alert variant="filled" severity="info">
                    EMP pool has ended. Please claim all rewards and remove funds from the pool.
                  </Alert>
                  <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 0)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <FarmCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>
              </Box>
            </Container>
          ) : (
            <UnlockWallet />
          )}
        </Route>
        <Route path={`${path}/:bankId`}>
          <BackgroundImage />
          <Bank />
        </Route>
        {!!account && !esharesActive && <div style={{ marginTop: '2rem' }}><LaunchCountdown deadline={config.esharesLaunchesAt} description='ESHARE Farms' /></div>}
      </Page>
    </Switch>
  );
};

export default Farm;
